// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormLogin from "components/FormLogin/FormLogin";
import GoogleLoginButton from "components/SocialLoginButton/GoogleLoginButton";
import FacebookLoginButton from "components/SocialLoginButton/FacebookLoginButton";

export default function Login() {
  return (
    <AuthPageTemplate title="Login">
      <IonText>
        <p>Hi there! Welcome to El Capitan.</p>
      </IonText>
      <FormLogin />
      <div className="flex-row ion-padding-top">
        <GoogleLoginButton />
        <FacebookLoginButton />
      </div>
      <IonText className="d-flex ion-justify-content-between ion-padding-top">
        <Link to="/forgot-password" className="secondary">
          Forgot password?
        </Link>
        <Link to="/register">Create account</Link>
      </IonText>
    </AuthPageTemplate>
  );
}
