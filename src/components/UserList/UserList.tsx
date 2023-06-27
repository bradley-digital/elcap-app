import type { Profile } from "hooks/useUser";
import { useState } from "react";

import {
  IonListHeader,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import { groupByKey } from "lib/objectUtils";

import "./UserList.scss";

type Props = {
  users: Profile[];
};

export default function UserList({ users }: Props) {
  const [search, setSearch] = useState("");

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setSearch(target.value.toLowerCase());
    }
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.indexOf(search.toLowerCase()) > -1;
  });

  const groupedUsers = groupByKey(filteredUsers, "role");
  const sortedKeys = Object.keys(groupedUsers).sort();

  return (
    <div className="UserList">
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      {sortedKeys.map((role: any) => (
        <IonList key={role} className="UserList__sublist">
          <IonListHeader>
            <IonLabel>{`${role.charAt(0).toUpperCase()}${role.slice(1).toLowerCase()}`}</IonLabel>
          </IonListHeader>
          {groupedUsers[role].map((user: Profile) => (
            <IonItem
              key={user.id}
              className="UserList__item"
              href={`/user-management/${user.id}`}
            >
              {user.firstName} {user.lastName}
            </IonItem>
          ))}
        </IonList>
      ))}
    </div>
  );
}
