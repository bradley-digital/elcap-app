import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormSelect.scss";
import { IonSelect, IonSelectOption } from "@ionic/react";
import hash from "object-hash";
import { ComponentProps } from "react";

type Props = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
} & ComponentProps<typeof IonSelect> &
  FieldHookConfig<string>;

export default function AuthFormSelect(props: Props) {
  const { className, options, ...rest } = props;
  const [field, meta] = useField(props);
  const selectedOption = options.find(
    (option) => option.value === field.value,
  ) ?? { value: "", label: "" };

  const interfaceOptions = {
    cssClass: className ?? "",
  };

  return (
    <div className="AuthFormSelect">
      <IonSelect
        interfaceOptions={interfaceOptions}
        selectedText={selectedOption.label}
        onIonBlur={field.onBlur}
        onIonChange={field.onChange}
        {...rest}
      >
        {options.map((option) => (
          <IonSelectOption key={hash(option)} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="AuthFormSelect__errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
}
