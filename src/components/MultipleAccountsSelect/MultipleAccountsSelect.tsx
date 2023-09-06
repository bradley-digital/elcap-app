import { AlertInput, IonAlert } from "@ionic/react";
import "./FormMultiSelect.scss";
import { useState } from "react";

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
  // onChange,
  options,
}: // defaultSelected = [],
// selected: selectedOptions = [],
// setSelected: setSelectedOptions,
SelectProps) {
  const [showOptions, setShowOptions] = useState(false);

  // const [selectedOptions, setSelectedOptions] =
  //   useState<{ label: string; value: string }[]>(options);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(options.length).fill(false),
  );
  const handleClick = (option: Option) => {
    const newSelected = [...selectedOptions];
    const selectedIndex = options.findIndex((op) => op.value === option.value);
    const isSelected = newSelected[selectedIndex];

    newSelected[selectedIndex] = isSelected;
    console.log({ option, isSelected, selectedIndex, newSelected });

    if (option.value === "all") {
      if (isSelected) {
        newSelected.fill(false);
      } else {
        newSelected.fill(true);
      }
    } else {
      newSelected[selectedIndex] = !isSelected;
    }

    setSelectedOptions(newSelected);
    // let newSelected = [...selectedOptions];
    // const selectedIndex = selectedOptions.findIndex(
    //   (op) => op.value === option.value,
    // );
    // const isSelected = newSelected[selectedIndex];

    // if (option.value === "all") {
    //   if (isSelected) {
    //     newSelected = [];
    //   } else {
    //     newSelected = options;
    //   }
    // } else {
    //   if (isSelected) {
    //     newSelected.splice(selectedIndex, 1);
    //   } else {
    //     newSelected.push(option);
    //   }
    // }
    // setSelectedOptions(newSelected);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  console.log({ selectedOptions });

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
          ...options.map(
            (option, i) =>
              ({
                type: "checkbox",
                label: option.label,
                value: {
                  label: option.label,
                  value: option.value,
                },
                checked: selectedOptions[i],
                handler: () => {
                  handleClick({
                    label: option.label,
                    value: option.value,
                  });
                },
              } as AlertInput),
          ),
        ]}
      />
    </div>
  );
}
