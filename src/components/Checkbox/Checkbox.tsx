import { IonAlert, IonCheckbox, IonLabel } from "@ionic/react";
import { type ComponentProps, useState } from "react";

type Props = {
  onChange?: (value: boolean) => void;
  className?: string;
  label?: string;
  note?: string;
  warningHeader?: string;
  withWarning?: boolean;
  showWarningOnUncheck?: boolean;
  warningMessage?: string;
  checked?: boolean;
} & ComponentProps<typeof IonCheckbox>;

export default function Checkbox({
  onChange,
  className,
  label,
  warningHeader,
  withWarning,
  showWarningOnUncheck,
  warningMessage,
  checked,
  ...rest
}: Props) {
  const [showWarning, setShowWarning] = useState(false);
  
  function handleOnchange(value: boolean) {
    if (withWarning) {
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
            handler: () => onChange && onChange(!checked),
          },
        ]}
        onDidDismiss={() => setShowWarning(false)}
      />

      <IonCheckbox
        {...rest}
        className={className}
        checked={checked}
        onIonChange={(e) => handleOnchange(e.detail.checked)}
      />
      {!!label && <IonLabel>{label}</IonLabel>}
    </>
  );
}
