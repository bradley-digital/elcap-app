// eslint-disable  @typescript-eslint/no-explicit-any
import * as Yup from "yup";
import { phoneRegExp } from "lib/formValidation";

type Attributes = {
  [key: string]: any;
};

type FormSections = {
  hiddenFields: string[];
  [key: string]: any;
};

type InitialValues = {
  [key: string]: string;
};

type TypeMap = {
  [key: string]: string;
};

const typeMap: TypeMap = {
  address: "addresses",
  additional_detail: "additional_details",
  contact: "contact_informations",
  name: "names",
  number: "numbers",
};

const inverseTypeMap: TypeMap = {
  addresses: "address",
  additional_details: "additional_detail",
  contact_informations: "contact",
  names: "name",
  numbers: "number",
};

function isRequired(key: string, requiredKeys: any) {
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

export function buildSchema(profileSchema: any, options: any = {}) {
  if (typeof profileSchema === "undefined") return;
  const finalOptions = Object.assign(
    {
      schema: {},
      definitions: {},
      required: [],
      prefix: "",
      titlePrefix: "",
    },
    options
  );

  const { schema, definitions, required, prefix } = finalOptions;

  let { titlePrefix } = finalOptions;

  if (profileSchema?.definitions) {
    for (const key in profileSchema.definitions) {
      const definition = profileSchema.definitions[key];
      definitions[key] = definition;
    }
  }

  if (profileSchema.required) {
    required.push(
      ...profileSchema.required.map((name: string) => {
        return prefix ? `${prefix}.${name}` : name;
      })
    );
  }

  if (profileSchema.title && prefix) {
    titlePrefix += `${profileSchema.title}: `;
  }

  for (const key in profileSchema.properties) {
    const finalKey = prefix ? `${prefix}.${key}` : key;
    let property = profileSchema.properties[key];

    if (property.$ref) {
      const refParts = property.$ref.split("/");
      const refName = refParts[refParts.length - 1];
      const definition = definitions[refName];
      property = { ...property, ...definition };
      delete property.$ref;
    }

    if (property.type === "string") {
      const finalProperty = JSON.parse(JSON.stringify(property));
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

export function buildValidation(schema: any) {
  const validation = {} as any;
  for (const key in schema) {
    const value = schema[key];
    validation[key] = Yup.string().nullable();
    if (value.minLength) {
      validation[key] = validation[key].min(
        value.minLength,
        `Must be at least ${value.minLength} characters long`
      );
    }
    if (value.maxLength) {
      validation[key] = validation[key].max(
        value.maxLength,
        `Must be less than ${value.maxLength} characters long`
      );
    }
    if (value.format === "email") {
      validation[key] = validation[key].email("Email must be valid");
    }
    if (value.format === "phone") {
      validation[key] = validation[key].matches(
        phoneRegExp,
        "Phone number must be valid"
      );
    }
    if (value.pattern) {
      let message = `Must match format ${value.pattern}`;
      if (value.message.pattern) {
        message = value.message.pattern;
      }
      validation[key] = validation[key].matches(
        new RegExp(value.pattern),
        message
      );
    }
    if (value.required) {
      validation[key] = validation[key].required("Required");
    }
  }
  return validation;
}

function buildFormSectionsHelper(
  section: any,
  titleParts: string[],
  value: string
) {
  const title = titleParts.shift();
  if (typeof title === "undefined") return;
  if (titleParts.length === 0) {
    section[title] = value;
  } else if (section[title]) {
    buildFormSectionsHelper(section[title], titleParts, value);
  } else {
    section[title] = {};
    buildFormSectionsHelper(section[title], titleParts, value);
  }
}

export function buildFormSections(schema: any) {
  const formSections: FormSections = {
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

function buildPostDataHelper(data: any, keyParts: string[], value: string) {
  const currentKey = keyParts.shift();
  if (typeof currentKey === "undefined") return;
  if (keyParts.length === 0) {
    data[currentKey] = value;
  } else {
    if (typeof data[currentKey] === "undefined") {
      data[currentKey] = {};
    }
    buildPostDataHelper(data[currentKey], keyParts, value);
  }
}

export function buildPostData(formData: any) {
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
    userId: "",
  };
}

function buildAttributes(type: string, slug: string, formData: any) {
  const attributes: Attributes = {
    slug,
  };
  const shortKey = `${type}.${slug}`;
  if (formData[shortKey]) {
    attributes.value = formData[shortKey];
  } else {
    for (const key in formData) {
      if (key.startsWith(shortKey)) {
        const valueKey = key.split(".").pop();
        if (typeof valueKey === "undefined") continue;
        attributes[valueKey] = formData[key];
      }
    }
  }
  return attributes;
}

function compareAttributes(postAttributes: any, applicationAttributes: any) {
  for (const key in postAttributes) {
    if (postAttributes[key] !== applicationAttributes[key]) {
      return false;
    }
  }
  return true;
}

function attributesHasData(attributes: any) {
  for (const key in attributes) {
    if (key === "slug") continue;
    if (attributes[key]) return true;
  }
  return false;
}

function removeNullAttributes(attributes: any) {
  for (const key in attributes) {
    if (attributes[key] === "") {
      attributes[key] = "-";
    }
    if (attributes[key] === null) {
      delete attributes[key];
    }
  }
  return attributes;
}

function removeBlankAttributes(attributes: any) {
  for (const key in attributes) {
    if (!attributes[key]) {
      delete attributes[key];
    }
  }
  return attributes;
}

export function buildUpdateData(application: any, formData: any) {
  const included = application?.included || [];
  const deleteData: any[] = [];
  const patchData: any[] = [];
  const postData: any[] = [];
  const profileId = application?.data?.relationships?.profile?.data?.id;
  if (!profileId) return { deleteData, postData };
  for (const key in formData) {
    if (key === "kyc_entity_template_id") continue;

    const keyParts = key.split(".");
    const initialType = keyParts[0];
    const type = inverseTypeMap[initialType];
    const slug = keyParts[1];
    if (!type || !slug) continue;

    const allData = [...postData, ...patchData];
    const existingData = allData.find(
      (data) =>
        data?.data?.type === type && data?.data?.attributes?.slug === slug
    );
    if (existingData) continue;

    const applicationData = included.find(
      (includedData: any) =>
        includedData?.type === type && includedData?.attributes?.slug === slug
    );

    const attributes = buildAttributes(initialType, slug, formData);

    if (applicationData && typeof applicationData.attributes === "object") {
      const id = applicationData?.id;
      if (!id) continue;
      const isSame = compareAttributes(attributes, applicationData.attributes);
      if (isSame) continue;
      const hasData = attributesHasData(attributes);
      if (hasData) {
        patchData.push({
          data: {
            id,
            type,
            attributes: removeNullAttributes(attributes),
          },
        });
      } else {
        const existingDeleteData = deleteData.find(
          (data) => data.id === id && data.type === type
        );
        if (existingDeleteData) continue;
        deleteData.push({ id, type });
      }
    } else {
      postData.push({
        profileId,
        data: {
          type,
          attributes: removeBlankAttributes(attributes),
        },
      });
    }
  }
  return { deleteData, patchData, postData };
}

export function buildInitialValues(
  application: any,
  schema: any,
  templateId: string
) {
  const included = application?.included || [];
  const initialValues: InitialValues = {};
  if (templateId) {
    initialValues.kyc_entity_template_id = templateId;
  }
  if (typeof schema === "undefined") {
    return initialValues;
  }
  for (const data of included) {
    const key = `${typeMap[data.type]}.${data?.attributes?.slug}`;
    if (schema[key] && data?.attributes?.value) {
      initialValues[key] = data?.attributes?.value;
    } else {
      for (const attribute in data?.attributes) {
        const attributeKey = `${key}.${attribute}`;
        if (schema[attributeKey]) {
          initialValues[attributeKey] = data?.attributes[attribute];
        }
      }
    }
  }
  return initialValues;
}
