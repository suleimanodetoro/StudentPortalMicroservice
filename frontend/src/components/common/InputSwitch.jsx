import { useState } from "react";
import Switch from "react-switch";
import InputFieldContainer from "./InputFieldContainer";

const InputSwitch = ({
  inputRef = null,
  name = "",
  label = "",
  error = "",
}) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <InputFieldContainer label={label} error={error}>
      <Switch
        onChange={handleChange}
        checked={checked}
        className="react-switch bg-primary"
      />
      {checked ? (
        <input type="hidden" ref={inputRef} name={name} defaultValue={true} />
      ) : (
        <input type="hidden" ref={inputRef} name={name} defaultValue={false} />
      )}
    </InputFieldContainer>
  );
};
export default InputSwitch;
