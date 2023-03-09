import { IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";

function buildFormInputsHelper(children, section) {
  for (const sectionTitle in section) {
    if (sectionTitle === "hiddenFields") continue;
    const nextSection = section[sectionTitle];
    if (nextSection.name) {
      let label = sectionTitle;
      if (nextSection.required) {
        label += " *";
      }
      if (nextSection.select_options) {
        children.push(
          <FormSelect
            key={nextSection.name}
            label={label}
            name={`['${nextSection.name}']`}
            placeholder={nextSection.placeholder}
            options={nextSection.select_options}
          />
        );
      } else if (nextSection.format === "email") {
        children.push(
          <FormInput
            key={nextSection.name}
            label={label}
            name={`['${nextSection.name}']`}
            placeholder={nextSection.placeholder}
            type="email"
          />
        );
      } else if (nextSection.format === "phone") {
        children.push(
          <FormInput
            key={nextSection.name}
            label={label}
            name={`['${nextSection.name}']`}
            placeholder={nextSection.placeholder}
            type="tel"
          />
        );
      } else {
        children.push(
          <FormInput
            key={nextSection.name}
            label={label}
            name={`['${nextSection.name}']`}
            placeholder={nextSection.placeholder}
            type="string"
          />
        );
      }
    } else if (nextSection) {
      children.push(<IonListHeader key={sectionTitle}>{sectionTitle}</IonListHeader>);
      buildFormInputsHelper(children, nextSection);
    }
  }
}

export function buildFormInputs(formSections = {}) {
  const children = [];
  buildFormInputsHelper(children, formSections);
  return children;
}
