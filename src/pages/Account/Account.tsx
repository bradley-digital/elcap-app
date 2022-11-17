import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import styles from "./Account.module.scss";

// hooks
import useAuth from "hooks/useAuth";

export default function Account() {
  const router = useIonRouter();
  const { authFetch, logout } = useAuth();
  const [profile, setProfile] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>();
  const { update } = useAuth();

  const date = new Date(profile.createdAt);
  const joinedDate = date.toLocaleDateString("en-US");

  const img = profile.img ? profile.img : "/assets/headshot.jpg";
  const name = profile.firstName
    ? profile.firstName + " " + profile.lastName
    : "N/A";
  const username = profile.userName ? profile.userName : "N/A";
  const joined = profile.createdAt ? joinedDate : "N/A";

  useEffect(() => {
    async function getUser() {
      const data = await authFetch("/users/account");
      setProfile(data);
      setLoading(false);
    }
    getUser();
    setFormikValues();
  }, [authFetch]);

  function handleLogout() {
    async function asyncLogout() {
      await logout();
      router.push("/login");
    }
    asyncLogout();
  }

  function setFormikValues() {
    formik.setFieldValue("firstName", profile.firstName);
    formik.setFieldValue("lastName", profile.lastName);
    formik.setFieldValue("email", profile.email);
    formik.setFieldValue("phone", profile.phone);
    formik.setFieldValue("userName", profile.userName);
    formik.setFieldValue("address", profile.address ? profile.address : "");
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userName: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name required"),
      lastName: Yup.string().required("Last Name required"),
      email: Yup.string().email().required("Email required"),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      userName: Yup.string().required("User Name required"),
      address: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();

      async function handleRegister() {
        try {
          await update(vals);
        } catch (err) {
          console.error(err);
        }
      }

      handleRegister();
    },
  });

  return loading ? (
    <div>loading...</div>
  ) : (
    <IonPage className={styles.accountPage}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="8">
              <IonCard className={styles.profileCard}>
                <div className="d-flex ion-justify-content-center">
                  <IonAvatar>
                    <img src={img} alt={name} />
                  </IonAvatar>
                </div>
                <IonText className="ion-text-center">
                  <h1>{name}</h1>
                  <h3>{username}</h3>
                  <p>Joined: {joined}</p>
                </IonText>
                <div className="d-flex ion-justify-content-end">
                  <IonButton onClick={handleLogout} color="danger">
                    Logout
                  </IonButton>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className={styles.contentBottom}>
          <div>
            <IonText>
              <h1>Sign Up</h1>
            </IonText>

            <form onSubmit={formik.handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.formInput}
                  placeholder="First Name"
                />
                <label className={styles.inputLabel}>First Name</label>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={styles.errorMsg}>
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>

              <div className={styles.formGroup}>
                <input
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.formInput}
                  placeholder="Last Name"
                />
                <label className={styles.inputLabel}>Last Name</label>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={styles.errorMsg}>
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>

              <div className={styles.formGroup}>
                <input
                  name="userName"
                  type="text"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.formInput}
                  placeholder="Username"
                />
                <label className={styles.inputLabel}>Username</label>
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={styles.errorMsg}>
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>

              <div className={styles.stacked}>
                <div className={styles.formGroup}>
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.formInput}
                    placeholder="Email"
                    readOnly
                  />
                  <label className={styles.inputLabel}>Email</label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className={styles.errorMsg}>{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className={styles.formGroup}>
                  <input
                    name="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.formInput}
                    placeholder="Phone"
                  />
                  <label className={styles.inputLabel}>Phone</label>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={styles.errorMsg}>{formik.errors.phone}</div>
                  ) : null}
                </div>

                <div className={styles.formGroup}>
                  <input
                    name="address"
                    type="text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.formInput}
                    placeholder="Address"
                  />
                  <label className={styles.inputLabel}>Address</label>
                  {formik.touched.address && formik.errors.address ? (
                    <div className={styles.errorMsg}>
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
              </div>

              <IonButton type="submit">Register</IonButton>
            </form>

            <div className={styles.accountHelp}>
              <p>
                Have an Account?{" "}
                <Link to="/login" className={styles.register}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
