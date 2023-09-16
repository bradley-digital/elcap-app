import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormCheckbox.scss";

type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
} & FieldHookConfig<string>;

export default function AuthFormCheckbox(props: Props) {
  const [field, meta] = useField(props);

  return (
    <div className="AuthFormCheckbox">
      <input {...field} placeholder={props.placeholder} type="checkbox" />

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="AuthFormCheckbox__errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
}
