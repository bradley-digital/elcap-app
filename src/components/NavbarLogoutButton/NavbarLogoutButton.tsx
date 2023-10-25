import "./NavbarLogoutButton.scss";
import { IonButton, IonIcon, useIonActionSheet } from "@ionic/react";
import useAuth from "hooks/useAuth";
import { exitOutline } from "ionicons/icons";

export default function NavbarLogoutButton() {
  const { logout } = useAuth();
  const [present] = useIonActionSheet();

  function handleLogout() {
    present({
      header: "Are you sure you want to Log Out?",
      buttons: [
        {
          text: "Yes",
          role: "confirm",
          cssClass: "alert-button-confirm",
        },
        {
          text: "No",
          role: "cancel",
          cssClass: "alert-button-cancel",
        },
      ],
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          logout();
        }
      },
    });
  }
  return (
    <IonButton
      slot="end"
      className="NavbarLogoutButton"
      color="dark"
      onClick={handleLogout}
    >
      <IonIcon icon={exitOutline} />
    </IonButton>
  );
}
