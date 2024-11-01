import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AdminRegisterFormProps } from "../../../../types/Form/registration/Admin/props";

const AdminRegisterForm: React.FC<AdminRegisterFormProps> = ({
  email,
  password,
  confirmPassword,
  updateRegisterFields,
}) => {


  return (
    <StyledUserFormStep id="adminRegister">
      <TextInputWithLabel
        inputId="authorRegisterEmail"
        inputName="email"
        inputType="email"
        inputValue={email}
        inputLabel="Email"
        isRequired={true}
        placeholder="example@gmail.com"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="authorRegisterPassword"
        inputName="password"
        inputType="password"
        inputValue={password}
        inputLabel="Password"
        isRequired={true}
        placeholder="jFuk&En2w9e@jre$18G"
        handleInputChange={updateRegisterFields}
      />
      
      <TextInputWithLabel
        inputId="authorRegisterPassword"
        inputName="confirmPassword"
        inputType="confirmPassword"
        inputValue={confirmPassword}
        inputLabel="Confirm Password"
        isRequired={true}
        placeholder="jFuk&En2w9e@jre$18G"
        handleInputChange={updateRegisterFields}
      />
    </StyledUserFormStep>
  );
};

export default AdminRegisterForm;
