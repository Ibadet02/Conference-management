import { RoleType } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import { StringDropdownInputType } from "../types";

export type AuthorRegisterFormStep1Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
export type AuthorRegisterFormStep1Props = AuthorRegisterFormStep1Data & {
  updateRegisterFields: (fields: Partial<AuthorRegisterFormStep1Data>) => void;
};

export type AuthorRegisterFormStep2Data = {
  affiliation: StringDropdownInputType;
  academicInterest: StringDropdownInputType;
  program: StringDropdownInputType;
  supervisor: StringDropdownInputType;
};
export type AuthorRegisterFormStep2Props = AuthorRegisterFormStep2Data & {
  updateRegisterFields: (fields: Partial<AuthorRegisterFormStep2Data>) => void;
  selectedRole: RoleType
};

export type AuthorRegisterFormStep3Data = {
  password: string;
  confirmPassword: string;
};
export type AuthorRegisterFormStep3Props = AuthorRegisterFormStep3Data & {
  updateRegisterFields: (fields: Partial<AuthorRegisterFormStep3Data>) => void;
};
