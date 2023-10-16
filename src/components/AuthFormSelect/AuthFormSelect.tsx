import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormSelect.scss";
import hash from "object-hash";

type Props = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & FieldHookConfig<string>;

export default function AuthFormSelect(props: Props) {
  const { options, onChange: propsOnchange } = props;
  const [field, meta] = useField(props);
  const { onChange, ...rest } = field;

  return (
    <div className="AuthFormSelect">
      <select
        className="AuthFormSelect__select"
        {...rest}
        onChange={(e) => {
          if (propsOnchange) {
            propsOnchange(e);
          } else {
            onChange(e);
          }
        }}
      >
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
