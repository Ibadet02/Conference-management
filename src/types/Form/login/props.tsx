import { ChangeEvent } from "react";
import { InitialLoginFormDataType } from "./types";
export type LoginBoxProps = InitialLoginFormDataType & {
  updateLoginFields: (e: ChangeEvent<HTMLInputElement>) => void;
};
