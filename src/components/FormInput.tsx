import React, { useState } from "react";

const FormInput = () => {
  const [value, setValue] = useState("");

  /**
   *
   * @param event
   * @param setState
   * @returns '-'을 포함한 주민등록번호
   */
  const onChangeIinoHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (event.target.value.length === 15) {
      return;
    }

    if (event.target.value.length >= 6) {
      const front = event.target.value.slice(0, 6);
      const back = event.target.value.slice(7);

      return setState(front + "-" + back);
    }

    setState(event.target.value);
  };

  /**
   *
   * @param event
   * @param setState
   * @returns ','를 포함한 숫자
   */
  const onChangeCommaHadler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;
    const logic = /(^[0-9]*$)|([,])/;
    if (logic.test(value)) {
      return setState(Number(value.replaceAll(",", "")).toLocaleString("en"));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChangeCommaHadler(event, setValue)}
      />
    </div>
  );
};

export default FormInput;
