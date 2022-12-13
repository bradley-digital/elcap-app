import { useQuery } from "react-query";
import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

// hooks
import useAuth from "hooks/useAuth";
import useApi from "hooks/useApi";

// styles
import "./Account.scss";

type Profile = {
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  phone: string;
  email: string;
  address: string;
};

export default function Account() {
  const { logout } = useAuth();
  const { getAccount } = useApi();
  const { isSuccess, data } = useQuery<Profile>("account", getAccount);

  if (isSuccess) {
    const { firstName, lastName, userName, createdAt, phone, email, address } =
      data;

    const joined = new Date(createdAt).toLocaleString("en-US");

    return (
      <PageTemplate title="Account" className="Account">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <IonCard className="Account__profileCard">
                <IonText className="ion-text-center">
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <h3>{userName}</h3>
                  <p>Joined: {joined}</p>
                </IonText>
                <div className="d-flex ion-justify-content-end">
                  <IonButton onClick={logout} color="danger">
                    Logout
                  </IonButton>
                </div>
              </IonCard>
              <IonList>
                <IonListHeader>Personal information</IonListHeader>
                <IonItem>
                  <IonLabel position="stacked">First Name</IonLabel>
                  <IonInput value={firstName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput value={lastName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Username</IonLabel>
                  <IonInput value={userName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput value={email} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Phone</IonLabel>
                  <IonInput value={phone} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput value={address} readonly />
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
