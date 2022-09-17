import { Fragment } from 'react';
import {
  IonCol,
  IonGrid,
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRow,
} from '@ionic/react';
import PageTemplate from 'components/PageTemplate'

type Transaction = {
  date: string;
  note: string;
  amount: string;
};

const transactions: Transaction[] = [
  {
    date: '09/01/2022',
    note: 'The Golden Leaf - Mimosa',
    amount: '$41.37',
  },
  {
    date: '09/01/2022',
    note: 'The Golden Leaf - Lemon Splash',
    amount: '$48.14',
  },
  {
    date: '08/27/2022',
    note: 'Billo - Durban Diesel',
    amount: '$35.72',
  },
  {
    date: '08/26/2022',
    note: 'Billo - Sour Peach Lemonade Gummies',
    amount: '$33.59',
  },
];

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

export default function Transactions() {
  let currentDate = '';

  return (
    <PageTemplate title="Transactions">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <IonList>
              <IonItemGroup>
                {transactions.map(({ date, note, amount }, i) => {
                  let divider = null;
                  let lines = true;
                  const nextTransaction = transactions[i + 1];

                  if (date !== currentDate) {
                    currentDate = date;
                    const dateObj = new Date(date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);
                    divider = <IonItemDivider>{formattedDate}</IonItemDivider>;
                  }

                  if (typeof nextTransaction !== 'undefined') {
                    if (nextTransaction.date !== currentDate) {
                      lines = false;
                    }
                  } else {
                    lines = false;
                  }

                  return (
                    <Fragment key={`${date}-${note}-${amount}`}>
                      {divider}
                      <IonItem lines={lines ? 'inset' : 'none'}>
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
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
