import { Fragment } from "react";
import hash from "object-hash";

// components
import { IonItem, IonItemDivider, IonLabel } from "@ionic/react";

// consts
import { transactions } from "./consts";

export default function PayTransactionsTransaction() {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  let currentDate = "";

  return (
    <>
      {transactions.map(({ date, note, amount, ...rest }, i) => {
        let divider = null;
        let lines = true;
        const nextTransaction = transactions[i + 1];

        if (date !== currentDate) {
          currentDate = date;
          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString(
            "en-US",
            dateOptions
          );
          divider = <IonItemDivider>{formattedDate}</IonItemDivider>;
        }

        if (typeof nextTransaction !== "undefined") {
          if (nextTransaction.date !== currentDate) {
            lines = false;
          }
        } else {
          lines = false;
        }

        return (
          <Fragment key={hash(rest)}>
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
    </>
  );
}
