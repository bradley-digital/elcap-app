import * as Yup from "yup";
import { phoneRegExp } from "lib/formValidation";

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

  return { schema, required };
}

export function buildValidation(schema, requiredKeys) {
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

const pluralMap = {
  "additional_detail": "additional_details",
  "address": "addresses",
  "contact": "contact_informations",
  "name": "names",
  "number": "numbers",
};

export function buildInitialValues(templateId = "", application = {}, schema = {}) {
  const applicationCopy = JSON.parse(JSON.stringify(application));
  const included = applicationCopy.included || [];
  const initialValues = {
    kyc_entity_template_id: templateId,
  };
  for (const data of included) {
    const key = `${pluralMap[data.type]}.${data.attributes.slug}`;
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
