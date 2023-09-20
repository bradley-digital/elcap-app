import { IonAlert, IonCheckbox, IonItem, IonLabel, IonNote } from "@ionic/react";
import { type ComponentProps, useState } from "react";

type Props = {
  onChange?: (value: boolean) => void;
  className?: string;
  label?: string;
  note?: string;
  showWarningOnUncheck?: boolean;
  warningHeader?: string;
  warningMessage?: string;
  checked?: boolean;
} & ComponentProps<typeof IonCheckbox>;

export default function Checkbox({
  onChange,
  className,
  label,
  note,
  showWarningOnUncheck,
  warningHeader,
  warningMessage,
  checked,
  ...rest
}: Props) {
  const [showWarning, setShowWarning] = useState(false);
  const hasWarning = !!warningHeader || !!warningMessage;
  
  function handleOnChange(value: boolean) {
    if (hasWarning) {
      if (!checked) {
        setShowWarning(true);
      } else {
        if (showWarningOnUncheck) {
          setShowWarning(true);
        } else {
          onChange && onChange(value);
        }
      }
    } else {
      onChange && onChange(value);
    }
  }

  return (
    <>
      <IonItem>
        <IonCheckbox
          {...rest}
          className={className}
          checked={checked}
          onIonChange={(e) => handleOnChange(e.detail.checked)}
        />

        {!!label && <IonLabel>{label}</IonLabel>}
        {!!note && <IonNote slot="helper">{note}</IonNote>}
      </IonItem>

      <IonAlert
        isOpen={showWarning}
        subHeader={warningHeader}
        message={warningMessage}
        buttons={[
          {
            text: "Yes",
            role: "confirm",
            handler: () => onChange && onChange(!checked),
          },
          {
            text: "No",
            role: "cancel",
            handler: () => setShowWarning(false),
          },
        ]}
        onDidDismiss={() => setShowWarning(false)}
      />
    </>
  );
}
