import { StyledRoles } from "../../styles/pages/Form/Roles.styled";
import { RolesProps } from "../../types/Form/props";
import RoleRadio from "./RoleRadio";
import { roleRadioInputsData } from "../../data/pages/Form/RoleRadioInputsData";
import ApproveBtn from "./ApproveBtn";
import { useNavigate } from "react-router-dom";

const Roles: React.FC<RolesProps> = ({
  handleApproveRole,
  handleRoleChange,
  selectedRole,
  isLogin,
}) => {

  const navigate = useNavigate();

  return (
    <StyledRoles id="roles" role="radiogroup">
      <div className="radio-group" role="radiogroup">
        {roleRadioInputsData.map((radio) => {
          if (radio.inputValue === "admin" && !isLogin) return null;
          return (
            <RoleRadio
              key={radio.inputId}
              radioData={radio}
              handleRoleChange={handleRoleChange}
              selectedRole={selectedRole}
              isLogin={isLogin}
            />
          );
        })}
      </div>
      <ApproveBtn handleApproveRole={handleApproveRole} />

      
      <div
          style={{
            padding: "20px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            color: "#2e2e2e",
            paddingBottom: '0px'
          }}
        >
          <div>Already have an account?</div>
          <div onClick={() => {
            navigate('/signin')
          }} style={{ fontWeight: "bold", color: "#0f67fd", cursor: 'pointer' }}>Sign In</div>
        </div>

    </StyledRoles>
  );
};

export default Roles;
