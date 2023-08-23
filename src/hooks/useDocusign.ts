import { useMutation } from "react-query";
import useAuth from "hooks/useAuth";

type TransferAgreementInput = {
  amount: number;
  externalAccount: string;
  fromAccount: string;
  memo?: string;
  path?: string;
  transferDate: string;
  type: string;
};

type ViewInput = {
  envelopeId: string;
};

export function useDocusign() {
  const { authApi } = useAuth();

  const { mutateAsync: postTransferAgreement } = useMutation(
    postTransferAgreementMutation
  );
  const { mutateAsync: postView } = useMutation(postViewMutation);

  async function postTransferAgreementMutation(body: TransferAgreementInput) {
    const { data } = await authApi.post("/docusign/transfer-agreement", body);
    return data;
  }

  async function postViewMutation(body: ViewInput) {
    const { data } = await authApi.post("/docusign/views", body);
    return data;
  }

  return {
    postTransferAgreement,
    postView,
  };
}
