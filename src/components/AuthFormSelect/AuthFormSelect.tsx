import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormSelect.scss";
import hash from "object-hash";

type Props = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
} & FieldHookConfig<string>;

export default function AuthFormSelect(props: Props) {
  const { options } = props;
  const [field, meta] = useField(props);

  return (
    <div className="AuthFormSelect">
      <select {...field} className="AuthFormSelect__select">
        {options.map((option) => (
          <option key={hash(option)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="AuthFormSelect__errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
}
