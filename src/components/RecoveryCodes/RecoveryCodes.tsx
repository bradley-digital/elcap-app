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
  IonLoading,
} from "@ionic/react";
import classNames from "classnames";
import useUser from "hooks/useUser";
import { alertCircleOutline, informationCircleOutline } from "ionicons/icons";

type Props = {
  setOpen: (open: boolean) => void;
};
export default function RecoveryCodes({ setOpen }: Props) {
  const {
    recoveryCodes,
    generateNewRecoveryCodes,
    generatingNewRecoveryCodesStatus,
    hasRecoveryCodes,
  } = useUser();

  console.log({ recoveryCodes, hasRecoveryCodes });
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
    <>
      <IonLoading
        isOpen={generatingNewRecoveryCodesStatus === "loading"}
        message="Generating recovery codes..."
        spinner="circles"
      />

      <IonModal isOpen={true} className="RecoveryCodes">
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
          <IonCard
            className={classNames(
              hasRecoveryCodes &&
                recoveryCodes &&
                "RecoveryCodes__warningBackgroundColor",
              hasRecoveryCodes &&
                !recoveryCodes &&
                "RecoveryCodes__dangerBackgroundColor",
            )}
          >
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto">
                    <IonIcon
                      icon={
                        !hasRecoveryCodes
                          ? informationCircleOutline
                          : alertCircleOutline
                      }
                      size="large"
                      className={classNames(
                        hasRecoveryCodes &&
                          !recoveryCodes &&
                          "RecoveryCodes__lightColor",
                        !hasRecoveryCodes && "RecoveryCodes__primaryColor",
                      )}
                    />
                  </IonCol>

                  <IonCol>
                    {!hasRecoveryCodes && !recoveryCodes && (
                      <IonText>
                        Keep your recovery codes in a safe spot. These codes are
                        the last resort for accessing you account in case you
                        lose your password and second factors. If you cannot
                        find these codes, you will lose access to your account.
                        You will only be able to view these recovery codes once.
                        Please be sure to save them in a secure location.
                      </IonText>
                    )}

                    {hasRecoveryCodes && !recoveryCodes && (
                      <IonText color="light">
                        You have previously generated recovery codes. Creating
                        new ones will destroy any existing recovery code.
                      </IonText>
                    )}

                    {hasRecoveryCodes && recoveryCodes && (
                      <IonText>
                        You will only be able to view these codes once. Be sure
                        to store them in a secure location before closing this
                        window.
                      </IonText>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {recoveryCodes && (
            <>
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
            </>
          )}

          {!recoveryCodes && (
            <div className="RecoveryCodes__generateNew">
              <IonText>
                {hasRecoveryCodes ? (
                  <>
                    <h6>Generate new recovery codes</h6>
                    <p>
                      You have already generated recovery codes. Requesting a
                      new set of codes will disable any existing codes. Are you
                      sure you want to continue?
                    </p>
                  </>
                ) : (
                  <>
                    <h6>Generate recovery codes</h6>
                    <p>
                      You will only be able to view these recovery codes once.
                      Please be sure to save them in a secure location.
                    </p>
                  </>
                )}
              </IonText>

              <IonButton
                color={hasRecoveryCodes ? "danger" : "primary"}
                onClick={() => {
                  generateNewRecoveryCodes();
                }}
              >
                {hasRecoveryCodes
                  ? "I UNDERSTAND, GENERATE NEW RECOVERY CODES"
                  : "GENERATE RECOVERY CODES"}
              </IonButton>
            </div>
          )}
        </IonContent>
      </IonModal>
    </>
  );
}
