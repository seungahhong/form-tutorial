import { useRef, useState } from "react";

interface hookOptions {
  required?: string;
  minLength?: {
    message: string;
    value: number;
  };
}

interface validateOptions {
  focus: boolean;
}

const useHookFormRegister = (options: hookOptions) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const getValid = ({ focus }: validateOptions) => {
    const { required, minLength } = options;
    if (focus) {
      ref.current?.focus();
    }

    if (!value && required) {
      return required;
    }

    if (!value && minLength && value.length < minLength.value) {
      return minLength.message;
    }

    return "";
  };

  return [value, setValue, ref, getValid] as const;
};

function BasicForm() {
  const [error, setError] = useState("");
  const [userName, setUserName, userNameRef, userNameGetValid] =
    useHookFormRegister({
      required: "userName is Required",
      minLength: {
        message: "userName 길이가 5보다 커야합니다.",
        value: 5,
      },
    });
  const [email, setEmail, emailRef, emailGetValid] = useHookFormRegister({
    required: "email is Required",
  });
  const [password, setPassword, passwordRef, passwordGetValid] =
    useHookFormRegister({ required: "password is Required" });

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errorMessage = "";
    if ((errorMessage = userNameGetValid({ focus: true })) !== "") {
      setError(errorMessage);
    } else if ((errorMessage = emailGetValid({ focus: true })) !== "") {
      setError(errorMessage);
    } else if ((errorMessage = passwordGetValid({ focus: true })) !== "") {
      setError(errorMessage);
    } else {
      // 성공
      setUserName("");
      setEmail("");
      setPassword("");
      setError("");
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let errorMessage = "";
    if ((errorMessage = userNameGetValid({ focus: false })) !== "") {
      setError(errorMessage);
    } else if ((errorMessage = emailGetValid({ focus: false })) !== "") {
      setError(errorMessage);
    } else if ((errorMessage = passwordGetValid({ focus: false })) !== "") {
      setError(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={userName}
          onChange={handleUsernameChange}
          onBlur={handleBlur}
          type="text"
          placeholder="이름을 입력하세요."
          ref={userNameRef}
        />
        <input
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          type="email"
          ref={emailRef}
          placeholder="이메일을 입력하세요."
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          onBlur={handleBlur}
          type="password"
          ref={passwordRef}
          placeholder="패스워드를 입력하세요."
        />
        <input type="submit" />
      </form>
      <div>{`${userName}${email}${password}`}</div>
      {error && <span>{error}</span>}
    </>
  );
}

export default BasicForm;
