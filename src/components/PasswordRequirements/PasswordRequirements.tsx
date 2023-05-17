export default function PasswordRequirements() {
  return (
    <>
      <p>Your password must:</p>
      <ul>
        <li>Contain 8-36 characters</li>
        <li>Contain a number</li>
        <li>Contain a special character (!@#$%^&*)</li>
      </ul>
    </>
  );
}
