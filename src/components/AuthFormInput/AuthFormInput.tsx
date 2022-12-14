import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import "./AuthFormInput.scss";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
};

export default function AuthFormInput(props: InputProps & FieldHookConfig<string>) {
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
