// less code
// better validation
// better errors (set, clear, display)
// have control over inputs
// dont deal with events
// easier inputs

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface formTypes {
  userName: string;
  email: string;
  password: string;
}

function ReactHookForm() {
  const [error, setError] = useState("");
  const { register, watch, handleSubmit } = useForm<formTypes>();
  const { userName = "", email = "", password = "" } = watch();

  const handleValid = (data: formTypes) => {};

  const handleInvalid = (errors: FieldErrors) => {
    const { userName, email, password } = errors;

    if (userName) {
      setError(userName.message);
    } else if (email) {
      setError(email.message);
    } else {
      setError(password.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid, handleInvalid)}>
        <input
          {...register("userName", {
            required: "userName is Required",
            minLength: {
              message: "userName 길이가 5보다 커야합니다.",
              value: 5,
            },
          })}
          type="text"
          placeholder="Username"
        />
        <input
          {...register("email", { required: "email is Required" })}
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password", { required: "password is Required" })}
          type="password"
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      <div>{`${userName}${email}${password}`}</div>
      {error && <span>{error}</span>}
    </>
  );
}

export default ReactHookForm;
