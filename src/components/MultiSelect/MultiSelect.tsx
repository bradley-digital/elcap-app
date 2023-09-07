import "./MultiSelect.scss";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { caretDownSharp } from "ionicons/icons";

export type Option = {
  label: string;
  value: string;
  handler?: (
    currentValue: Option[],
    option: { label: string; value: string },
  ) => void;
};

type SelectProps = {
  onChange: (value: Option[]) => void;
  options: Option[];
  defaultValue?: Option[];
  includeSelectAll?: boolean;
  modalTitle?: string;
  label?: string;
};
export default function MultipleAccountsSelect({
  onChange,
  options: opt,
  includeSelectAll = false,
  defaultValue,
  modalTitle,
  label,
}: SelectProps) {
  const options = [...opt];
  if (includeSelectAll) {
    options.unshift({
      label: "All accounts",
      value: "all",
    });
  }

  const modalRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    defaultValue || options,
  );

  function handleClick(option: Option) {
    let newSelected = [...selectedOptions];
    const selectedIndex = selectedOptions.findIndex(
      (op) => op.value === option.value,
    );
    const isSelected = newSelected[selectedIndex];

    if (option.value === "all") {
      if (isSelected) {
        newSelected = [];
      } else {
        newSelected = options;
      }
    } else {
      if (isSelected) {
        newSelected.splice(selectedIndex, 1);
        newSelected.splice(0, 1);
      } else {
        if (newSelected.length + 2 === options.length) {
          newSelected = options;
        } else {
          newSelected.push(option);
        }
      }
    }
    setSelectedOptions(newSelected);
  }

  function handleOk() {
    onChange(selectedOptions);
    setShowOptions(false);
  }

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  function handleCancel() {
    setSelectedOptions(defaultValue || options);
    setShowOptions(false);
  }

  useEffect(() => {
    function handleEsc(event: any) {
      if (event.keyCode === 27 && showOptions) {
        setShowOptions(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showOptions, setShowOptions]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        showOptions &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, showOptions]);

  return (
    <>
      <div className="MultiSelect" onClick={toggleOptions}>
        <IonLabel position="stacked">{label}</IonLabel>

        <div className="MultiSelect__selectedValues">
          {selectedOptions.length === 0 && "Select Options"}

          {includeSelectAll &&
          selectedOptions.length !== 0 &&
          selectedOptions.length === options.length
            ? "All accounts"
            : selectedOptions.map((option) => option.label).join(", ")}

          {!includeSelectAll &&
            selectedOptions.map((option) => option.label).join(", ")}

          <div className="MultiSelect__selectedValuesArrow">
            <IonIcon
              icon={caretDownSharp}
              className="MultiSelect__selectedValuesArrowIcon"
            />
          </div>
        </div>
      </div>
      {createPortal(
        <div
          className={classNames(
            "MultiSelect__modal",
            showOptions ? "MultiSelect__modalOpen" : "MultiSelect__modalClose",
          )}
        >
          <div className="MultiSelect__modalMain" ref={modalRef}>
            {modalTitle && (
              <div className="MultiSelect__modalTitleContainer">
                <h2>{modalTitle}</h2>
              </div>
            )}
            <div className="MultiSelect__checkboxWrapper">
              {options.map((option, i) => (
                <div className="MultiSelect__checkboxContainer" key={i}>
                  <label className="MultiSelect__checkboxLabelContainer">
                    <input
                      type="checkbox"
                      checked={selectedOptions.some(
                        (op) => op.value === option.value,
                      )}
                      onChange={() => {
                        handleClick(option);
                      }}
                      className="MultiSelect__checkboxInput"
                    />
                    <span className="MultiSelect__checkboxCustom"></span>
                    <span className="MultiSelect__checkboxLabel">
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="MultiSelect__modalButtonsContainer">
              <IonButton fill="clear" onClick={() => handleCancel()}>
                Cancel
              </IonButton>
              <IonButton fill="clear" onClick={() => handleOk()}>
                Ok
              </IonButton>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
