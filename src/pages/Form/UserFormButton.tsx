import React from "react";
import { StyledUserFormButton } from "../../styles/components/Form/UserFormButton.styled";
import { UserFormButtonProps } from "../../types/Form/props";

const UserFormButton: React.FC<UserFormButtonProps> = ({
  isLastStep,
  buttonText,
  buttonType,
  buttonAction,
}) => {
  if (buttonAction === "Next") {
    return (
      <StyledUserFormButton type={buttonType}>
        {buttonText}
      </StyledUserFormButton>
    );
  } else if (buttonAction === "Back") {
    return (
      <StyledUserFormButton type={buttonType}>
        {buttonText}
      </StyledUserFormButton>
    );
  } else {
    return (
      <StyledUserFormButton type={buttonType}>
        {buttonText}
      </StyledUserFormButton>
    );
  }
};

export default UserFormButton;
