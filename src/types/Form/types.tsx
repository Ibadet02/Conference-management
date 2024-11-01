import { RoleType } from "../../data/pages/Form/registration/InitialRegisterFormData";

export type RoleRadioInputDataType = {
  inputType: string;
  inputName: string;
  inputId: string;
  inputValue: RoleType;
  inputLabel: string;
};

export type RoleRadioInputsDataType = RoleRadioInputDataType[];
