import { IonCard } from "@ionic/react";
import QRCodeGenerator from "qrcode";

interface Props {
  link: string;
}

export default function QRCode({ link }: Props) {
  let svg = "";

  QRCodeGenerator.toString(link, (error, svgString) => {
    svg = svgString;
  });

  return (
    <IonCard>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </IonCard>
  );
}
