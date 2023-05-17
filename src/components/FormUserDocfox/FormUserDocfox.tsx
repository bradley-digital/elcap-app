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
import {
  IonButton,
  IonIcon,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { alertCircle, checkmarkCircle, closeCircle } from "ionicons/icons";
import FormObserver from "components/FormObserver/FormObserver";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import {
  useApplication,
  useInvitationLink,
  useTemplate,
  useTemplates,
} from "hooks/useDocfox";

// helpers
import { buildFormInputs } from "./helpers";

// styles
import "./FormUserDocfox.scss";

type Props = {
  profile: Profile;
};

export default function FormUserDocfox({ profile }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: userId } = profile;
  const applicationId = profile?.docfoxApplication?.applicationId || "";
  const initialTemplateId = profile?.docfoxApplication?.templateId || "";
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [contactId, setContactId] = useState("");
  const { templates } = useTemplates();
  const { template } = useTemplate(templateId);
  const {
    application,
    deleteProfileData,
    patchProfileData,
    postApplication,
    postProfileData,
  } = useApplication(applicationId);
  const { invitationLink } = useInvitationLink(contactId);

  const included = application?.included || [];

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const contact = included?.find(
    (data: any) =>
      data?.type === "contact" &&
      data?.attributes?.slug === "primary_point_of_contact"
  );

  if (!contactId && contact?.id) {
    setContactId(contact.id);
  }

  const schema = useMemo(
    () => buildSchema(template?.data?.attributes?.profile_schema),
    [template]
  );
  const initialValues = useMemo(
    () => buildInitialValues(application, schema, templateId),
    [templateId, application, schema]
  );
  const validationObject = useMemo(() => buildValidation(schema), [schema]);
  const formSections = useMemo(() => buildFormSections(schema), [schema]);
  const formInputs = useMemo(
    () => buildFormInputs(formSections),
    [formSections]
  );

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const entityTemplateOptions =
    templates?.data?.map((template: any) => {
      const value = template?.id;
      const label = template?.attributes?.kyc_entity_type_name;
      return {
        value,
        label,
      };
    }) || [];

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function handleChange(values: any) {
    if (
      values?.kyc_entity_template_id &&
      templateId !== values.kyc_entity_template_id
    ) {
      setTemplateId(values.kyc_entity_template_id);
    }
  }

  let statusElement = null;
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
  } else {
    statusElement = (
      <div className="FormUserDocfox__status danger">
        <IonIcon icon={closeCircle} />
        <p>The application has not been started.</p>
      </div>
    );
  }

  return (
    <div className="FormUserDocfox">
      {!!statusElement && (
        <div>
          {statusElement}
          <hr />
        </div>
      )}
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
          setIsSubmitting(true);
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
          if (!applicationId || templateId !== initialTemplateId) {
            const postData = buildPostData(values);
            postData.userId = userId;
            postApplication(postData);
          } else if (application) {
            updateApplication();
          }
          setIsSubmitting(false);
        }}
      >
        <Form>
          <FormObserver onChange={handleChange} />
          <IonList>
            <IonListHeader>DocFox Application</IonListHeader>
            <FormSelect
              label="Entity Template"
              name="kyc_entity_template_id"
              options={entityTemplateOptions}
            />
            {formInputs}
            <SubmitButton isSubmitting={isSubmitting}>
              Submit
            </SubmitButton>
          </IonList>
        </Form>
      </Formik>
    </div>
  );
}
