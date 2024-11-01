import { StringDropdownInputType } from "../types";

export type AuthorUserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  affiliation: StringDropdownInputType;
  academicInterest: StringDropdownInputType;
  program: StringDropdownInputType;
  supervisor: StringDropdownInputType;
  password: string;
};
