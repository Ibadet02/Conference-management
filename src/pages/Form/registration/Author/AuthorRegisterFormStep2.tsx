import React, { useEffect, useState } from "react";
import { AuthorRegisterFormStep2Props } from "../../../../types/Form/registration/Author/props";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import {
  InitialRegisterFormDataType,
  RegisterDropdownNamesType,
  StringDropdownInputType,
} from "../../../../types/Form/registration/types";
import DropdownInputWithLabel from "../../../../components/Form/DropdownInputWithLabel";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";

import Tooltip from "@mui/material/Tooltip";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<FilmOptionType>();

const AuthorRegisterFormStep2: React.FC<AuthorRegisterFormStep2Props> = ({
  affiliation,
  academicInterest,
  program,
  supervisor,
  updateRegisterFields,
}) => {
  const [reviewers, setReviewers] = useState([]);

  
  const [value, setValue] = React.useState<FilmOptionType | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reviewerUsers"),
      (snapshot) => {
        const projectsDataWithIds: ProjectDataTypeWithIds[] = [];
        snapshot.forEach((doc) => {
          const project: ProjectDataType = doc.data() as ProjectDataType;
          projectsDataWithIds.push({title:`${project?.firstName} ${project?.lastName}`});
        });
        // console.log("Reviewers", projectsDataWithIds)
        setReviewers(projectsDataWithIds);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const [showAcademicInterestTextField, setShowAcademicInterestTextField] =
    useState(false);

  useEffect(() => {
    if (
      affiliation.selectedOption &&
      !academicInterest.options?.some((e) => e === affiliation.selectedOption)
    ) {
      setShowAcademicInterestTextField(true);
    }
  }, []);

  useEffect(() => {
    if(value?.title){
      handleDropdownChange("supervisor", value?.title)
    }
  }, [value])

  useEffect(() => {
    if(supervisor?.selectedOption){
      setValue({title: supervisor?.selectedOption})
    }
    // console.log("program?.supervisor", supervisor?.selectedOption)
  }, [])
  

  const handleDropdownChange = (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => {
    const updatedField = {
      ...(initialRegisterFormData.author[
        fieldName as keyof InitialRegisterFormDataType["author"]
      ] as StringDropdownInputType),
      selectedOption: selectedValue,
    };
    updateRegisterFields({
      [fieldName]: updatedField,
    });
  };
  return (
    <StyledUserFormStep
      id="authorRegisterStep2"
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
            required
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
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Academic Interest
          </InputLabel>
          <Select
            value={
              showAcademicInterestTextField
                ? "Other"
                : academicInterest.selectedOption
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Academic Interest"
            name="academicInterest"
            onChange={(e) => {
              if (e.target.value === "Other") {
                setShowAcademicInterestTextField(true);
                handleDropdownChange("academicInterest", "");
              } else {
                setShowAcademicInterestTextField(false);
                handleDropdownChange("academicInterest", e.target.value);
              }
            }}
          >
            {academicInterest.options?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>

          {showAcademicInterestTextField && (
            <TextField
              value={academicInterest.selectedOption}
              id="demo-simple-text-affiliation"
              label="Enter Academic Interest"
              name="academicInterest"
              style={{ marginTop: "10px" }}
              onChange={(e) =>
                handleDropdownChange("academicInterest", e.target.value)
              }
            />
          )}
        </FormControl>
      </Box>

      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            value={program.selectedOption}
            labelId="demo-simple-select-label"
            id="demo-simple-select-program"
            label="Program"
            name="program"
            onChange={(e) => handleDropdownChange("program", e.target.value)}
          >
            {program.options?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <Tooltip
            placement="top"
            title="Please enter supervisor name correctly"
          >
            {/* <Autocomplete
              freeSolo
              onChange={(event, newValue) => {
                handleDropdownChange("supervisor", newValue);
              }}
              id="free-solo-2-demo"
              name="supervisor"
              disableClearable
              options={reviewers.map(
                (option) => `${option?.firstName} ${option?.lastName}`
              )}
              renderInput={(params) => (
                <TextField
                  onChange={(event) => {
                    handleDropdownChange("supervisor", event.target.value);
                  }}
                  {...params}
                  label="Supervisor (i)"
                />
              )}
            /> */}

<Autocomplete
      style={{width: '100%'}}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={reviewers}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Supervisor (i)" />
      )}
    />
          </Tooltip>
        </FormControl>
      </Box>

        {/* {
          supervisor?.selectedOption &&
          <div style={{padding: '10px', mmarginTop: '10px', background: '#fff', color: '#2e2e2e', borderRadius: '5px', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)'}}>
{supervisor?.selectedOption}
          </div>
        } */}

    </StyledUserFormStep>
  );
};


interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}


export default AuthorRegisterFormStep2;
