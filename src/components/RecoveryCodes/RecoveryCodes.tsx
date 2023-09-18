import "./RecoveryCodes.scss";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonItem,
  IonText,
} from "@ionic/react";
import useUser from "hooks/useUser";
import { informationCircleOutline } from "ionicons/icons";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export default function RecoveryCodes({ open, setOpen }: Props) {
  const { recoveryCodes, generateNewRecoveryCodes } = useUser();

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function download(text: string) {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery-codes.txt";
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element);
  }

  return (
    <IonModal
      isOpen={open}
      onWillDismiss={() => {
        setOpen(false);
      }}
      className="RecoveryCodes"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recovery codes</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon
                    icon={informationCircleOutline}
                    size="large"
                    color="primary"
                  />
                </IonCol>

                <IonCol>
                  <IonText>
                    Keep your recovery codes in a safe spot. These codes are the
                    last resort for accessing your account in case you lose your
                    password and second factors. If you cannot find these codes,
                    you will lose access to your account.
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          <IonRow className="RecoveryCodes__codes">
            <IonCol>
              <IonList lines="none">
                {recoveryCodes?.slice(0, 8).map((code) => (
                  <IonItem key={code}>
                    <IonText className="RecoveryCodes__codesText">
                      {code}
                    </IonText>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>

            <IonCol>
              <IonList lines="none">
                {recoveryCodes?.slice(8, 16).map((code) => (
                  <IonItem key={code}>
                    <IonText className="RecoveryCodes__codesText">
                      {code}
                    </IonText>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="RecoveryCodes__buttons">
          <IonButton
            onClick={() => {
              copyToClipboard(recoveryCodes?.join("\n") || "");
            }}
          >
            Copy
          </IonButton>
          <IonButton
            onClick={() => {
              download(recoveryCodes?.join("\n") || "");
            }}
          >
            Download
          </IonButton>
        </div>

        <div className="RecoveryCodes__generateNew">
          <IonText>
            <h6>Generate new recovery codes</h6>
            <p>
              When you generate new recovery codes, you must download or print
              the new codes. Your old codes wont work anymore.
            </p>
          </IonText>

          <IonButton
            onClick={() => {
              generateNewRecoveryCodes();
            }}
          >
            Generate new recovery codes
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
}
