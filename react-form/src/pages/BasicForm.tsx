import { useRef, useState } from "react";

function BasicForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // userName 체크
    if (!userName || userName.length < 5) {
      if (!userName) {
        setError("userName is Required");
      } else {
        setError("userName 길이가 5보다 커야합니다.");
      }

      userNameRef.current?.focus();
    } else if (!email) {
      setError("email is Required");
      emailRef.current?.focus();
    } else if (!password) {
      setError("password is Required");
      passwordRef.current?.focus();
    }
  };

  const handleUsernameChange = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;

    setUserName(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={userName}
          onChange={handleUsernameChange}
          type="text"
          placeholder="Username"
          ref={userNameRef}
        />
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          ref={emailRef}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          ref={passwordRef}
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      <div>{`${userName}${email}${password}`}</div>
      {error && <span>{error}</span>}
    </>
  );
}

export default BasicForm;
