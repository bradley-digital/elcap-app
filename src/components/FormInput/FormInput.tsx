import type { ComponentProps } from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import cn from "classnames";

// components
import { IonIcon, IonItem, IonInput, IonLabel, IonNote } from "@ionic/react";

import "./FormInput.scss";

type Props = {
  label?: string;
  icon?: string;
  className?: string;
} & ComponentProps<typeof IonInput> &
  FieldHookConfig<string>;

export default function FormInput(props: Props) {
  const [field, meta] = useField(props);

  const { label, icon, className, ...rest } = props;

  return (
    <IonItem
      className={cn("FormInput", className, {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      {!!label && <IonLabel position="stacked">{label}</IonLabel>}
      {!!icon && <IonIcon icon={icon} className="FormInput__icon" />}
      <IonInput
        {...field}
        {...rest}
        onIonBlur={field.onBlur}
        onIonChange={field.onChange}
      />
      {!!meta.error && <IonNote slot="error">{meta.error}</IonNote>}
    </IonItem>
  );
}
