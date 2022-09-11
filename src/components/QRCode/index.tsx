import { IonCard } from '@ionic/react';
import QRCodeGenerator from 'qrcode';
import './style.scss';

interface Props {
  link: string;
}

export default function QRCode({ link }: Props) {
  let svg = '';

  QRCodeGenerator.toString(link, (error, svgString) => {
    svg = svgString;
  });

  return (
    <IonCard className="mx-0">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </IonCard>
  );
}
