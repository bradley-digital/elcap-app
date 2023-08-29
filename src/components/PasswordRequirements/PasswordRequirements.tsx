export default function PasswordRequirements() {
  return (
    <>
      <p>Your password must contain:</p>
      <ul>
        <li>8-36 characters</li>
        <li>At least one number</li>
        <li>At least one special character (!@#$%^&*)</li>
      </ul>
    </>
  );
}
