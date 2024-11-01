import { RoleType } from "../../data/pages/Form/registration/InitialRegisterFormData";
import {
  InitialRegisterFormDataType,
  RegisterDropdownNamesType,
} from "./registration/types";
import { RoleRadioInputDataType } from "./types";

type HandleApproveRole = () => void;

export type HandleRoleChange = (roleName: RoleType) => void;

export type RolesProps = {
  handleApproveRole: HandleApproveRole;
  handleRoleChange: HandleRoleChange;
  selectedRole: RoleType;
  isLogin: boolean;
};

export interface RoleRadioProps {
  radioData: RoleRadioInputDataType;
  handleRoleChange: HandleRoleChange;
  selectedRole: RoleType;
  isLogin: boolean;
}
export interface ApproveBtnProps {
  handleApproveRole: HandleApproveRole;
}

export interface TextInputWithLabelProps {
  inputType: string;
  inputName: string;
  inputId: string;
  inputValue: string;
  inputLabel: string;
  placeholder: string;
  handleInputChange: (
    fields: Partial<InitialRegisterFormDataType[RoleType]>
  ) => void;
  isRequired: boolean;
}
export interface LoginTextInputWithLabelProps {
  inputType: string;
  inputName: string;
  inputId: string;
  inputValue: string;
  inputLabel: string;
  placeholder: string;
  handleLoginInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
}

export interface DropdownInputWithLabelProps {
  dropdownLabel: string;
  selectedOption: string | number;
  options: string[] | number[];
  dropdownName: RegisterDropdownNamesType;
  handleDropdownChange: (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => void;
}

export interface UserFormButtonProps {
  isLastStep?: boolean;
  buttonText?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  buttonAction?: string;
}
