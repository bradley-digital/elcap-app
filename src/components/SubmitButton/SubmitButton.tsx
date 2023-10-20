import type { ReactNode } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import "components/SubmitButton/SubmitButton.scss";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  isSubmitting?: boolean;
  slot?: "start" | "end";
  [rest: string]: any;
};

// Shadow dom elements do not submit forms on "Enter"
// Adding a hidden input to create the expected behavior
// https://github.com/ionic-team/ionic-framework/issues/19368
export default function SubmitButton({
  children,
  isSubmitting,
  slot = "start",
  ...rest
}: Props) {
  return (
    <div
      className={classNames(
        "SubmitButton",
        slot === "end" && "metadata-end-wrapper",
      )}
      slot={slot}
    >
      <input className="SubmitButton__hiddenInput" type="submit"></input>
      <IonButton {...rest} type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner name="crescent" /> : children}
      </IonButton>
    </div>
  );
}
