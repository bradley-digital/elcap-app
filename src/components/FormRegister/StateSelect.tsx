import AuthFormSelect from "components/AuthFormSelect/AuthFormSelect";
import { states } from "lib/states";

type Props = {
  placeholder: string;
  label: string;
  name: string;
};
export default function StateSelect({ placeholder, label, name }: Props) {
  return (
    <AuthFormSelect
      placeholder={placeholder}
      label={label}
      name={name}
      options={states}
    />
  );
}
