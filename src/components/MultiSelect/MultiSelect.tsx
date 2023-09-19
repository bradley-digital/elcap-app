import "./MultiSelect.scss";
import { useEffect, useState } from "react";
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import { caretDownSharp } from "ionicons/icons";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  modalTitle?: string;
  onChange: (value: Option[]) => void;
  options: Option[];
};

export default function MultiSelect({
  label,
  modalTitle,
  onChange,
  options,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [allSelected, setAllSelected] = useState(true);
  const [selected, setSelected] = useState(new Array(options.length).fill(true));

  function handleSelectAll() {
    const newSelectedOptions = [...selected];
    if (allSelected) {
      newSelectedOptions.fill(false);
      setSelected(newSelectedOptions);
      setAllSelected(false);
    } else {
      newSelectedOptions.fill(true);
      setSelected(newSelectedOptions);
      setAllSelected(true);
    }
  }

  function handleSelect(value: string) {
    const newSelected = [...selected];
    const selectedIndex = options.findIndex(
      (op) => op.value === value,
    );
    newSelected[selectedIndex] = !newSelected[selectedIndex];
    setSelected(newSelected);
    if (newSelected.every(v => v === true)) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleOk() {
    const selectedOptions = [];
    options.forEach((option, i) => selected[i] && selectedOptions.push(option))
    onChange(selectedOptions);
    closeModal();
  }

  function handleCancel() {
    closeModal();
  }

  let accountsLabel = "";

  if (allSelected) {
    accountsLabel = `All ${label.toLowerCase()}`;
  } else if (selected.every(v => v === false)) {
    accountsLabel = `Select ${label.toLowerCase()}`;
  } else {
    const selectedLabels = [];
    options.forEach(({ label }, i) => selected[i] && selectedLabels.push(label))
    accountsLabel = selectedLabels.join(", ");
  }

  return (
    <>
      <IonItem className="MultiSelect" onClick={openModal} button>
        <IonLabel position="stacked">{label}</IonLabel>

        <div className="MultiSelect__selectedValues">
          <IonText>{accountsLabel}</IonText>

          <div className="MultiSelect__selectedValuesArrow">
            <IonIcon
              icon={caretDownSharp}
              className="MultiSelect__selectedValuesArrowIcon"
            />
          </div>
        </div>
      </IonItem>

      <IonModal id="multiselect-modal" isOpen={showModal} onWillDismiss={closeModal}>
        {modalTitle && (
          <IonToolbar>
            <IonTitle>{modalTitle}</IonTitle>
          </IonToolbar>
        )}
        <div className="MultiSelect__checkboxWrapper">
          <IonItem>
            <IonCheckbox
              className="MultiSelect__checkbox"
              checked={allSelected}
              onClick={handleSelectAll}
            />
            <IonLabel>Select all</IonLabel>
          </IonItem>
          {options.map(({ label, value }, i) => (
            <IonItem key={i}>
              <IonCheckbox
                className="MultiSelect__checkbox"
                checked={selected[i]}
                onClick={() => handleSelect(value)}
              />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </div>
        <div className="MultiSelect__modalButtonsContainer">
          <IonButton fill="clear" onClick={handleCancel}>
            Cancel
          </IonButton>
          <IonButton fill="clear" onClick={handleOk}>
            Ok
          </IonButton>
        </div>
      </IonModal>
    </>
  );
}
