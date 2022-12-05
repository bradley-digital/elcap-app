import { FieldHookConfig, useField } from "formik";
import "components/Form/FormInput.scss";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

export const FormInput = (props: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="FormInput">
      <input {...field} placeholder={props.placeholder} type={props.type} />

      <label htmlFor={props.name}>{props.label}</label>

      {meta.touched && meta.error ? (
        <div className="errorMsg">{meta.error}</div>
      ) : null}
    </div>
  );
};
