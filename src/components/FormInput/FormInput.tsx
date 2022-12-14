import type { FieldHookConfig } from "formik";
import type { TextFieldTypes } from "@ionic/core";
import { useField } from "formik";
import cn from "classnames";

// components
import {
  IonItem,
  IonInput,
  IonLabel,
  IonNote,
} from "@ionic/react";

type InputProps = {
  label: string;
  type: TextFieldTypes;
  placeholder?: string;
  readonly?: boolean;
};

export default function FormInput(props: InputProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);

  const {
    label,
    type,
    placeholder,
    readonly,
  } = props;

  return (
    <IonItem className={cn({
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        {...field}
        readonly={readonly}
        placeholder={placeholder}
        type={type}
        onIonBlur={field.onBlur}
        onIonChange={(event) => field.onChange(event)}
      />
      <IonNote slot="error">{meta.error}</IonNote>
    </IonItem>
  );
}
