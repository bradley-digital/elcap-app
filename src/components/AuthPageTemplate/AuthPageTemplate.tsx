import type { ReactNode } from "react";
import cn from "classnames";

// components
import { IonContent, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";

// styles
import "./AuthPageTemplate.scss";

type FormProps = {
  children: ReactNode;
  className?: string;
  title: string;
  [rest: string]: any;
};

export default function AuthPageTemplate({
  children,
  title,
  className,
  ...rest
}: FormProps) {
  return (
    <IonPage className={cn("AuthPageTemplate", className)} {...rest}>
      <IonContent fullscreen>
        <Logo />
        <IonText>
          <h1 className="AuthPageTemplate__title">{title}</h1>
        </IonText>
        {children}
      </IonContent>
    </IonPage>
  );
}
