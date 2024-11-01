import DropdownInputWithLabel from "../../../../components/Form/DropdownInputWithLabel";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep2Props } from "../../../../types/Form/registration/Reviewer/props";
import {
  InitialRegisterFormDataType,
  NumberDropdownInputType,
  RegisterDropdownNamesType,
  StringDropdownInputType,
} from "../../../../types/Form/registration/types";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";

const ReviewerRegisterFormStep2: React.FC<ReviewerRegisterFormStep2Props> = ({
  affiliation,
  academicInterest,
  reviewCapacity,
  updateRegisterFields,
}) => {

  
  const [showAcademicInterestTextField, setShowAcademicInterestTextField] = useState(false);

  useEffect(() => {
    if(affiliation.selectedOption && !academicInterest.options?.some((e) => e === affiliation.selectedOption)){
      setShowAcademicInterestTextField(true)
    }
  }, [])


  const handleDropdownChange = (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => {
    const updatedField = {
      ...(initialRegisterFormData.reviewer[
        fieldName as keyof InitialRegisterFormDataType["reviewer"]
      ] as StringDropdownInputType | NumberDropdownInputType),
      selectedOption: selectedValue,
    };
    updateRegisterFields({
      [fieldName]: updatedField,
    });
  };

  return (
    <StyledUserFormStep
      id="reviewerRegisterStep2"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "1rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Affiliation</InputLabel>
          <Select
            value={affiliation.selectedOption}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Affiliation"
            name="affiliation"
            onChange={(e) =>
              handleDropdownChange("affiliation", e.target.value)
            }
          >
            {affiliation.options?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Academic Interest</InputLabel>
        <Select
          value={showAcademicInterestTextField ? "Other" : academicInterest.selectedOption}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Academic Interest"
          name="academicInterest"
          onChange={(e) => {
            if(e.target.value === "Other"){
              setShowAcademicInterestTextField(true);
              handleDropdownChange("academicInterest", "")
            } else {
              setShowAcademicInterestTextField(false);
              handleDropdownChange("academicInterest", e.target.value)
            }
            }
            }
        >
          {academicInterest.options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>

        
{showAcademicInterestTextField && (
      <TextField
        value={academicInterest.selectedOption}
        id="demo-simple-text-affiliation"
        label="Enter Academic Interest"
        name="academicInterest"
        style={{marginTop: '10px'}}
        onChange={(e) => handleDropdownChange("academicInterest", e.target.value)}
      />
    )}
      </FormControl>
    </Box>

      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Review Capacity</InputLabel>
          <Select
            value={reviewCapacity.selectedOption}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Review Capacity"
            name="reviewCapacity"
            onChange={(e) =>
              handleDropdownChange("reviewCapacity", e.target.value)
            }
          >
            {reviewCapacity.options?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep2;
