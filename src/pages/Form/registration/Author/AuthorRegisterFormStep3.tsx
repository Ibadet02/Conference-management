import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep3Props } from "../../../../types/Form/registration/Author/props";
import TextField from '@mui/material/TextField';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';

const AuthorRegisterFormStep3: React.FC<AuthorRegisterFormStep3Props> = ({
  password,
  confirmPassword,
  updateRegisterFields,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState()

  useEffect(() => {
    console.log("confirmPassword", confirmPassword)
  }, [confirmPassword])

  return (
    <StyledUserFormStep id="authorRegisterStep3" style={{padding: '1rem'}}>

      <TextField
      id="authorRegisterPassword"
      name="password"
      type={showPassword ? "text" : "password"}
      value={password}
      label="Password"
      required={true}
      placeholder="Please enter password"
      onChange={(e) => updateRegisterFields({ "password": e.target.value })}
      style={{width: '100%'}}
      
      />
      {password?.length > 0 && 
      <PasswordStrengthBar password={password} />
    }
      <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          }
          label="Show Password"
        />


<TextField
      id="authorRegisterPassword"
      name="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      value={confirmPassword}
      label="Confirm Password"
      required={true}
      placeholder="Please re-enter password"
      onChange={(e) => updateRegisterFields({ "confirmPassword": e.target.value })}
      style={{width: '100%', marginTop: '20px'}}
      
      />
      
      <FormControlLabel
          control={
            <Checkbox
              checked={showConfirmPassword}
              onChange={() => {
                setShowConfirmPassword((prev) => !prev);
              }}
            />
          }
          label="Show Confirm Password"
        />

    </StyledUserFormStep>
  );
};

export default AuthorRegisterFormStep3;
