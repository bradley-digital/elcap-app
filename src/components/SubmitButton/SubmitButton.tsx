import type { ReactNode } from "react";
import { IonButton } from "@ionic/react";
import "components/SubmitButton/SubmitButton.scss";

type SubmitButtonProps = {
  children: ReactNode;
  [rest:string]: any;
}

// Shadow dom elements do not submit forms on "Enter"
// Adding a hidden input to create the expected behavior
// https://github.com/ionic-team/ionic-framework/issues/19368
export default function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  return (
    <div className="SubmitButton">
      <input className="SubmitButton__hiddenInput" type="submit"></input>
      <IonButton {...rest} type="submit">{children}</IonButton>
    </div>
  );
}
