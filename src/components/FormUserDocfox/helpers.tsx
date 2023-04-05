import type { ReactNode } from "react";
import { IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function buildFormInputsHelper(children: any = [], section: any = {}) {
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
          />
        );
      }
    } else if (nextSection) {
      children.push(
        <IonListHeader key={sectionTitle}>{sectionTitle}</IonListHeader>
      );
      buildFormInputsHelper(children, nextSection);
    }
  }
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function buildFormInputs(formSections: any = {}) {
  const children: ReactNode[] = [];
  buildFormInputsHelper(children, formSections);
  return children;
}
