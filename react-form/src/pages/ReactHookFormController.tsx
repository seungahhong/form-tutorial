import React from "react";
import Select from "react-select";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import Input from "@material-ui/core/Input";

interface formTypes {
  name: string;
  select: object;
}

const ReactHookFormController = () => {
  const { control, handleSubmit, watch } = useForm<formTypes>({
    defaultValues: {
      name: "",
      select: {},
    },
  });
  const { name = "", select } = watch();

  const handleValid = (data: formTypes) => console.log(data);

  const handleInvalid = (errors: FieldErrors) => console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(handleValid, handleInvalid)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "name is Required",
            minLength: {
              message: "name 길이가 5보다 커야합니다.",
              value: 5,
            },
          }}
          render={({ field }) => {
            console.log(field);
            return <Input {...field} />;
          }}
        />
        <Controller
          name="select"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
          )}
        />
        <input type="submit" />
      </form>
      <div>{`${name}`}</div>
    </>
  );
};

export default ReactHookFormController;
