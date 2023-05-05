import InputFieldContainer from "./InputFieldContainer";

const TextareaField = ({
  label = "",
  defaultInputValue = null,
  isRequired = false,
  type = "text",
  name = "",
  accept = null,
  inputRef = null,
  error = "",
  placeholder = "",
  handleOnChange = null,
  handleOnBlur = null,
  disabled = false,
  rows = 5,
}) => {
  return (
    <InputFieldContainer label={label} isRequired={isRequired} error={error}>
      <textarea
        className="form-control"
        type={type}
        accept={accept}
        rows={rows}
        ref={
          isRequired
            ? inputRef({
                required: {
                  value: true,
                  message: `${label} is required`,
                },
              })
            : inputRef
        }
        disabled={disabled}
        defaultValue={defaultInputValue}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </InputFieldContainer>
  );
};

export default TextareaField;
