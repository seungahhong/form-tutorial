// less code
// better validation
// better errors (set, clear)
// have control over inputs
// dont deal with events
// easier inputs

import { FieldErrors, useForm } from "react-hook-form";

interface formTypes {
  userName: string;
  email: string;
  password: string;
  errors?: string;
}

function ReactHookForm() {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    resetField,
    formState: { errors: stateErrors },
  } = useForm<formTypes>();
  const { userName = "", email = "", password = "" } = watch();

  const handleValid = (data: formTypes) => {};

  const handleInvalid = (errors: FieldErrors) => {
    const { userName, email, password } = errors;

    resetField("errors");

    if (userName) {
      setError("errors", { message: userName.message });
    } else if (email) {
      setError("errors", { message: email.message });
    } else {
      setError("errors", { message: password.message });
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
      <span>{stateErrors.errors?.message}</span>
    </>
  );
}

export default ReactHookForm;
