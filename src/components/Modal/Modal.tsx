import "./Modal.scss";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useRef } from "react";

type ModalProps = {
  triggerText: string;
  ref?: React.RefObject<HTMLIonModalElement>;
  title?: string;
  modalContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  onWillDismiss?: (ev: CustomEvent<OverlayEventDetail>) => void;
};

export default function Modal({
  modalContent,
  headerContent,
  triggerText,
  title,
  ref,
  onWillDismiss,
}: ModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);

  function handleDismiss(ev: CustomEvent<OverlayEventDetail>) {
    onWillDismiss && onWillDismiss(ev);
  }

  function handleClose() {
    ref ? ref.current?.dismiss() : modal.current?.dismiss();
  }

  return (
    <div className="Modal">
      <IonButton id="open-modal" expand="block">
        {triggerText}
      </IonButton>
      {modalContent && (
        <IonModal
          ref={ref || modal}
          trigger="open-modal"
          onWillDismiss={(ev) => {
            handleDismiss(ev);
          }}
        >
          {headerContent ? (
            <>{headerContent}</>
          ) : (
            <>
              <IonHeader>
                <IonToolbar>
                  {title && <IonTitle>{title}</IonTitle>}
                  <IonButtons slot="end">
                    <IonButton
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Close
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
            </>
          )}

          {modalContent && (
            <IonContent className="ion-padding">{modalContent}</IonContent>
          )}
        </IonModal>
      )}
    </div>
  );
}
