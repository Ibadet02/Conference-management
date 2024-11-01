import { ReactElement } from "react";

export type RegistrationBoxProps = {
  currentStepIndex: number;
  step: ReactElement;
  steps: ReactElement[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  back: () => void;
  phone: string
};
