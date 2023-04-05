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
import { IonButton, IonIcon, IonList, IonListHeader } from "@ionic/react";
import { alertCircle, checkmarkCircle, closeCircle } from "ionicons/icons";
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
    invitationLink,
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
  const validationObject = useMemo(() => buildValidation(schema), [schema]);
  const formSections = useMemo(() => buildFormSections(schema), [schema]);
  const formInputs = useMemo(
    () => buildFormInputs(formSections),
    [formSections]
  );

  let statusElement = (
    <div className="FormUserDocfox__status danger">
      <IonIcon icon={closeCircle} />
      <p>
        The application has not been started. If this is urgent please contact
        your El Capitan admin.
      </p>
    </div>
  );

  if (typeof application !== "undefined" && typeof template !== "undefined") {
    const status = application?.data?.attributes?.status?.status;
    const statusDescription =
      application?.data?.attributes?.status?.status_description;

    if (status === "in_progress") {
      statusElement = (
        <div className="FormUserDocfox__status warning">
          <IonIcon icon={alertCircle} />
          {statusDescription && <p>{statusDescription}</p>}
        </div>
      );
    } else if (status === "approved") {
      statusElement = (
        <div className="FormUserDocfox__status success">
          <IonIcon icon={checkmarkCircle} />
          {statusDescription && <p>{statusDescription}</p>}
        </div>
      );
    }

    return (
      <div className="FormDocfox">
        <div>
          {statusElement}
          <hr />
        </div>
        {!!invitationLink && (
          <div>
            <h3>Upload documents</h3>
            <p>
              Use this portal to upload the documents required for your
              application.
            </p>
            <IonButton href={invitationLink} expand="block" target="_blank">
              Open portal
            </IonButton>
            <hr />
          </div>
        )}
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object(validationObject)}
          onSubmit={(values) => {
            async function updateApplication() {
              const { deleteData, patchData, postData } = buildUpdateData(
                application,
                values
              );
              if (!Array.isArray(patchData)) return;
              for (const data of patchData) {
                await patchProfileData(data);
              }
              if (!Array.isArray(deleteData)) return;
              for (const data of deleteData) {
                await deleteProfileData(data);
              }
              if (!Array.isArray(postData)) return;
              for (const data of postData) {
                await postProfileData(data);
              }
            }
            updateApplication();
          }}
        >
          <Form>
            <IonList>
              <IonListHeader>DocFox Application</IonListHeader>
              <FormInput
                className="FormInputHidden"
                name="kyc_entity_template_id"
              />
              {formInputs}
              <SubmitButton>Submit</SubmitButton>
            </IonList>
          </Form>
        </Formik>
      </div>
    );
  }

  return <div className="FormDocfox">{statusElement}</div>;
}
