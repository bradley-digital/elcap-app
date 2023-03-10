import { useMemo } from "react";
import * as Yup from "yup";

// lib
import {
  buildInitialValues,
  buildFormSections,
  buildSchema,
  buildValidation,
  buildUpdateData,
} from "lib/docfoxSchema";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserDocfox from "hooks/useUserDocfox";

// helpers
import { buildFormInputs } from "components/FormUserDocfox/helpers";

import "./FormDocfox.scss";

export default function FormDocfox() {
  const {
    application,
    template,
    deleteProfileData,
    patchProfileData,
    postProfileData,
  } = useUserDocfox();
  const templateId = template?.data?.id || "";

  const schema = useMemo(
    () => buildSchema(template?.data?.attributes?.profile_schema),
    [template]
  );
  const initialValues = useMemo(
    () => buildInitialValues(application, schema, templateId),
    [application, schema]
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

  if (typeof application !== "undefined" && typeof template !== "undefined") {
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object(validationObject)}
        onSubmit={(values) => {
          async function updateApplication() {
            const { deleteData, patchData, postData } = buildUpdateData(application, values);
            for (const data of patchData) {
              await patchProfileData(data);
            }
            for (const data of deleteData) {
              await deleteProfileData(data);
            }
            for (const data of postData) {
              await postProfileData(data);
            }
          }
          updateApplication();
        }}
      >
        <Form className="FormDocfox">
          <IonList>
            <IonListHeader>
              DocFox Application
            </IonListHeader>
            <FormInput
              className="FormInputHidden"
              name="kyc_entity_template_id"
            />
            {formInputs}
            <SubmitButton>Submit</SubmitButton>
          </IonList>
        </Form>
      </Formik>
    );
  }

  return null;
}
