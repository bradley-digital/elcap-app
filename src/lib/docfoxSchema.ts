import * as Yup from "yup";
import { phoneRegExp } from "lib/formValidation";

const typeMap = {
  "address": "addresses",
  "additional_detail": "additional_details",
  "contact": "contact_informations",
  "name": "names",
  "number": "numbers",
};

const inverseTypeMap = {
  "addresses": "address",
  "additional_details": "additional_detail",
  "contact_informations": "contact",
  "names": "name",
  "numbers": "number",
};

function isRequired(key, requiredKeys) {
  if (!requiredKeys.includes(key)) {
    return false;
  }
  const keyParts = key.split(".");
  keyParts.pop();
  if (keyParts.length < 2) {
    return true;
  }
  let currentKey = "";
  for (const part of keyParts) {
    currentKey = currentKey ? `${currentKey}.${part}` : part;
    if (requiredKeys.includes(currentKey)) {
      return true;
    }
  }
  return false;
}

export function buildSchema(object = {}, options) {
  const finalOptions = Object.assign({
    schema: {},
    definitions: {},
    required: [],
    prefix: "",
    titlePrefix: "",
  }, options);

  const {
    schema,
    definitions,
    required,
    prefix,
  } = finalOptions;

  let {
    titlePrefix,
  } = finalOptions;

  if (object.definitions) {
    for (const key in object.definitions) {
      const definition = object.definitions[key];
      definitions[key] = definition;
    }
  }

  if (object.required) {
    required.push(...object.required.map((name) => {
      return prefix ? `${prefix}.${name}` : name;
    }));
  }

  if (object.title && prefix) {
    titlePrefix += `${object.title}: `;
  }

  for (const key in object.properties) {
    const finalKey = prefix ? `${prefix}.${key}` : key;
    let property = object.properties[key];

    if (property.$ref) {
      const refParts = property.$ref.split("/");
      const refName = refParts[refParts.length - 1];
      const definition = definitions[refName];
      property = { ...property, ...definition };
      delete property.$ref;
    }

    if (property.type === "string") {
      const finalProperty = JSON.parse(JSON.stringify(property))
      if (finalProperty.title) {
        finalProperty.title = `${titlePrefix}${finalProperty.title}`;
      }
      if (isRequired(finalKey, required)) {
        finalProperty.required = true;
      }
      schema[finalKey] = finalProperty;
    } else if (property.type === "object" && property.properties) {
      buildSchema(property, {
        schema,
        definitions,
        required,
        prefix: finalKey,
        titlePrefix,
      });
    }
  }

  return schema;
}

export function buildValidation(schema) {
  const validation = {};
  for (const key in schema) {
    const value = schema[key];
    validation[key] = Yup.string();
    if (value.minLength) {
      validation[key] = validation[key].min(value.minLength, `Must be at least ${value.minLength} characters long`);
    }
    if (value.maxLength) {
      validation[key] = validation[key].max(value.maxLength, `Must be less than ${value.maxLength} characters long`);
    }
    if (value.format === "email") {
      validation[key] = validation[key].email("Email must be valid");
    }
    if (value.format === "phone") {
      validation[key] = validation[key].matches(phoneRegExp, "Phone number must be valid");
    }
    if (value.pattern) {
      let message = `Must match format ${value.pattern}`;
      if (value.message.pattern) {
        message = value.message.pattern;
      }
      validation[key] = validation[key].matches(new RegExp(value.pattern), message);
    }
    if (value.required) {
      validation[key] = validation[key].required("Required");
    }
  }
  return validation;
}

function buildFormSectionsHelper(section, titleParts, value) {
  const title = titleParts.shift();
  if (titleParts.length === 0) {
    section[title] = value;
  } else if (section[title]) {
    buildFormSectionsHelper(section[title], titleParts, value);
  } else {
    section[title] = {};
    buildFormSectionsHelper(section[title], titleParts, value);
  }
}

export function buildFormSections(schema) {
  const formSections = {
    hiddenFields: [],
  };
  for (const key in schema) {
    const value = schema[key];
    value.name = key;
    if (value.title) {
      const titleParts = value.title.split(": ");
      buildFormSectionsHelper(formSections, titleParts, value);
    } else {
      formSections.hiddenFields.push(value);
    }
  }
  return formSections;
}

function buildPostDataHelper(data, keyParts, value) {
  const currentKey = keyParts.shift();
  if (keyParts.length === 0) {
    data[currentKey] = value;
  } else {
    if (typeof data[currentKey] === "undefined") {
      data[currentKey] = {};
    }
    buildPostDataHelper(data[currentKey], keyParts, value);
  }
}

export function buildPostData(formData) {
  const postData = {};
  for (const key in formData) {
    const value = formData[key];
    const keyParts = key.split(".");
    buildPostDataHelper(postData, keyParts, value);
  }
  return {
    data: {
      type: "kyc_application",
      attributes: postData,
    },
  };
}

function buildAttributes(type, slug, formData) {
  const attributes = {
    slug,
  };
  const shortKey = `${type}.${slug}`;
  if (formData[shortKey]) {
    attributes.value = formData[shortKey];
  } else {
    for (const key in formData) {
      if (key.startsWith(shortKey)) {
        const valueKey = key.split(".").pop();
        attributes[valueKey] = formData[key];
      }
    }
  }
  return attributes;
}

export function buildUpdateData(application, formData) {
  const included = application.included || [];
  const updateData = [];
  for (const key in formData) {
    if (key === "kyc_entity_template_id") continue;
    const keyParts = key.split(".");
    const initialType = keyParts[0];
    const type = inverseTypeMap[initialType]
    const slug = keyParts[1];
    if (!type || !slug) continue;
    const existingData = updateData.find(update => (
      update?.data?.type === type &&
      update?.data?.attributes?.slug === slug
    ));
    if (existingData) continue;
    const applicationData = included.find(includedData => (
      includedData?.type === type &&
      includedData?.attributes?.slug === slug
    ));
    const id = applicationData?.id;
    if (!id) continue;
    const attributes = buildAttributes(initialType, slug, formData);
    const data = {
      data: {
        id,
        type,
        attributes,
      },
    };
    updateData.push(data);
  }
  return updateData;
}

export function buildInitialValues(templateId = "", application = {}, schema = {}) {
  const included = application.included || [];
  const initialValues = {
    kyc_entity_template_id: templateId,
  };
  for (const data of included) {
    const key = `${typeMap[data.type]}.${data.attributes.slug}`;
    if (schema[key] && data.attributes.value) {
      initialValues[key] = data.attributes.value;
    } else {
      for (const attribute in data.attributes) {
        const attributeKey = `${key}.${attribute}`;
        if (schema[attributeKey]) {
          initialValues[attributeKey] = data.attributes[attribute];
        }
      }
    }
  }
  return initialValues;
}
