import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormInput.scss";

type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
} & FieldHookConfig<string>;

export default function AuthFormInput(props: Props) {
  const [field, meta] = useField(props);

  return (
    <div className="AuthFormInput">
      <input {...field} placeholder={props.placeholder} type={props.type} />

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="AuthFormInput__errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
}
