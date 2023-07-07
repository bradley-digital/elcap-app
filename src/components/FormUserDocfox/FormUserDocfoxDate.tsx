import { useField } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

type Props = {
  label: string;
  name: string;
  type: string;
};

const FormUserDocfoxDate = ({ label, ...props }: Props) => {
  const [, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e: Date) => {
    setStartDate(e);
    setValue(moment(e).format("YYYY-MM-DD"));
  };

  return (
    <>
      <h6 className="FormUserDocfox__dateTimeLabel">{label}</h6>

      <DatePicker
        selected={startDate}
        onChange={(date: Date) => handleChange(date)}
        popperPlacement="right"
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormUserDocfoxDate;
