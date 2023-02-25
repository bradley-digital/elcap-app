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
      schema[finalKey] = JSON.parse(JSON.stringify(property));
      if (schema[finalKey].title) {
        schema[finalKey].title = `${titlePrefix}${schema[finalKey].title}`;
      }
      if (isRequired(finalKey, required)) {
        schema[finalKey].required = true;
      }
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
      validation[key].min(value.minLength, `Must be at least ${value.minLength} characters long`);
    }
    if (value.maxLength) {
      validation[key].max(value.maxLength, `Must be less than ${value.maxLength} characters long`);
    }
    if (value.format === "email") {
      validation[key].email("Email must be valid");
    }
    if (value.format === "phone") {
      validation[key].matches(phoneRegExp, "Phone number must be valid");
    }
    if (value.pattern) {
      let message = `Must match format ${value.pattern}`;
      if (value.message.pattern) {
        message = value.message.pattern;
      }
      validation[key].matches(new RegExp(value.pattern), message);
    }
    if (value.required) {
      validation[key].required("Required");
    }
  }
  return validation;
}
