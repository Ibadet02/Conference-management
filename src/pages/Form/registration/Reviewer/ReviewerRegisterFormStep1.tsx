import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep1Props } from "../../../../types/Form/registration/Reviewer/props";
import TextField from '@mui/material/TextField';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const ReviewerRegisterFormStep1: React.FC<ReviewerRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {


  const isValidPhoneNumber = (phoneNumber) => {
    // Remove spaces from the phone number
    const sanitizedPhoneNumber = phoneNumber.replace(/\s+/g, '');
    const phoneNumberObj = parsePhoneNumberFromString(sanitizedPhoneNumber);
    
    // Check if the phone number is valid
    if (phoneNumberObj) {
      return phoneNumberObj.isValid();
    }
    
    return false;
  };


  return (
    <StyledUserFormStep id="reviewerRegisterStep1" style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', padding: '1rem'}}>
      <TextField 
        id="reviewerRegisterFirstName"
              name="firstName"
              type="text"
              value={firstName}
              label="First Name"
              required={true}
              placeholder="Jon"
        onChange={(e) => updateRegisterFields({ firstName: e.target.value })}
        style={{width: '100%'}}
        />

<TextField 
        id="reviewerRegisterLastName"
        name="lastName"
        type="text"
        value={lastName}
        label="Last Name"
        required={true}
        placeholder="Doe"
        onChange={(e) => updateRegisterFields({ lastName: e.target.value })}
        style={{width: '100%'}}
        />

<TextField 
        id="reviewerRegisterEmail"
        name="email"
        type="email"
        value={email}
        label="Email"
        required={true}
        placeholder="example@gmail.com"
        onChange={(e) => updateRegisterFields({ email: e.target.value })}
        style={{width: '100%'}}
        />

{/* <TextField 
        id="reviewerRegisterPhone"
        name="phone"
        type="phone"
        value={phone}
        label="Phone"
        required={true}
        placeholder="+123456789"
        onChange={(e) => updateRegisterFields({ phone: e.target.value })}
        style={{width: '100%'}}
        /> */}

        
{/* <MuiTelInput value={phone} 
placeholder="Phone Number"
  // label="Phone Number"
  maxLength={11}
  required
onChange={(e) => {
        updateRegisterFields({ phone: e })
        }} /> */}


<MuiTelInput
        value={phone}
        placeholder="Phone Number"
        required={phone?.length > 0 ? true : false}
        error={phone?.length > 0 && !isValidPhoneNumber(phone)}
        onChange={(e) => {
          updateRegisterFields({ phone: e });
        }}
      />

    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep1;