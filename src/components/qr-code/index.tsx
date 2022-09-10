import QRCode from 'qrcode';
import './style.css';

interface Props {
  link: string;
}

export default function QrCode({ link }: Props) {
  let svg = '';

  QRCode.toString(link, (error, svgString) => {
    svg = svgString;
  });

  return <div className="qr-wrapper" dangerouslySetInnerHTML={{ __html: svg }} />
}
