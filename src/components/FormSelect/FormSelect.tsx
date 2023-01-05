import type { ComponentProps } from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import cn from "classnames";

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
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  icon?: string;
} & ComponentProps<typeof IonSelect> &
  FieldHookConfig<string>;

export default function FormSelect(props: Props) {
  const [field, meta] = useField(props);
  const { label, icon, options, ...rest } = props;

  return (
    <IonItem
      className={cn("FormSelect", {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      <IonLabel position="stacked">{label}</IonLabel>
      {icon && <IonIcon icon={icon} className="FormSelect__icon" />}

      <IonSelect
        {...rest}
        selectedText={field.value}
        onIonBlur={field.onBlur}
        onIonChange={(event) => field.onChange(event)}
      >
        {/* loop options  */}
        {options.map((option, i) => (
          <IonSelectOption key={i} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>

      <IonNote slot="error">{meta.error}</IonNote>
    </IonItem>
  );
}
