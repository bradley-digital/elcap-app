import { FieldHookConfig, useField } from "formik";
import "components/AuthForm/AuthFormInput.scss";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

export default function FormInput(props: InputProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);

  return (
    <div className="FormInput">
      <input {...field} placeholder={props.placeholder} type={props.type} />

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="FormInput__errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
}
