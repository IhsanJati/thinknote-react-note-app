import { useState, type ChangeEvent } from "react";

const useInput = (defaultValue: string = "") => {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, handleValueChange];
};

export default useInput;
