import "./DepositInstructions.scss";

const texts = [
  { label: "ABA/Routing", value: "121143260" },
  { label: "Bank Name", value: "Bridge Bank, a Division of Western Alliance" },
  { label: "Bank Address", value: "55 Almaden Blvd, San Jose, CA 95113" },
  { label: "Account Name", value: "El Capitan Advisors, Inc" },
  {
    label: "Account Address",
    value: "1900 State Street, Suite J, Santa Barbara, CA 93101",
  },
  { label: "Account Number", value: "8707670828" },
  {
    label: "Reference",
    value: "(Account number auto-fills after selected from dropdown)",
  },
];

export default function DepositInstructions() {
  return (
    <div className="DepositInstructions">
      <h1 className="DepositInstructions__title">Deposit Instructions</h1>

      <h4 className="DepositInstructions__selectTitle">Select Account</h4>
      <div className="DepositInstructions__select">
        <span>Account</span>
      </div>
      <div className="DepositInstructions__selectOption DepositInstructions__firstOption">
        <span>El Capitan Advisor for Money Market Fund 8: $384,393.00</span>
      </div>
      <div className="DepositInstructions__selectOption">
        <span>
          El Capitan Advisors Inc FBO Planet 13 Holdings: $11,825,195.01
        </span>
      </div>
      <div className="DepositInstructions__selectOption">
        <span>El Capitan Advisor for Money Market 26: $0.00</span>
      </div>

      <div className="DepositInstructions__textsContainer">
        {texts.map((text, index) => (
          <div className="DepositInstructions__text" key={index}>
            <p>
              <span>{text.label}:</span>
              {text.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
