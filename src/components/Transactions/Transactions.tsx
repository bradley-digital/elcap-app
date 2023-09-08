import { Fragment } from "react";
import hash from "object-hash";

// lib
import { date as dateFormat } from "lib/formats";

// components
import {
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonList,
} from "@ionic/react";

export type Transaction = {
  date: string;
  note: string;
  amount: string;
};

type Props = {
  transactions: Transaction[];
};

const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export default function PayTransactionsTransaction({ transactions }: Props) {
  let currentDate = "";

  return (
    <IonList>
      <IonItemGroup>
        {transactions.map((transaction, i) => {
          let divider = null;
          let lines = false;
          const { date, note, amount } = transaction;
          const nextTransaction = transactions[i + 1];

          if (date !== currentDate) {
            currentDate = date;
            const formattedDate = dateFormat(date, dateOptions);
            divider = <IonItemDivider>{formattedDate}</IonItemDivider>;
          }

          if (nextTransaction?.date === currentDate) {
            lines = true;
          }

          return (
            <Fragment key={hash(transaction)}>
              {divider}
              <IonItem lines={lines ? "inset" : "none"}>
                <IonLabel>
                  <h3>{note}</h3>
                  <p>{amount}</p>
                </IonLabel>
              </IonItem>
            </Fragment>
          );
        })}
      </IonItemGroup>
    </IonList>
  );
}
