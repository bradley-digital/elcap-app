import { useState, type ComponentProps, MouseEvent } from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import cn from "classnames";

// components
import {
  IonAlert,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";

import "./FormCheckbox.scss";

type Props = {
  className?: string;
  label?: string;
  note?: string;
  warningHeader?: string;
  withWarning?: boolean;
  showWarningOnUncheck?: boolean;
  warningMessage?: string;
} & ComponentProps<typeof IonCheckbox> &
  FieldHookConfig<string>;

export default function FormCheckbox(props: Props) {
  const [field, meta] = useField(props);

  const {
    className,
    label,
    note,
    warningHeader,
    withWarning,
    showWarningOnUncheck = false,
    warningMessage,
    ...rest
  } = props;

  const [showWarning, setShowWarning] = useState(false);

  function handleOnchange() {
    field.onChange({
      target: {
        value: !field.checked,
        name: field.name,
      },
    });
  }

  function handleClick(
    e: MouseEvent<HTMLIonCheckboxElement, globalThis.MouseEvent>,
  ) {
    if (withWarning) {
      e.preventDefault();
      if (!field.checked) {
        setShowWarning(true);
      } else {
        if (showWarningOnUncheck) {
          setShowWarning(true);
        } else {
          handleOnchange();
        }
      }
    } else {
      handleOnchange();
    }
  }

  return (
    <IonItem
      className={cn("FormCheckbox", className, {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
    >
      <IonAlert
        isOpen={showWarning}
        subHeader={warningHeader}
        message={warningMessage}
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => setShowWarning(false),
          },
          {
            text: "OK",
            role: "confirm",
            handler: () => handleOnchange(),
          },
        ]}
        onDidDismiss={() => setShowWarning(false)}
      />

      <IonCheckbox
        {...field}
        {...rest}
        checked={field.checked}
        onClick={handleClick}
        className="FormCheckbox__checkbox"
      />
      {!!label && <IonLabel>{label}</IonLabel>}
      {!!note && !meta.error && <IonNote slot="helper">{note}</IonNote>}
      {!!meta.error && <IonNote slot="error">{meta.error}</IonNote>}
    </IonItem>
  );
}
