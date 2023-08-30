import { Form, Formik } from "formik";
import "./AuthenticatorApp.scss";
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
  IonLabel,
} from "@ionic/react";
import useUser from "hooks/useUser";
import {
  checkmark,
  closeOutline,
  informationCircleOutline,
} from "ionicons/icons";
import * as Yup from "yup";
import { otpValidation } from "lib/formValidation";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";
import { useState } from "react";
import QRCode from "components/QRCode/QRCode";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export default function AuthenticatorApp({ open, setOpen }: Props) {
  const { verifyOtp, profile } = useUser();
  const [validOtp, setValidOtp] = useState<boolean | undefined>();

  return (
    <IonModal
      isOpen={open}
      onWillDismiss={() => {
        setOpen(false);
      }}
      className="AuthenticatorApp"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Authenticator app</IonTitle>
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
                  <p className="AuthenticatorApp__text">
                    Authenticator apps and browser extensions like 1Password,
                    Authy, Microsoft Authenticator, etc. generate one-time
                    passwords that are used as a second factor to verify your
                    identity when prompted during sign-in.
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol>
            <h6>Scan the QR code</h6>
            <p>Use an authenticator app or browser extension to scan.</p>

            <QRCode link={profile?.otpAuthUrl || ""} />

            <br />
            <IonLabel>Verify the code from the app</IonLabel>
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={Yup.object({
                otp: otpValidation,
              })}
              onSubmit={async (values) => {
                const result = await verifyOtp({ otp: values.otp });
                if (!result.validOtp) {
                  setValidOtp(false);
                } else {
                  setValidOtp(true);
                }
              }}
            >
              <Form>
                <div className="AuthenticatorApp__otpInputWrapper">
                  <FormInput
                    name="otp"
                    type="text"
                    placeholder="Authentication code"
                  />
                  {validOtp !== undefined && (
                    <IonIcon
                      icon={validOtp ? checkmark : closeOutline}
                      className="AuthenticatorApp__otpIcon"
                      color={validOtp ? "success" : "danger"}
                    />
                  )}
                </div>
                <SubmitButton>Verify</SubmitButton>
              </Form>
            </Formik>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonModal>
  );
}
