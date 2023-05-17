import type { ReactNode } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import "components/SubmitButton/SubmitButton.scss";

type Props = {
  children: ReactNode;
  isSubmitting?: boolean;
  [rest: string]: any;
};

// Shadow dom elements do not submit forms on "Enter"
// Adding a hidden input to create the expected behavior
// https://github.com/ionic-team/ionic-framework/issues/19368
export default function SubmitButton({ children, isSubmitting, ...rest }: Props) {
  return (
    <div className="SubmitButton">
      <input className="SubmitButton__hiddenInput" type="submit"></input>
      <IonButton {...rest} type="submit">
        {isSubmitting ? <IonSpinner name="crescent" /> : children}
      </IonButton>
    </div>
  );
}
