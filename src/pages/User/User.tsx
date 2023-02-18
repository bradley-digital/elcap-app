import { useParams } from "react-router-dom";
import {
  IonCol,
  IonGrid,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserManagement from "components/FormUserManagement/FormUserManagement";

// hooks
import useUserManagement from "hooks/useUserManagement";

export default function UserManagement() {
  const { isSuccess, data } = useUserManagement();
  const { userId } = useParams<{ userId: string }>();
  const router = useIonRouter();

  if (isSuccess && typeof data !== "undefined") {
    const user = data.find(user => user.id === userId);

    if (!user) {
      router.push("/user-management");
    }

    return (
      <PageTemplate title={`${user.firstName} ${user.lastName}`}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <FormUserManagement profile={user} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
