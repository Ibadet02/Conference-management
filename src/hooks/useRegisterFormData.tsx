import { useState } from "react";
import {
  RoleType,
  initialRegisterFormData,
} from "../data/pages/Form/registration/InitialRegisterFormData";
import {
  InitialRegisterFormDataType,
  RegisterFormStepsType,
} from "../types/Form/registration/types";
import AdminRegisterForm from "../pages/Form/registration/Admin/AdminRegisterForm";
import ReviewerRegisterFormStep3 from "../pages/Form/registration/Reviewer/ReviewerRegisterFormStep3";
import ReviewerRegisterFormStep2 from "../pages/Form/registration/Reviewer/ReviewerRegisterFormStep2";
import ReviewerRegisterFormStep1 from "../pages/Form/registration/Reviewer/ReviewerRegisterFormStep1";
import AuthorRegisterFormStep3 from "../pages/Form/registration/Author/AuthorRegisterFormStep3";
import AuthorRegisterFormStep2 from "../pages/Form/registration/Author/AuthorRegisterFormStep2";
import AuthorRegisterFormStep1 from "../pages/Form/registration/Author/AuthorRegisterFormStep1";
const useRegisterFormData = (selectedRole: RoleType) => {
  const [registerFormStepsData, setRegisterFormStepsData] =
    useState<InitialRegisterFormDataType>(initialRegisterFormData);
  // console.log(registerFormStepsData)
  function updateRegisterFields(
    fields: Partial<InitialRegisterFormDataType[RoleType]>
  ) {
    setRegisterFormStepsData((prev) => {
      return {
        ...prev,
        [selectedRole]: { ...prev[selectedRole], ...fields },
      };
    });
  }

  const registerFormSteps: RegisterFormStepsType = {
    author: [
      <AuthorRegisterFormStep1
        {...registerFormStepsData.author}
        updateRegisterFields={updateRegisterFields}
      />,
      <AuthorRegisterFormStep2
        {...registerFormStepsData.author}
        updateRegisterFields={updateRegisterFields}
        selectedRole={selectedRole}
      />,
      <AuthorRegisterFormStep3
        {...registerFormStepsData.author}
        updateRegisterFields={updateRegisterFields}
      />,
    ],
    reviewer: [
      <ReviewerRegisterFormStep1
        {...registerFormStepsData.reviewer}
        updateRegisterFields={updateRegisterFields}
      />,
      <ReviewerRegisterFormStep2
        {...registerFormStepsData.reviewer}
        updateRegisterFields={updateRegisterFields}
      />,
      <ReviewerRegisterFormStep3
        {...registerFormStepsData.reviewer}
        updateRegisterFields={updateRegisterFields}
      />,
    ],
    admin: [
      <AdminRegisterForm
        {...registerFormStepsData.admin}
        updateRegisterFields={updateRegisterFields}
      />,
    ],
  };
  return {
    registerFormStepsData,
    registerFormSteps: registerFormSteps[selectedRole],
  };
};

export default useRegisterFormData;
