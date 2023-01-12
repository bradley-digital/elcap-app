import type { Profile } from "hooks/useUser";
import { useState } from "react";
import { useAtom } from "jotai";
import hash from "object-hash";

import {
  IonListHeader,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import { isOpenAtom, userAtom } from "atoms/userListModal";
import UserListModal from "components/UserListModal/UserListModal";
import { groupByKey } from "lib/objectUtils";

import "./UserList.scss";

type Props = {
  users: Profile[];
};

export default function UserList({ users }: Props) {
  const [, setUser] = useAtom(userAtom);
  const [, setIsOpen] = useAtom(isOpenAtom);
  const [search, setSearch] = useState<string>("");

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setSearch(target.value.toLowerCase());
    }
  }

  function openModal(user: Profile) {
    setUser(user);
    setIsOpen(true);
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.indexOf(search.toLowerCase()) > -1;
  });

  const groupedUsers = groupByKey(filteredUsers, "role");

  return (
    <>
      <IonSearchbar
        debounce={400}
        onIonChange={handleSearch}
      ></IonSearchbar>

      {Object.keys(groupedUsers).map((role: any) => (
        <IonList key={hash(role)} className="UserList">
          <IonListHeader>
            <IonLabel>{role}</IonLabel>
          </IonListHeader>
          {groupedUsers[role].map((user: Profile) => (
            <IonItem
              key={hash(user)}
              className="UserList__item"
              onClick={() => openModal(user)}
            >
              {user.firstName} {user.lastName}
            </IonItem>
          ))}
        </IonList>
      ))}

      <UserListModal />
    </>
  );
}
