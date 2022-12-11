import { ReactComponent as LogoSvg } from "assets/elcapitanadvisors_logo.svg";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="Logo">
      <LogoSvg />
      <p>EL CAPITAN PAYMENTS</p>
    </div>
  );
}
