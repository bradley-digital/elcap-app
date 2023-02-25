import type { Profile } from "hooks/useUser";
import { useMemo, useState } from "react";
import * as Yup from "yup";

// lib
import { buildSchema, buildValidation } from "lib/docfoxSchema";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader } from "@ionic/react";
import FormObserver from "components/FormObserver/FormObserver";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserManagement from "hooks/useUserManagement";
import { useTemplates, useTemplate } from "hooks/useDocfox";

type Props = {
  profile: Profile;
};

export default function FormUserDocfox({ profile }: Props) {
  const [templateId, setTemplateId] = useState("");
  const { templates } = useTemplates();
  const { template } = useTemplate(templateId);
  const { update } = useUserManagement();
  const { schema, required } = useMemo(
    () => buildSchema(template?.data?.attributes?.profile_schema),
    [template]
  );
  const validationObject = useMemo(
    () => buildValidation(schema, required),
    [schema, required],
  );

  const { id } = profile;

  const options = templates?.data?.map((template) => {
    const value = template?.id;
    const label = template?.attributes?.kyc_entity_type_name;
    return {
      value,
      label,
    };
  }) || [];

  function handleChange(values) {
    if (values.entityTemplate) {
      setTemplateId(values.entityTemplate);
    }
  }

  return (
    <Formik
      initialValues={{
        entityTemplate: "",
      }}
      validationSchema={Yup.object(validationObject)}
      onSubmit={(values) => {
        console.log(values);
        //update({ id, ...values });
      }}
    >
      <Form>
        <FormObserver onChange={handleChange} />
        <IonList>
          <IonListHeader>
            Docfox KYC
          </IonListHeader>
          <FormSelect
            label="Entity Type"
            name="entityTemplate"
            options={options}
          />
          <SubmitButton>Update</SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
