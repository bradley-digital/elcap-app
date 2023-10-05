import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
} from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import ProfileItem from "components/ProfileItem/ProfileItem";
import SubmitButton from "components/SubmitButton/SubmitButton";
import { Form, Formik, FormikHelpers } from "formik";
import useUser from "hooks/useUser";
import { keyOutline } from "ionicons/icons";
import {
  confirmNewPasswordValidation,
  passwordValidation,
} from "lib/formValidation";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmNewPassword: confirmNewPasswordValidation,
});

export default function ProfileUpdatePassword() {
  const { asyncUpdatePassword } = useUser();

  const [openSetPasswordForm, setOpenSetPasswordForm] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  async function handleSubmit(
    values: Yup.InferType<typeof validationSchema>,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) {
    formikHelpers.setSubmitting(true);
    const { currentPassword, newPassword } = values;
    await asyncUpdatePassword({
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
    formikHelpers.resetForm();
    formikHelpers.setSubmitting(false);
    setOpenSetPasswordForm(false);
  }

  return (
    <IonList>
      <ProfileItem
        label="Password"
        onClick={() => {
          setOpenSetPasswordForm(!openSetPasswordForm);
        }}
        buttonName={openSetPasswordForm ? "Close" : "Change password"}
      />
      {openSetPasswordForm && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={keyOutline} /> Change password
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <Formik<Yup.InferType<typeof validationSchema>>
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <IonList>
                    <FormInput
                      label="Current password"
                      name="currentPassword"
                      type="password"
                      placeholder="Current password"
                    />
                    <FormInput
                      label="New password"
                      name="newPassword"
                      type="password"
                      placeholder="New password"
                    />
                    <FormInput
                      label="Confirm password"
                      name="confirmNewPassword"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </IonList>
                  <SubmitButton isSubmitting={isSubmitting}>Save</SubmitButton>
                </Form>
              )}
            </Formik>
          </IonCardContent>
        </IonCard>
      )}
    </IonList>
  );
}
