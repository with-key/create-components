import React, { HTMLAttributes, useState } from "react";

type PropsFormInput = {
  format?: "iino" | "normal" | "price";
  defaultValue: string;
  inputMode: HTMLAttributes<HTMLInputElement>["inputMode"];
};

const FormInput = ({
  format = "normal",
  defaultValue,
  inputMode,
}: PropsFormInput) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeIinoHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;

    if (format === "iino") {
      const iinoLogic = /^[0-9\s+-]*$/g;
      if (value.length >= 15) {
        return;
      }

      if (iinoLogic.test(value)) {
        return setState(
          value.replace(/-/g, "").replace(/(\d{6})(\d{7})/g, "$1-$2")
        );
      } else {
        return;
      }
    } else if (format === "price") {
      const proiceLogic = /^[0-9\s+,+]*$/g;
      if (proiceLogic.test(value)) {
        return setState(Number(value.replaceAll(",", "")).toLocaleString("en"));
      } else {
        return;
      }
    } else {
      setState(value);
    }
  };

  return (
    <input
      type="test"
      inputMode={inputMode}
      value={value}
      onChange={(event) => onChangeIinoHandler(event, setValue)}
    />
  );
};

export default FormInput;
