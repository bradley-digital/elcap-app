type Document = {
  name: string;
  status:
    | "pending_upload"
    | "data_call_pending"
    | "data_call_complete"
    | "being_processed"
    | "pending_review"
    | "accepted"
    | "rejected"
    | "invalidated";
};

import { useEffect, useState } from "react";

// components
import { IonButton, IonIcon, IonSpinner, IonText } from "@ionic/react";
import {
  checkmarkCircle,
  closeCircle,
  ellipsisHorizontalCircle,
} from "ionicons/icons";
import Logo from "components/Logo/Logo";
import FormAccount from "components/FormAccount/FormAccount";

// hooks
import useUser from "hooks/useUser";
import useUserDocfox from "hooks/useUserDocfox";
import useAuth from "hooks/useAuth";

import "./OnboardingSteps.scss";

const statuses = {
  pending_upload: {
    icon: <IonIcon icon={closeCircle} />,
    message: "Not submitted",
    color: "c-danger",
  },
  data_call_pending: {
    icon: <IonIcon icon={ellipsisHorizontalCircle} />,
    message: "External data loading",
    color: "",
  },
  data_call_complete: {
    icon: <IonIcon icon={ellipsisHorizontalCircle} />,
    message: "External data loaded",
    color: "",
  },
  being_processed: {
    icon: <IonIcon icon={ellipsisHorizontalCircle} />,
    message: "Processing image",
    color: "",
  },
  pending_review: {
    icon: <IonIcon icon={ellipsisHorizontalCircle} />,
    message: "Under review",
    color: "",
  },
  accepted: {
    icon: <IonIcon icon={checkmarkCircle} />,
    message: "Approved",
    color: "c-primary",
  },
  rejected: {
    icon: <IonIcon icon={closeCircle} />,
    message: "Rejected",
    color: "c-danger",
  },
  invalidated: {
    icon: <IonIcon icon={closeCircle} />,
    message: "Invalidated",
    color: "c-danger",
  },
};

export default function OnboardingSteps() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const { authApi } = useAuth();
  const { profile, updateUser } = useUser();
  const { dataRequirements, invitationLink } = useUserDocfox();

  useEffect(() => {
    async function getDocuments() {
      if (typeof dataRequirements === "undefined") return;
      const newDocuments = [];
      let newDocumentCount = 0;
      let approvedDocumentCount = 0;
      newDocumentCount = dataRequirements.data?.length || 0;
      for (const dataRequirement of dataRequirements.data) {
        const evidenceLink =
          dataRequirement?.relationships?.active_evidence_submission?.links
            ?.related;
        if (!evidenceLink) continue;
        const evidenceId = evidenceLink.split("/").pop();
        if (!evidenceId) continue;
        const { data: evidenceSubmission } = await authApi.get(
          `/docfox/evidence-submission?evidenceId=${evidenceId}`
        );
        const status = evidenceSubmission?.data?.attributes?.status;
        const doc = {
          name: dataRequirement?.attributes?.name,
          status,
        };
        if (status === "accepted") {
          approvedDocumentCount++;
        }
        newDocuments.push(doc);
      }
      if (documentCount > 0) {
        if (documentCount === approvedDocumentCount) {
          updateUser({ onboardingStage: "PENDING" });
        } else if (documentCount > approvedDocumentCount) {
          updateUser({ onboardingStage: "KYC" });
        }
      }
      setDocuments(newDocuments);
      setDocumentCount(newDocumentCount);
    }
    getDocuments();
  }, [dataRequirements]);

  if (typeof profile === "undefined") return null;

  const { companyName, onboardingStage } = profile;

  function handleStart() {
    updateUser({ onboardingStage: "CONFIRMATION" });
  }

  function handleConfirm() {
    updateUser({ onboardingStage: "KYC" });
  }

  if (onboardingStage === "START") {
    return (
      <div className="t-center">
        <Logo />
        <IonText>
          <h1>Welcome {companyName}!</h1>
          <p>
            Please click the link below to complete your onboarding process.
          </p>
        </IonText>
        <IonButton onClick={handleStart}>Get Started</IonButton>
      </div>
    );
  } else if (onboardingStage === "CONFIRMATION") {
    return (
      <div>
        <IonText className="t-center">
          <p className="brow">Step 1</p>
          <h1>Confirm account holder details</h1>
        </IonText>
        <FormAccount profile={profile} />
        <IonButton onClick={handleConfirm}>Confirm</IonButton>
      </div>
    );
  } else if (onboardingStage === "KYC") {
    return (
      <div className="t-center">
        <IonText className="t-center">
          <p className="brow">Step 2</p>
          <h1>New account documents</h1>
        </IonText>
        {documentCount > 0 ? (
          <>
            <IonText className="t-center">
              <p>{documentCount} documents required</p>
            </IonText>
            <div className="OnboardingSteps__documents">
              {documents.map(({ name, status }) => (
                <div key={name} className="OnboardingSteps__document">
                  <span>{name}</span>
                  <span
                    className={`OnboardingSteps__documentStatus ${statuses[status].color}`}
                  >
                    {statuses[status].icon || null}{" "}
                    {statuses[status].message || ""}
                  </span>
                </div>
              ))}
            </div>
            <IonButton href={invitationLink} target="_blank">
              Upload documents
            </IonButton>
          </>
        ) : (
          <IonSpinner name="crescent" />
        )}
      </div>
    );
  } else if (onboardingStage === "PENDING") {
    return (
      <div className="t-center">
        <Logo />
        <IonText>
          <h1>Thank you!</h1>
          <p>
            You will be notified when your documents have been approved, or if
            any additional documents are required.
          </p>
        </IonText>
      </div>
    );
  }

  return null;
}
