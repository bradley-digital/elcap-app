import type { ReactNode } from "react";

// components
import { IonContent, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";

// styles
import "components/AuthForm/AuthForm.scss";

type FormProps = {
  title: string;
  children: ReactNode;
};

export default function AuthForm({
  title,
  children,
}: FormProps) {
  return (
    <IonPage className="Form">
      <IonContent fullscreen>
        <Logo />
        <IonText>
          {title && <h1>{title}</h1>}
        </IonText>
        {children}
      </IonContent>
    </IonPage>
  );
}
