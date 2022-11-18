import styles from "./Logo.module.scss";
import { ReactComponent as LogoSvg } from "assets/elcapitanadvisors_logo.svg";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <LogoSvg />
      <p>EL CAPITAN PAYMENTS</p>
    </div>
  );
}
