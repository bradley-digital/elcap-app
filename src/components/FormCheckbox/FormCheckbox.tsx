import type { ComponentProps, MouseEvent } from "react";
import { useState } from "react";
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
    showWarningOnUncheck = false,
    warningHeader,
    warningMessage,
    ...rest
  } = props;

  const [showWarning, setShowWarning] = useState(false);

  const hasWarning = !!warningHeader || !!warningMessage;

  function handleOnChange() {
    field.onChange({
      target: {
        value: !field.checked,
        name: field.name,
      },
    });
  }

  function handleClick(
    e: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault();
    if (hasWarning) {
      if (!field.checked) {
        setShowWarning(true);
      } else {
        if (showWarningOnUncheck) {
          setShowWarning(true);
        } else {
          handleOnChange();
        }
      }
    } else {
      handleOnChange();
    }
  }

  return (
    <IonItem
      className={cn("FormCheckbox", className, {
        "ion-invalid": !!meta.error,
        "ion-touched": meta.touched,
      })}
      onClick={(e) => handleClick(e)}
    >
      <IonCheckbox
        {...field}
        {...rest}
        checked={field.checked}
        className="FormCheckbox__checkbox"
      />

      {!!label && <IonLabel>{label}</IonLabel>}
      {!!note && !meta.error && <IonNote slot="helper">{note}</IonNote>}
      {!!meta.error && <IonNote slot="error">{meta.error}</IonNote>}

      <IonAlert
        isOpen={showWarning}
        subHeader={warningHeader}
        message={warningMessage}
        buttons={[
          {
            text: "Yes",
            role: "confirm",
            handler: () => handleOnChange(),
          },
          {
            text: "No",
            role: "cancel",
            handler: () => setShowWarning(false),
          },
        ]}
        onDidDismiss={() => setShowWarning(false)}
      />
    </IonItem>
  );
}
