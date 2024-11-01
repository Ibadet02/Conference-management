import { NumberDropdownInputType, StringDropdownInputType } from "../types";

type ReviewerRegisterFormStep1Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
export type ReviewerRegisterFormStep1Props = ReviewerRegisterFormStep1Data & {
  updateRegisterFields: (
    fields: Partial<ReviewerRegisterFormStep1Data>
  ) => void;
};

type ReviewerRegisterFormStep2Data = {
  affiliation: StringDropdownInputType;
  academicInterest: StringDropdownInputType;
  reviewCapacity: NumberDropdownInputType;
};
export type ReviewerRegisterFormStep2Props = ReviewerRegisterFormStep2Data & {
  updateRegisterFields: (
    fields: Partial<ReviewerRegisterFormStep2Data>
  ) => void;
};

type ReviewerRegisterFormStep3Data = {
  password: string;
  confirmPassword: string;
};
export type ReviewerRegisterFormStep3Props = ReviewerRegisterFormStep3Data & {
  updateRegisterFields: (
    fields: Partial<ReviewerRegisterFormStep3Data>
  ) => void;
};
