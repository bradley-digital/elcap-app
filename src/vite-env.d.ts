/// <reference types="vite/client" />

interface Window {
  FB: any;
  fbAsyncInit: () => void;
  docuSignClick: {
    Clickwrap: {
      render: (
        agreementUrl: string,
        onAgreed: () => void,
        id: string
      ) => void;
    }
  }
}
