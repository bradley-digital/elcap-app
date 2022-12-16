import type { ReactNode } from "react";

// components
import { IonButton } from "@ionic/react";

// hooks
import useAuth from "hooks/useAuth";

type Props = {
  children: ReactNode;
  [rest: string]: any;
};

export default function LogoutButton({ children, ...rest }: Props) {
  const { logout } = useAuth();

  return (
    <IonButton color="danger" onClick={logout} {...rest}>
      {children}
    </IonButton>
  );
}
