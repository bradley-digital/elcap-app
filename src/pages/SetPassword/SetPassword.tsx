// hooks
import { useParams } from "react-router-dom";
import { useQueryParams } from "hooks/useQueryParams";

// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormSetPassword from "components/FormSetPassword/FormSetPassword";

export default function SetPassword() {
  const { registerToken } = useParams<{ registerToken: string }>();
  const queryParams = useQueryParams();
  const otpAuthUrl = queryParams.get("otpAuthUrl") || "";

  return (
    <AuthPageTemplate title="Complete registration">
      <FormSetPassword otpAuthUrl={otpAuthUrl} registerToken={registerToken} />
      <IonText className="AuthPageTemplate__linkRow">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
