import type { ComponentProps } from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import cn from "classnames";

// components
import { IonCheckbox, IonItem, IonLabel, IonNote } from "@ionic/react";

import "./FormCheckbox.scss";

type Props = {
  className?: string;
  label?: string;
  note?: string;
} & ComponentProps<typeof IonCheckbox> &
  FieldHookConfig<string>;

export default function FormCheckbox(props: Props) {
  const [field, meta] = useField(props);

  const { className, label, note, ...rest } = props;

  return (
    <IonItem
      className={cn("FormCheckbox", className, {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      <IonCheckbox
        {...field}
        {...rest}
        checked={field.checked}
        onClick={field.onChange}
        className="FormCheckbox__checkbox"
      />
      {!!label && <IonLabel>{label}</IonLabel>}
      {!!note && !meta.error && <IonNote slot="helper">{note}</IonNote>}
      {!!meta.error && <IonNote slot="error">{meta.error}</IonNote>}
    </IonItem>
  );
}
