import useUser from "hooks/useUser";

// components
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import Logo from "components/Logo/Logo";
import FormAccount from "components/FormAccount/FormAccount";

// hooks
import useUserDocfox from "hooks/useUserDocfox";

import "./Onboarding.scss";

type Props = {
  stage: string;
};

export default function Onboarding({ stage }: Props) {
  const { profile, updateUser } = useUser();
  const {
    dataRequirements,
    invitationLink,
  } = useUserDocfox();

  if (typeof profile === "undefined") return null;

  function handleStart() {
    updateUser({ onboardingStage: "CONFIRMATION" });
  }

  function handleConfirm() {
    updateUser({ onboardingStage: "KYC" });
  }

  const { companyName } = profile;

  let content = null;

  if (stage === "START") {
    content = (
      <div className="t-center">
        <Logo />
        <IonText>
          <h1>Welcome {companyName}!</h1>
          <p>Please click the link below to complete your onboarding process.</p>
        </IonText>
        <IonButton onClick={handleStart}>Get Started</IonButton>
      </div>
    );
  } else if (stage === "CONFIRMATION") {
    content = (
      <div>
        <IonText className="t-center">
          <p className="brow">Step 1</p>
          <h1>Confirm account holder details</h1>
        </IonText>
        <FormAccount profile={profile} />
        <IonButton onClick={handleConfirm}>Confirm</IonButton>
      </div>
    );
  } else if (stage === "KYC") {
    let documentCount = 0;
    if (typeof dataRequirements !== "undefined") {
      documentCount = dataRequirements.data?.length || 0;
    }
    content = (
      <div className="t-center">
        <IonText>
          <p className="brow">Step 2</p>
          <h1>New account documents</h1>
          <p>{documentCount} documents required.</p>
        </IonText>
        <IonButton href={invitationLink} target="_blank">Upload documents</IonButton>
      </div>
    );
  } else if (stage === "PENDING") {
    content = (
      <div className="t-center">
        <Logo />
        <IonText>
          <h1>Thank you!</h1>
          <p>You will be notified when your documents have been approved, or if any additional documents are required.</p>
        </IonText>
      </div>
    );
  }

  return (
    <IonPage className="Onboarding">
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              {content}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
