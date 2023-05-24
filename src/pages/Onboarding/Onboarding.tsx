import { useEffect, useState } from "react";
import useUser from "hooks/useUser";

// components
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
} from "@ionic/react";
import {
  checkmarkCircle,
  closeCircle,
  ellipsisHorizontalCircle,
} from "ionicons/icons";
import Logo from "components/Logo/Logo";
import FormAccount from "components/FormAccount/FormAccount";

// hooks
import useUserDocfox from "hooks/useUserDocfox";
import useAuth from "hooks/useAuth";

import "./Onboarding.scss";

type Document = {
  name: string;
  status: "approved" | "pending_upload" | "rejected" | "uploaded";
};

type Props = {
  stage: string;
};

const statusIcons = {
  "approved": <IonIcon icon={checkmarkCircle} />,
  "pending_upload": <IonIcon icon={closeCircle} />,
  "rejected": <IonIcon icon={closeCircle} />,
  "uploaded": <IonIcon icon={ellipsisHorizontalCircle} />,
};

const statusMessages = {
  "approved": "Approved",
  "pending_upload": "Not submitted",
  "rejected": "Not approved",
  "uploaded": "Under review",
};

const statusColors = {
  "approved": "c-primary",
  "pending_upload": "c-danger",
  "rejected": "c-danger",
  "uploaded": "",
};

export default function Onboarding({ stage }: Props) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const { authApi } = useAuth();
  const { profile, updateUser } = useUser();
  const {
    dataRequirements,
    invitationLink,
  } = useUserDocfox();

  useEffect(() => {
    async function getDocuments() {
      const newDocuments = [];
      let newDocumentCount = 0;
      let approvedDocumentCount = 0;
      if (typeof dataRequirements !== "undefined") {
        newDocumentCount = dataRequirements.data?.length || 0;
        for (const dataRequirement of dataRequirements.data) {
          const evidenceLink = dataRequirement?.relationships?.active_evidence_submission?.links?.related;
          if (!evidenceLink) continue;
          const evidenceId = evidenceLink.split("/").pop();
          if (!evidenceId) continue;
          const { data: evidenceSubmission } =
            await authApi.get(`/docfox/evidence-submission?evidenceId=${evidenceId}`);
          const status = evidenceSubmission?.data?.attributes?.status
          const doc = {
            name: dataRequirement?.attributes?.name,
            status,
          };
          if (status === "approved") {
            approvedDocumentCount++;
          }
          newDocuments.push(doc);
        }
      }
      setDocuments(newDocuments);
      setDocumentCount(newDocumentCount);
      if (documentCount > 0 && documentCount === approvedDocumentCount) {
        updateUser({ onboardingStage: "PENDING" });
      }
    }
    getDocuments();
  }, [dataRequirements]);

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
    if (documentCount > 0) {
      content = (
        <div className="t-center">
          <IonText>
            <p className="brow">Step 2</p>
            <h1>New account documents</h1>
            <p>{documentCount} documents required</p>
          </IonText>
          <div className="Onboarding__documents">
            {documents.map(({ name, status }) => (
              <div key={name} className="Onboarding__document">
                <span>{name}</span>
                <span className={`Onboarding__documentStatus ${statusColors[status]}`}>{statusIcons[status] || null} {statusMessages[status] || ""}</span>
              </div>
            ))}
          </div>
          <IonButton href={invitationLink} target="_blank">Upload documents</IonButton>
        </div>
      );
    } else {
      content = (
        <div className="t-center">
          <IonText>
            <p className="brow">Step 2</p>
            <h1>New account documents</h1>
          </IonText>
          <IonSpinner name="crescent" />
        </div>
      );
    }
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
