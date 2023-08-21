import "./FormDatePicker.scss";
import { useField } from "formik";
import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";

type Props = {
  label: string;
  name: string;
  type: string;
};

const FormDatePicker = ({ label, ...props }: Props) => {
  const [, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (e: any) => {
    e = e.split("T")[0];
    setValue(e);
  };

  return (
    <>
      <h6 className="FormDatePicker__dateTimeLabel">{label}</h6>

      <IonDatetimeButton
        datetime={props.name}
        className="FormDatePicker__dateTimeButton"
      />

      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id={props.name}
          showDefaultButtons={true}
          presentation="date"
          onIonChange={(e) => handleChange(e.detail.value)}
          value={meta.value}
        />
      </IonModal>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormDatePicker;
