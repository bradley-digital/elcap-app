import type { ComponentProps } from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import cn from "classnames";
import hash from "object-hash";

// components
import {
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonNote,
} from "@ionic/react";

import "./FormSelect.scss";

type Props = {
  className?: string;
  icon?: string;
  label: string;
  note?: string;
  options: {
    value: string;
    label: string;
  }[];
  position?: "fixed" | "stacked" | "floating";
  onChange?: (value: string) => void;
} & ComponentProps<typeof IonSelect> &
  FieldHookConfig<string>;

export default function FormSelect(props: Props) {
  const [field, meta] = useField(props);
  const { className, icon, label, note, options, position, onChange, ...rest } =
    props;

  const selectedOption = options.find(
    (option) => option.value === field.value,
  ) ?? { value: "", label: "" };

  const interfaceOptions = {
    cssClass: className ?? "",
  };

  return (
    <IonItem
      className={cn("FormSelect", className, {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      <IonLabel position={position ?? "stacked"}>{label}</IonLabel>
      {icon && <IonIcon icon={icon} className="FormSelect__icon" />}

      <IonSelect
        interfaceOptions={interfaceOptions}
        selectedText={selectedOption.label}
        value={selectedOption.value}
        onIonBlur={field.onBlur}
        onIonChange={(e) => {
          if (onChange) {
            onChange(e.detail.value);
          } else {
            field.onChange(e.detail.value);
          }
        }}
        {...rest}
      >
        {options.map((option) => (
          <IonSelectOption key={hash(option)} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>

      {!!note && !meta.error && <IonNote slot="helper">{note}</IonNote>}
      {!!meta.error && <IonNote slot="error">{meta.error}</IonNote>}
    </IonItem>
  );
}
