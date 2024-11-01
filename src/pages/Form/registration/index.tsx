import { FormEvent, useEffect, useState } from "react";
import Roles from "../Roles";
import RegistrationBox from "./RegistrationBox";
import useRegistrationForm from "../../../hooks/useRegistrationForm";
import useRegisterFormData from "../../../hooks/useRegisterFormData";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { auth } from "../../../firebase";
import useCreateUser from "../../../hooks/useCreateUser";
import { StyledUserForm } from "../../../styles/pages/Form/UserForm.styled";
import registerBackgroundImage from "../../../assets/images/registerscreen.png";
import useAuthentication from "../../../hooks/useAuthentication";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>("author");
  const [showUserForm, setShowUserForm] = useState<boolean>(false);

  
const authUser = useAuthentication();
const navigate=useNavigate();

useEffect(() => {
  if(authUser){
    const type=localStorage.getItem("userRole")
    navigate(`/${type}-dashboard`)
  }
}, [authUser])

  const handleApproveRole = () => {
    if (selectedRole) {
      setShowUserForm(true);
    }
  };
  const { registerFormSteps, registerFormStepsData } =
    useRegisterFormData(selectedRole);
  const { next, ...rest } = useRegistrationForm(registerFormSteps);
  const { createUser, loading } = useCreateUser(
    registerFormStepsData[selectedRole],
    selectedRole
  );
  const signUp = (e: FormEvent) => {
    e.preventDefault();
    next();
    if (rest.isLastStep) {
      if(registerFormStepsData[selectedRole]?.password !== registerFormStepsData[selectedRole]?.confirmPassword){
        toast.error("Both passwords do not match");
        return;
      }
      createUser(
        auth,
        registerFormStepsData[selectedRole].email,
        registerFormStepsData[selectedRole].password
      );
    }
  };

  const handleRoleChange = (roleName: RoleType) => {
    setSelectedRole(roleName);
  };
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#77aa77",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23BDC3D0'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230F67FD' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230F67FD' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%230F67FD' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230F67FD' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.31'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover"
      }}
    >
      <StyledUserForm
        onSubmit={signUp}
        // style={{
        //   backgroundImage: `url(${registerBackgroundImage})`,
        //   backgroundPosition: "bottom right",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "contain",
        // }}
      >
        {showUserForm ? (
          <RegistrationBox phone={registerFormStepsData[selectedRole]?.phone} {...rest} loading={loading} />
        ) : (
          <Roles
            selectedRole={selectedRole}
            handleApproveRole={handleApproveRole}
            handleRoleChange={handleRoleChange}
            isLogin={false}
          />
        )}
      </StyledUserForm>
    </div>
  );
};

export default RegisterForm;
