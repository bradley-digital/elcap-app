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
import { Profile } from "hooks/useUser";
import { groupByKey } from "lib/groupBy";

function UserList() {
  const { authApi } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [filter, setFilter] = useState<Profile[]>([]);
  const [user, setUser] = useState<Profile>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getUserList() {
      const data = (await authApi.get("/users/list")).data as Profile[];
      setUsers(data);
      setFilter(data);
    }

    getUserList();
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
    setIsModalOpen(true);
    setUser(user);
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
            <IonItem
              key={i}
              onClick={() => {
                console.log("open modal");
                openModal(user);
              }}
            >
              {user.firstName} {user.lastName}
            </IonItem>
          ))}
        </IonList>
      ))}

      {isModalOpen && (
        <UserListModal
          isOpen={isModalOpen}
          onWillDismiss={() => {
            console.log("dissmiss modal");
            setIsModalOpen(false);
          }}
          user={user}
        />
      )}
    </>
  );
}
export default UserList;
