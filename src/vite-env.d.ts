/// <reference types="vite/client" />

interface Window {
  FB: any;
  fbAsyncInit: () => void;
  docuSignClick: {
    Clickwrap: {
      render: (
        config: {
          agreementUrl: string;
          onAgreed: () => void;
        },
        id: string
      ) => void;
    }
  }
}
