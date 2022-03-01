// less code
// better validation
// better errors (set, clear)
// have control easier inputs event
// dont deal with events
// easier inputs

import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface formTypes {
  userName: string;
  email: string;
  password: string;
  errors?: string;
}

function ReactHookFormRegister() {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors: stateErrors },
  } = useForm<formTypes>({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      errors: "",
    },
  });
  const { userName = "", email = "", password = "" } = watch();

  const handleValid = (data: formTypes) => {
    reset();
  };

  const handleInvalid = (errors: FieldErrors) => {
    const { userName, email, password } = errors;

    clearErrors("errors");

    if (userName) {
      setError("errors", { message: userName.message });
    } else if (email) {
      setError("errors", { message: email.message });
    } else {
      setError("errors", { message: password.message });
    }
  };

  useEffect(() => {
    const { userName, email, password } = stateErrors;

    clearErrors("errors");

    if (userName) {
      setError("errors", { message: userName.message });
    } else if (email) {
      setError("errors", { message: email.message });
    } else {
      setError("errors", { message: password?.message });
    }
  }, [stateErrors.email, stateErrors.password, stateErrors.userName]);

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
          placeholder="이름을 입력하세요."
        />
        <input
          {...register("email", { required: "email is Required" })}
          type="email"
          placeholder="이메일을 입력하세요."
        />
        <input
          {...register("password", { required: "password is Required" })}
          type="password"
          placeholder="패스워드를 입력하세요."
        />
        <input type="submit" />
      </form>
      <div>{`${userName}${email}${password}`}</div>
      <span>{stateErrors.errors?.message}</span>
    </>
  );
}

export default ReactHookFormRegister;
