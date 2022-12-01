import { FieldHookConfig, useField } from "formik";
import styles from "./FormInput.module.scss";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

export const FormInput = (props: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.formGroup}>
      <input
        {...field}
        placeholder={props.placeholder}
        type={props.type}
        className={styles.formInput}
      />

      <label htmlFor={props.name} className={styles.inputLabel}>
        {props.label}
      </label>

      {meta.touched && meta.error ? (
        <div className={styles.errorMsg}>{meta.error}</div>
      ) : null}
    </div>
  );
};
