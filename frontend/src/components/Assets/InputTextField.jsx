const InputTextField = ({
  inputId,
  inputType,
  inputValue,
  inputOnchange,
  inputCustomClasses,
  inputAutoComplete,
}) => {
  return (
    <>
      <input
        id={inputId}
        name={inputId}
        type={inputType}
        placeholder={`Enter your ${inputId}...`}
        autoComplete={inputAutoComplete}
        value={inputValue}
        onChange={inputOnchange}
        className={`bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px] ${inputCustomClasses} font-rmlk-secondary`}
      />
    </>
  );
};

export default InputTextField;
