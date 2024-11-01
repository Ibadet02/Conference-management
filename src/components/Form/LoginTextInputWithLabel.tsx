import React from "react";
import { LoginTextInputWithLabelProps } from "../../types/Form/props";
import { StyledTextInputWithLabel } from "../../styles/components/Form/TextInputWithLabel.styled";

const LoginTextInputWithLabel: React.FC<LoginTextInputWithLabelProps> = ({
  inputName,
  inputType,
  inputId,
  inputLabel,
  inputValue,
  placeholder,
  handleLoginInputChange,
  isRequired,
}) => {
  return (
    <StyledTextInputWithLabel>
      <label htmlFor={inputId}>{inputLabel}</label>
      <input
        required={isRequired}
        type={inputType}
        name={inputName}
        value={inputValue}
        id={inputId}
        placeholder={placeholder}
        onChange={(e) => handleLoginInputChange(e)}
      />
    </StyledTextInputWithLabel>
  );
};

export default LoginTextInputWithLabel;
