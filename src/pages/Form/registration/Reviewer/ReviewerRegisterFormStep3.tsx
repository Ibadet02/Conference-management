import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep3Props } from "../../../../types/Form/registration/Reviewer/props";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PasswordStrengthBar from 'react-password-strength-bar';


const ReviewerRegisterFormStep3: React.FC<ReviewerRegisterFormStep3Props> = ({
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
    <StyledUserFormStep id="reviewerRegisterStep3" style={{padding: '1rem'}}>

      <TextField
      id="reviewerRegisterPassword"
      name="password"
      type={showPassword ? "text" : "password"}
      value={password}
      label="Password"
      required={true}
      placeholder="Enter password"
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
      placeholder="Re-enter password"
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

export default ReviewerRegisterFormStep3;
