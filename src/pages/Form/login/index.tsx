import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import Roles from "../Roles";
import LoginBox from "./LoginBox";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { InitialLoginFormDataType } from "../../../types/Form/login/types";
import { initialLoginFormData } from "../../../data/pages/Form/login/InitialLoginFormData";
import { StyledUserForm } from "../../../styles/pages/Form/UserForm.styled";
import registerBackgroundImage from "../../../assets/images/loginscreen.svg";
import useAuthentication from "../../../hooks/useAuthentication";
import {useNavigate} from "react-router-dom";
import useGetUserAllType from "../../../hooks/useGetUserAllType";

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>("author");
  const [showUserForm, setShowUserForm] = useState<boolean>(true);


  const { getUser, loading } = useGetUserAllType();
  
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

  const handleRoleChange = (roleName: RoleType) => {
    setSelectedRole(roleName);
  };
  const [loginFormData, setLoginFormData] =
    useState<InitialLoginFormDataType>(initialLoginFormData);
  function updateLoginFields(e: ChangeEvent<HTMLInputElement>) {
    setLoginFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    getUser(loginFormData.email, loginFormData.password, selectedRole);
  };
  return (
    <div
    style={{
      flex: 1,
      // backgroundColor: '#4caf4f',
      // background:"linear-gradient(90deg, rgba(76,175,79,1) 0%, rgba(76,175,79,1) 35%, rgba(128,207,130,1) 100%)",     
      backgroundColor: "#77aa77",
backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23BDC3D0'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230F67FD' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230F67FD' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%230F67FD' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230F67FD' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.31'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E")`,
backgroundAttachment: "fixed",
backgroundSize: "cover"
    }}
  >
    <StyledUserForm onSubmit={signIn} 
    // style={{
    //   backgroundImage: `url(${registerBackgroundImage})`,
    //   backgroundPosition: "bottom left",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "contain",
    // }}
    >
      {showUserForm ? (
        <LoginBox {...loginFormData} updateLoginFields={updateLoginFields} loading={loading} />
      ) : (
        <Roles
          selectedRole={selectedRole}
          handleApproveRole={handleApproveRole}
          handleRoleChange={handleRoleChange}
          isLogin={true}
        />
      )}
    </StyledUserForm>
    </div>
  );
};

export default LoginForm;
