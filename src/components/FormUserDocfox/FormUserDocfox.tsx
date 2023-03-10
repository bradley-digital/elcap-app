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
import { IonButton, IonList, IonListHeader } from "@ionic/react";
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

type Props = {
  profile: Profile;
};

export default function FormUserDocfox({ profile }: Props) {
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
  const contact = included?.find(data => (
    data?.type === "contact" &&
    data?.attributes?.slug === "primary_point_of_contact"
  ));

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
    <>
      {!!invitationLink && (
        <div>
          <h3>Upload documents</h3>
          <IonButton href={invitationLink} expand="block" target="_blank">Open link</IonButton>
          <hr />
        </div>
      )}
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
          if (!applicationId || templateId !== initialTemplateId) {
            const postData = buildPostData(values);
            postData.userId = userId;
            postApplication(postData);
          } else if (application) {
            updateApplication();
          }
        }}
      >
        <Form className="FormUserDocfox">
          <FormObserver onChange={handleChange} />
          <IonList>
            <IonListHeader>
              DocFox Application
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
    </>
  );
}
