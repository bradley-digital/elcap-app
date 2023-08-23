import type { UseMutateAsyncFunction } from "react-query";
import type {
  Transfer,
  TransferCreateInput,
} from "hooks/useWesternAllianceAccount";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  IonModal,
} from "@ionic/react";
import useScript from "hooks/useScript";
import { agreementUrlAtom, isOpenAtom, transferBodyAtom } from "atoms/transferAgreementModal";

import "./TransferAgreementModal.scss";

type Props = {
  createTransfer: UseMutateAsyncFunction<
    Transfer,
    unknown,
    TransferCreateInput,
    unknown
  >;
};

export default function TransferAgreementModal({
  createTransfer
}: Props) {
  const [mounted, setMounted] = useState(false);
  const ref = useCallback((node: HTMLDivElement) => {
    if (node === null) setMounted(false);
    else setMounted(true);
  }, []);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [agreementUrl] = useAtom(agreementUrlAtom);
  const [transferBody] = useAtom(transferBodyAtom);
  const { scriptLoaded } = useScript("https://www.docusign.net/clickapi/sdk/latest/docusign-click.js");

  async function onAgreed() {
    try {
      if (transferBody) {
        await createTransfer(transferBody);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsOpen(false);
      window.location.href = "/transfer/overview";
    }
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
    <IonModal className="TransferAgreementModal" isOpen={isOpen} canDismiss={!isOpen}>
      <div id="clickwrap" className="dialog" ref={ref} />
    </IonModal>
  );
}
