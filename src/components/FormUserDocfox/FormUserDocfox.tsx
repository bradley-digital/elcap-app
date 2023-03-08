import type { Profile } from "hooks/useUser";
import { useMemo, useState } from "react";
import * as Yup from "yup";

// lib
import {
  buildInitialValues,
  buildFormSections,
  buildPostData,
  buildSchema,
  buildValidation,
  buildUpdateData,
} from "lib/docfoxSchema";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader } from "@ionic/react";
import FormObserver from "components/FormObserver/FormObserver";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import {
  useApplication,
  useTemplates,
  useTemplate
} from "hooks/useDocfox";

// helpers
import { buildFormInputs } from "./helpers";

// styles
import "./FormUserDocfox.scss";

type Props = {
  profile: Profile;
};

export default function FormUserDocfox({ profile }: Props) {
  const { id } = profile;
  const applicationId = profile?.docfoxApplication?.applicationId || "";
  const initialTemplateId = profile?.docfoxApplication?.templateId || "";
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const { templates } = useTemplates();
  const { template } = useTemplate(templateId);
  const {
    application,
    postApplication,
    postProfileData,
    patchProfileData,
  } = useApplication(applicationId);

  const schema = useMemo(
    () => buildSchema(template?.data?.attributes?.profile_schema),
    [template]
  );
  const initialValues = useMemo(
    () => buildInitialValues(templateId, application, schema),
    [templateId, application, schema]
  );
  const validationObject = useMemo(
    () => buildValidation(schema),
    [schema],
  );
  const formSections = useMemo(
    () => buildFormSections(schema),
    [schema]
  );
  const formInputs = useMemo(
    () => buildFormInputs(formSections),
    [formSections]
  );

  const entityTemplateOptions = templates?.data?.map((template) => {
    const value = template?.id;
    const label = template?.attributes?.kyc_entity_type_name;
    return {
      value,
      label,
    };
  }) || [];

  function handleChange(values) {
    if (values.kyc_entity_template_id) {
      setTemplateId(values.kyc_entity_template_id);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object(validationObject)}
      onSubmit={(values) => {
        if (!applicationId || templateId !== initialTemplateId) {
          const postData = buildPostData(values);
          postData.userId = id;
          postApplication(postData);
        } else if (application) {
          const { postData, patchData } = buildUpdateData(application, values);
          for (const data of postData) {
            postProfileData(data);
          }
          for (const data of patchData) {
            patchProfileData(data);
          }
        }
      }}
    >
      <Form className="FormUserDocfox">
        <FormObserver onChange={handleChange} />
        <IonList>
          <IonListHeader>
            DocFox KYC
          </IonListHeader>
          <FormSelect
            label="Entity Template"
            name="kyc_entity_template_id"
            options={entityTemplateOptions}
          />
          {formInputs}
          <SubmitButton>Submit</SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
