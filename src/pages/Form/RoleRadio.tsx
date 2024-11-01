import React from "react";
import { RoleRadioProps } from "../../types/Form/props";
import { StyledRoleRadio } from "../../styles/pages/Form/RoleRadio.styled";

const RoleRadio: React.FC<RoleRadioProps> = ({
  radioData,
  handleRoleChange,
  selectedRole,
  isLogin,
}) => {
  const { inputType, inputName, inputId, inputValue, inputLabel } = radioData;
  const attributeEnding: string = isLogin ? "Login" : "Register";
  return (
    <StyledRoleRadio>
      <input
        type={inputType}
        name={`${inputName}${attributeEnding}`}
        id={`${inputId}${attributeEnding}`}
        value={inputValue}
        checked={selectedRole === inputValue}
        onChange={() => handleRoleChange(inputValue)}
      />
      <label htmlFor={`${inputId}${attributeEnding}`}>{inputLabel}</label>
    </StyledRoleRadio>
  );
};

export default RoleRadio;
