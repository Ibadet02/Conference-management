import React from "react";
import { TextInputWithLabelProps } from "../../types/Form/props";
import { StyledTextInputWithLabel } from "../../styles/components/Form/TextInputWithLabel.styled";

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  inputName,
  inputType,
  inputId,
  inputLabel,
  inputValue,
  placeholder,
  handleInputChange,
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
        onChange={(e) => handleInputChange({ [inputName]: e.target.value })}
      />
    </StyledTextInputWithLabel>
  );
};

export default TextInputWithLabel;
