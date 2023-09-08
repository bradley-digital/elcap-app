// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import MoneyMovement from "components/MoneyMovement/MoneyMovement";

export default function MoneyMovementOverview() {
  return (
    <PageTemplate title="Overview" menuId="money-movement">
      <MoneyMovement />
    </PageTemplate>
  );
}
