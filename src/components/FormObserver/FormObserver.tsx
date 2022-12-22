import type { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";

type Props = {
  onChange: (values: FormikValues) => void;
};

export default function FormObserver({ onChange }: Props) {
  const { initialValues, values } = useFormikContext<FormikValues>();
  const [storedValues, setStoredValues] = useState<FormikValues>(initialValues);

  useEffect(() => {
    if (isEqual(values, storedValues)) return;
    setStoredValues(values);
    onChange(values);
  }, [values]);

  return null;
}

