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
import { groupByKey } from "lib/objectUtils";

import "./UserList.scss";

export default function UserList() {
  const { authApi } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<Profile[]>([]);
  const [user, setUser] = useState<Profile>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getUserList() {
      const { data } = await authApi.get<Profile[]>("/users/list");
      setUsers(data);
    }

    if (!isModalOpen) {
      getUserList();
    }
  }, [isModalOpen]);

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setSearch(target.value.toLowerCase());
    }
  }

  function openModal(user?: Profile) {
    setUser(user);
    setIsModalOpen(true);
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().indexOf(search) > -1 ||
      user.lastName.toLowerCase().indexOf(search) > -1
  );

  const groupedUsers = groupByKey(filteredUsers, "role");

  return (
    <>
      <IonSearchbar
        debounce={400}
        onIonChange={handleSearch}
      ></IonSearchbar>

      <IonButton
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
        Add New User
      </IonButton>

      {Object.keys(groupedUsers).map((role: any, i: number) => (
        <IonList key={i} className="UserList">
          <IonListHeader>
            <IonLabel>{role}</IonLabel>
          </IonListHeader>
          {groupedUsers[role].map((user: Profile, i: number) => (
            <IonItem
              key={i}
              className="UserList__item"
              onClick={() => {
                openModal(user);
              }}
            >
              {user.firstName} {user.lastName}
            </IonItem>
          ))}
        </IonList>
      ))}

      <UserListModal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
        }}
        user={user}
      />
    </>
  );
}
