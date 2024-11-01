import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep1Props } from "../../../../types/Form/registration/Author/props";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const AuthorRegisterFormStep1: React.FC<AuthorRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {
  const [disabled, setDisabled] = useState(true);

  function isValidEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    // Regular expression to validate phone number (supports numbers with or without country code)
    const phoneRegex = /^\+?\d{1,3}?\d{9}$/;
    return phoneRegex.test(phone);
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      isValidEmail(email) &&
      isValidPhone(phone)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName, email, phone]);

  // const isValidPhoneNumber = (phoneNumber) => {
  //   console.log("phone", phone)
  //   // console.log("phoneNumber.length", phoneNumber.length)
  //   const minPhoneNumberLength = 14;
  //   const maxPhoneNumberLength = 15;
  //   return (
  //     phoneNumber.length >= minPhoneNumberLength &&
  //     phoneNumber.length <= maxPhoneNumberLength
  //   );
  // };

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
    // <StyledUserFormStep id="authorRegisterStep1">
    <div
      style={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "1rem",
      }}
    >
      <TextField
        id="authorRegisterFirstName"
        name="firstName"
        type="text"
        value={firstName}
        label="Given Name(s)"
        required={true}
        placeholder="Jon"
        onChange={(e) => updateRegisterFields({ firstName: e.target.value })}
        style={{ width: "100%" }}
      />
      <TextField
        id="authorRegisterLastName"
        name="lastName"
        type="text"
        value={lastName}
        label="Family Name"
        required={true}
        placeholder="Doe"
        onChange={(e) => updateRegisterFields({ lastName: e.target.value })}
        style={{ width: "100%" }}
      />
      <TextField
        id="authorRegisterEmail"
        name="email"
        type="email"
        value={email}
        label="Email"
        required={true}
        placeholder="example@gmail.com"
        onChange={(e) => updateRegisterFields({ email: e.target.value })}
        style={{ width: "100%" }}
      />

      <MuiTelInput
        value={phone}
        placeholder="Phone Number"
        required={phone?.length > 0 ? true : false}
        error={phone?.length > 0 && !isValidPhoneNumber(phone)}
        // helperText={(phone?.length > 0 && !isValidPhoneNumber(phone)) ? "Phone is invalid" : ""}
        onChange={(e) => {
          // console.log("e?.length", e?.replace(/\s/g, "").length);
          // if (e?.replace(/\s/g, "").length > 13) {
          //   console.log("e?.length", e?.replace(/\s/g, "").length);
          //   return;
          // }
          updateRegisterFields({ phone: e });
        }}
      />

    </div>
  );
};

export default AuthorRegisterFormStep1;
