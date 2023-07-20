import { useState } from "react";


export default function useTransferExternal() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [storedReceivingAccount, setStoredReceivingAccount] = useState("");
    const [storedUseIntermediary, setStoredUseIntermediary] = useState(false);

    const transferTypeOptions = [
        {
          value: "WIRE",
          label: "Wire",
        },
        {
          value: "ACH",
          label: "ACH",
        },
      ];

    return{
        isSubmitting,
        setIsSubmitting,
        storedReceivingAccount,
        setStoredReceivingAccount,
        storedUseIntermediary,
        setStoredUseIntermediary,
        transferTypeOptions
    }
}