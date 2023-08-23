import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  IonModal,
} from "@ionic/react";
import useScript from "hooks/useScript";
import { isOpenAtom, agreementUrlAtom } from "atoms/fullscreenModal";

import "./FullscreenModal.scss";

export default function TransferAgreementModal() {
  const [mounted, setMounted] = useState(false);
  const ref = useCallback((node) => {
    if (node === null) setMounted(false);
    else setMounted(true);
  }, []);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [agreementUrl] = useAtom(agreementUrlAtom);
  const { scriptLoaded } = useScript("https://www.docusign.net/clickapi/sdk/latest/docusign-click.js");

  function onAgreed() {
    setIsOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (scriptLoaded && agreementUrl && mounted) {
      window.docuSignClick.Clickwrap.render(
        {
          agreementUrl,
          onAgreed,
        },
        "#clickwrap"
      );
    }

    return () => {
      const clickwrap = document.getElementById("#clickwrap");
      if (clickwrap) clickwrap.innerHTML = "";
    };
  }, [scriptLoaded, agreementUrl, mounted]);

  return (
    <IonModal className="FullscreenModal" isOpen={isOpen}>
      <div id="clickwrap" className="dialog" ref={ref} />
    </IonModal>
  );
}
