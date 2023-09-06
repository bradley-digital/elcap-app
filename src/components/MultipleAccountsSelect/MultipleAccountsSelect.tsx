import { AlertInput, IonAlert } from "@ionic/react";
import "./FormMultiSelect.scss";
import { useMemo, useState } from "react";

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
  // selected: Option[];
  // setSelected: (value: Option[]) => void;
  defaultSelected?: Option[];
};
export default function MultipleAccountsSelect({
  onChange,
  options,
  defaultSelected = [],
}: // selected: selectedOptions = [],
// setSelected: setSelectedOptions,
SelectProps) {
  const [showOptions, setShowOptions] = useState(false);

  const [selectedOptions, setSelectedOptions] =
    useState<{ label: string; value: string }[]>(defaultSelected);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (currentValue: Option[], option: Option) => {
    console.log({ currentValue, option });
    if (currentValue.length === 0) {
      console.log({ empty: option });
      setSelectedOptions([option]);
      // onChange([option]);
    } else if (currentValue.length > 0) {
      const hasDuplicate = currentValue.some(
        (selected) => selected.value === option.value,
      );
      if (hasDuplicate) {
        const newValue = currentValue.filter(
          (selected) => selected.value !== option.value,
        );
        console.log({ duplicate: newValue });
        setSelectedOptions(newValue);
        // onChange(newValue);
        // console.log({ selectedOptions });
      } else {
        const newValue = [...currentValue, option];
        console.log({ noDuplicate: newValue });
        setSelectedOptions(newValue);
        // onChange(newValue);
        // console.log({ selectedOptions });
      }
    }
  };

  console.log({ selectedOptions });

  useMemo(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);
  return (
    <div className="FormMultiSelect">
      <div className="FormMultiSelect__selectedValues" onClick={toggleOptions}>
        {selectedOptions.length === 0
          ? "Select Options"
          : selectedOptions.map((option) => option.label).join(", ")}
      </div>

      <IonAlert
        isOpen={true}
        onDidDismiss={() => setShowOptions(false)}
        header={"Radio"}
        inputs={[
          {
            type: "checkbox",
            label: "All accounts",
            value: {
              label: "All accounts",
              value: "All accounts",
            },
            checked: selectedOptions.some(
              (selected) => selected.value === "All accounts",
            ),
            handler: (e) => {
              handleOptionClick(selectedOptions, {
                label: "All accounts",
                value: "All accounts",
              });
            },
          },
          ...options.map(
            (option) =>
              ({
                type: "checkbox",
                label: option.label,
                value: {
                  label: option.label,
                  value: option.value,
                },
                checked: selectedOptions.some(
                  (selected) => selected.value === "All accounts",
                ),
                handler: (e) => {
                  handleOptionClick(selectedOptions, {
                    label: option.label,
                    value: option.value,
                  });
                },
              }) as AlertInput,
          ),
        ]}
      ></IonAlert>
    </div>
  );
}
