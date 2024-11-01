import { ReactElement } from "react";
export type StringDropdownInputType = { options: string[]; selectedOption: string }
export type NumberDropdownInputType = { options: number[]; selectedOption: number }
export type MutualInitialRegisterFormDataType = {
  firstName: string;
  lastName: string;
  affiliation: StringDropdownInputType;
  email: string;
  phone: string;
  academicInterest: StringDropdownInputType;
};

export type InitialRegisterFormDataType = {
  author: MutualInitialRegisterFormDataType & {
    program: StringDropdownInputType;
    supervisor: StringDropdownInputType;
    password: string;
    confirmPassword: string
  };
  reviewer: MutualInitialRegisterFormDataType & {
    reviewCapacity: NumberDropdownInputType;
    password: string;
    confirmPassword: string
  };
  admin: {
    email: string;
    password: string;
  };
};

export type AuthorRegisterType = {
  firstName: string;
  lastName: string;
  affiliation: StringDropdownInputType;
  email: string;
  phone: string;
  academicInterest: StringDropdownInputType;
  program: StringDropdownInputType;
  supervisor: StringDropdownInputType;
  password: string;
};
export type ReviewerRegisterType = {
  firstName: string;
  lastName: string;
  affiliation: StringDropdownInputType;
  email: string;
  phone: string;
  academicInterest: StringDropdownInputType;
  reviewCapacity: NumberDropdownInputType;
  password: string;
};
export type AdminType = {
  email: string;
  password: string;
};

export interface RegisterFormStepsType {
  author: ReactElement[];
  reviewer: ReactElement[];
  admin: ReactElement[];
}

export type RegisterDropdownNamesType = "affiliation" | "academicInterest" | "program" | "supervisor" | "reviewCapacity"