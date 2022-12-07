import { useEffect, useState } from "react";
import {
  IonButton,
  IonListHeader,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import useAuth from "hooks/useAuth";
import UserListModal from "components/UserListModal/UserListModal";
import { Profile } from "pages/Account/Account";
import { groupByKey } from "utils/groupBy";

function UserList() {
  const { authFetch } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [filter, setFilter] = useState<Profile[]>([]);
  const [user, setUser] = useState<Profile>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getDate() {
      const data = (await authFetch("/users/list")) as Profile[];

      console.log(groupByKey(data, "role"));

      setUsers(data);
      setFilter(data);
    }

    getDate();
  }, []);

  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    const filterUsers = filter.filter(
      (d) =>
        d.firstName.toLowerCase().indexOf(query) > -1 ||
        d.lastName.toLowerCase().indexOf(query) > -1
    );

    setUsers(filterUsers);
  };

  const openModal = (user?: Profile) => {
    setUser(user);
    setIsModalOpen(true);
  };

  const groupUser = groupByKey(users, "role");

  return (
    <>
      <IonSearchbar
        debounce={500}
        onIonChange={(ev) => handleChange(ev)}
      ></IonSearchbar>

      <IonButton
        style={{ marginLeft: 12, marginRight: 12 }}
        expand="block"
        onClick={() =>
          openModal({
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            createdAt: "",
          })
        }
      >
        ADD NEW USER
      </IonButton>

      {Object.keys(groupUser).map((role: any, i: number) => (
        <IonList key={i}>
          <IonListHeader>
            <IonLabel>{role}</IonLabel>
          </IonListHeader>
          {groupUser[role].map((user: Profile, i: number) => (
            <IonItem key={i} onClick={() => openModal(user)}>
              {user.firstName} {user.lastName}
            </IonItem>
          ))}
        </IonList>
      ))}

      <UserListModal
        user={user}
        isOpen={isModalOpen}
        onWillDismiss={() => setIsModalOpen(false)}
      />
    </>
  );
}
export default UserList;
