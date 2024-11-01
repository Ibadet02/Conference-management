// export default PaperSubmissionInputs;
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { PaperSubmissionDataType } from "../../../../types/dashboard/Author/types";
import { initialPaperSubmissionData } from "../../../../data/pages/dashboard/Author/InitialPaperSubmissionData";
import { PaperSubmissionInputsProps } from "../../../../types/dashboard/Author/props";
import usePaperSubmission from "../../../../hooks/usePaperSubmission";
import useGetUsers from "../../../../hooks/useGetUsers";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AttributionIcon from "@mui/icons-material/Attribution";
import Button from "@mui/material/Button";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import usePaperUpdate from "../../../../hooks/usePaperUpdate";
import useAuthentication from "../../../../hooks/useAuthentication";
import usePaperAbstractApproval from "../../../../hooks/usePaperAbstractApproval";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { MuiFileInput } from "mui-file-input";
import classes from "./EditPaper.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faImage,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import useUserData from "../../../../hooks/useUserData";
import usePaperImprove from "../../../../hooks/usePaperImprove";

const filter = createFilterOptions<FilmOptionType>();

const EditPaperSubmissionInputs: React.FC<PaperSubmissionInputsProps> = ({
  projectId,
  matchedItem,
  projectData,
}) => {
  const userDataElements = useUserData();

  const [isDragOver, setIsDragOver] = useState(false);
  const imageRef = useRef();

  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormLoading(false);
    }, 1500);

    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // FOCUS ON CLICK
  function focusImage() {
    imageRef.current.click();
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
    e.currentTarget.classList.add("dragOver");
  }
  function handleDragLeave() {
    setIsDragOver(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("dragOver");

    const { name, files } = e.dataTransfer;

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPaperSubmissionData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      console.error("Please select a PDF file.");
      // You might want to set an error state or display a message to the user here
    }
  }

  const collectionName = "authorUsers";
  const { users, loading } = useGetUsers(collectionName);

  const authUser = useAuthentication();
  // console.log("matchedItem", matchedItem)

  const [paperSubmissionData, setPaperSubmissionData] = useState({
    abstract: matchedItem?.abstract ? matchedItem?.abstract : "",
    file: matchedItem?.fileId ? matchedItem?.fileId : null,
    authors: matchedItem?.authors ? matchedItem?.authors : [],
    correspondingAuthor: matchedItem?.correspondingAuthor
      ? matchedItem?.correspondingAuthor
      : authUser?.uid,
    abstractApproved: matchedItem?.abstractApproved
      ? matchedItem?.abstractApproved
      : false,
    academicInterest: matchedItem?.academicInterest
    ? matchedItem?.academicInterest
    : "",
  });

  useEffect(() => {
    setPaperSubmissionData({
      abstract: matchedItem?.abstract ? matchedItem?.abstract : "",
      file: matchedItem?.fileId ? matchedItem?.fileId : null,
      authors: matchedItem?.authors ? matchedItem?.authors : [],
      correspondingAuthor: matchedItem?.correspondingAuthor
        ? matchedItem?.correspondingAuthor
        : authUser?.uid,
      abstractApproved: matchedItem?.abstractApproved
        ? matchedItem?.abstractApproved
        : false,
    academicInterest: matchedItem?.academicInterest
    ? matchedItem?.academicInterest
    : "",
    });
  }, [matchedItem]);

  useEffect(() => {
    console.log("paperSubmissionData", paperSubmissionData);
  }, [paperSubmissionData]);

  useEffect(() => {
    // console.log("abstractApproved", paperSubmissionData?.abstractApproved)
    if (authUser?.uid) {
      setPaperSubmissionData((prev) => ({
        ...prev,
        correspondingAuthor: authUser?.uid,
      }));
    }
  }, [authUser]);

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(
    matchedItem?.authors ? matchedItem?.authors : []
  );

  // const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>(
  //   matchedItem?.authors
  //     ? users
  //         ?.filter((e) => matchedItem?.authors?.some((a) => a === e?.id))
  //         .map((user) => `${user?.firstName} ${user?.lastName}`)
  //     : []
  // );


  const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>(
    matchedItem?.authors
      ? matchedItem.authors.map((author) => {
          const user = users.find((e) => e.id === author);
          // If user is found, return the full name; otherwise, return the author as is
          return user ? `${user.firstName} ${user.lastName}` : author;
        })
      : []
  );
  

  useEffect(() => {
    setSelectedAuthorNames(
      matchedItem?.authors
      ? matchedItem.authors.map((author) => {
          const user = users.find((e) => e.id === author);
          // If user is found, return the full name; otherwise, return the author as is
          return user ? `${user.firstName} ${user.lastName}` : author;
        })
      : []
    );
  }, [users]);

  const { submitPaper, isSubmitting, error } = usePaperUpdate({
    paperSubmissionData,
    projectId,
    matchedItem,
  });

  const { submitPaperImprove, submittingImprove } = usePaperImprove({
    paperSubmissionData,
    projectId,
    matchedItem,
  });

  const { submitAbstract, isAbstractSubmitting, abstractError } =
    usePaperAbstractApproval({
      paperSubmissionData,
      projectId,
      matchedItem,
    });

  const handleAbstractChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPaperSubmissionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorId = e.target.value;
    const selectedAuthor = users.find(
      (user: any) => user.id === selectedAuthorId
    );

    if (selectedAuthor && !selectedAuthors.includes(selectedAuthorId)) {
      setSelectedAuthors((prevAuthors) => [...prevAuthors, selectedAuthorId]);
      setSelectedAuthorNames((prevNames) => [
        ...prevNames,
        `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
      ]);
      setPaperSubmissionData((prev) => ({
        ...prev,
        authors: [...prev.authors, selectedAuthorId],
      }));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const file: File | null = files ? files[0] : null;

    if (file && file.type === "application/pdf") {
      setPaperSubmissionData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      console.error("Please select a PDF file.");
      // You might want to set an error state or display a message to the user here
    }
  };

  const handleSubmitPaper = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("salam");
    event.preventDefault();

    if (userDataElements?.userData?.reviewResult === "Weak Accept") {
      submitPaperImprove();
    } else if (matchedItem?.abstractApproved) {
      submitPaper();
    } else {
      submitAbstract();
    }
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...selectedAuthors];
    updatedAuthors.splice(index, 1);

    const updatedAuthorNames = [...selectedAuthorNames];
    updatedAuthorNames.splice(index, 1);

    setSelectedAuthors(updatedAuthors);
    setSelectedAuthorNames(updatedAuthorNames);

    setPaperSubmissionData((prev) => ({
      ...prev,
      authors: updatedAuthors,
    }));
  };
  const handleCorrespondingAuthor = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const correspondingAuthorId = e.target.value;
    setPaperSubmissionData((prev) => ({
      ...prev,
      correspondingAuthor: correspondingAuthorId,
    }));
  };

  const academicInterestOptions= [
    "Energetics, Industry 4.0",
    "Robotics",
    "Power Electronics",
    "Hardware Design",
    "Data Mining and Intelligent Systems",
    "Digitalization and Digital Transformations",
    "Machine Learning and Artificial Intelligence",
    "Graph and Model Transformation",
    "Metamodeling and Domain-Specific Languages",
    "Mobile and Distributed Systems",
    "Computer Graphics and Image Recognition",
    "Control Theory, Control Engineering",
    "Other",
  ]

  return (
    <>
      {formLoading === false ? (
        <form onSubmit={handleSubmitPaper}>
          {userDataElements?.userData?.reviewResult === "Weak Accept" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  flex: 1,
                  opacity: "0.5",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >


        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Academic Selection
          </InputLabel>
          <Select
                disabled={
                  matchedItem?.abstractApproved ||
                  (matchedItem?.abstract &&
                    !matchedItem?.adminResponseMade) ||
                  matchedItem?.abstractUpdated ||
                  matchedItem?.adminResponseMade ||
                  matchedItem?.blocked
                }
            value={
              paperSubmissionData?.academicInterest
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Academic Selection"
            name="academicSelection"
            onChange={(e) => {
              setPaperSubmissionData(prev => ({...prev, academicInterest: e.target.value }))
            }}
          >
            {academicInterestOptions?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>



                <TextField
                  id="abstract"
                  name="abstract"
                  type="text"
                  value={paperSubmissionData.abstract}
                  label="Abstract"
                  rows={3}
                  inputProps={{ maxLength: 1000 }}
                  required={true}
                  disabled={
                    matchedItem?.abstractApproved ||
                    (matchedItem?.abstract &&
                      !matchedItem?.adminResponseMade) ||
                    matchedItem?.abstractUpdated ||
                    matchedItem?.blocked
                  }
                  multiline={true}
                  onChange={handleAbstractChange}
                  style={{ width: "100%" }}
                />
                <div
                  style={{
                    color: "#6e6e6e",
                    flex: 1,
                    display: "flex",
                    padding: "5px 0px",
                    justifyContent: "flex-end",
                    transform: "translateY(-10px)",
                  }}
                >
                  {paperSubmissionData?.abstract?.length}/1000
                </div>


                
              <Autocomplete
                style={{ width: "100%" }}
                disabled={
                  matchedItem?.abstractApproved ||
                  (matchedItem?.abstract &&
                    !matchedItem?.adminResponseMade) ||
                  matchedItem?.abstractUpdated ||
                  matchedItem?.adminResponseMade ||
                  matchedItem?.blocked
                }
                onChange={(event, newValue) => {
                  if (newValue?.inputValue) {
                    if (!selectedAuthorNames.includes(newValue?.inputValue)) {
                      setSelectedAuthors((prevAuthors) => [
                        ...prevAuthors,
                        newValue?.inputValue,
                      ]);
                      setSelectedAuthorNames((prevNames) => [
                        ...prevNames,
                        `${newValue?.inputValue}`,
                      ]);
                      setPaperSubmissionData((prev) => ({
                        ...prev,
                        authors: [...prev.authors, newValue?.inputValue],
                      }));
                    }
                  } else if (newValue?.id) {
                    const selectedAuthorId = newValue?.id;
                    const selectedAuthor = users.find(
                      (user) => user.id === selectedAuthorId
                    );

                    if (
                      selectedAuthor &&
                      !selectedAuthors.includes(selectedAuthorId)
                    ) {
                      setSelectedAuthors((prevAuthors) => [
                        ...prevAuthors,
                        selectedAuthorId,
                      ]);
                      setSelectedAuthorNames((prevNames) => [
                        ...prevNames,
                        `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
                      ]);
                      setPaperSubmissionData((prev) => ({
                        ...prev,
                        authors: [...prev.authors, selectedAuthorId],
                      }));
                    }
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) =>
                      inputValue === `${option.firstName} ${option.lastName}`
                  );

                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }

                  // Exclude already selected authors
                  return filtered.filter(
                    (option) =>
                      !selectedAuthors.includes(option.id) &&
                      !selectedAuthorNames.includes(
                        `${option.firstName} ${option.lastName}`
                      )
                  );
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={users?.filter((user) => user?.id !== authUser?.uid)}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return `${option.firstName} ${option.lastName}`;
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.title || `${option.firstName} ${option.lastName}`}
                  </li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Select Coauthor(s)" />
                )}
              />

                {/* <Autocomplete
                  id="controlled-demo"
                  sx={{ flex: 1 }}
                  disabled={
                    matchedItem?.abstractApproved ||
                    (matchedItem?.abstract &&
                      !matchedItem?.adminResponseMade) ||
                    matchedItem?.abstractUpdated ||
                    matchedItem?.adminResponseMade ||
                    matchedItem?.blocked
                  }
                  style={{ width: "100%", marginBottom: "1rem" }}
                  options={users?.filter((e) => e?.id !== authUser?.uid)}
                  autoHighlight
                  // value={country} // Make sure `country` is one of the options in `countries`
                  onChange={(e, newValue) => {
                    const selectedAuthorId = newValue?.id;
                    const selectedAuthor = users.find(
                      (user: any) => user.id === selectedAuthorId
                    );

                    if (
                      selectedAuthor &&
                      !selectedAuthors.includes(selectedAuthorId)
                    ) {
                      setSelectedAuthors((prevAuthors) => [
                        ...prevAuthors,
                        selectedAuthorId,
                      ]);
                      setSelectedAuthorNames((prevNames) => [
                        ...prevNames,
                        `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
                      ]);
                      setPaperSubmissionData((prev) => ({
                        ...prev,
                        authors: [...prev.authors, selectedAuthorId],
                      }));
                    }
                  }}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.firstName} {option.lastName}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Coauthor(s)"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                /> */}

                <div
                  className="selectedUserNames"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    marginBottom: "15px",
                    // justifyContent: 'stretch'
                  }}
                >
                  <div
                    style={{
                      background: "#ccc",
                      padding: "5px 10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {userDataElements?.userData?.firstName}{" "}
                    {userDataElements?.userData?.lastName}{" "}
                    <IconButton
                      // disabled={true}
                      aria-label="delete"
                      size="large"
                      // color="error"
                      color="primary"
                    >
                      <AttributionIcon />
                    </IconButton>
                  </div>

                  {selectedAuthorNames.map((authorName, index) => (
                    <div
                      style={{
                        background: "#ccc",
                        padding: "5px 10px",
                        marginTop: "5px",
                        borderRadius: "5px",
                        boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      {authorName}{" "}
                      <IconButton
                        disabled={
                          matchedItem?.abstractApproved ||
                          (matchedItem?.abstract &&
                            !matchedItem?.adminResponseMade) ||
                          matchedItem?.abstractUpdated ||
                          matchedItem?.adminResponseMade ||
                          matchedItem?.blocked
                        }
                        onClick={() => removeAuthor(index)}
                        aria-label="delete"
                        size="large"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>

              {matchedItem?.abstractApproved && (
                <>
                  <div
                    onClick={focusImage}
                    // onDragOver={handleDragOver}
                    // onDragLeave={handleDragLeave}
                    // onDrop={handleDrop}
                    className={classes.chooseImage}
                  >
                    <div className={classes.textSection}>
                      <FontAwesomeIcon
                        className={classes.chooseImageIcon}
                        icon={faFilePdf}
                        style={{ marginBottom: "10px" }}
                      />
                      <div>
                        {paperSubmissionData?.file?.name
                          ? `${paperSubmissionData?.file?.name}`
                          : "Click here to upload paper"}
                      </div>
                    </div>
                    <input
                      disabled={userDataElements?.userData?.paperUpdated}
                      ref={imageRef}
                      type="file"
                      name="file"
                      id="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}

              {submittingImprove ? (
                <LoadingButton
                  color="secondary"
                  loading={true}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>Updating Paper</span>
                </LoadingButton>
              ) : (
                <Button
                  disabled={userDataElements?.userData?.paperUpdated}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  {userDataElements?.userData?.paperUpdated
                    ? "Paper Updated"
                    : "Update Paper"}
                </Button>
              )}
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >

              

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Academic Selection
          </InputLabel>
          <Select
          disabled={
            matchedItem?.abstractApproved ||
            (matchedItem?.abstract && !matchedItem?.adminResponseMade) ||
            matchedItem?.abstractUpdated ||
            matchedItem?.adminResponseMade ||
            matchedItem?.blocked
          }
            value={
              paperSubmissionData?.academicInterest
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Academic Selection"
            name="academicSelection"
            onChange={(e) => {
              setPaperSubmissionData(prev => ({...prev, academicInterest: e.target.value }))
            }}
          >
            {academicInterestOptions?.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>


              <TextField
                id="abstract"
                name="abstract"
                type="text"
                value={paperSubmissionData.abstract}
                label="Abstract"
                rows={3}
                inputProps={{ maxLength: 1000 }}
                required={true}
                disabled={
                  matchedItem?.abstractApproved ||
                  (matchedItem?.abstract && !matchedItem?.adminResponseMade) ||
                  matchedItem?.abstractUpdated ||
                  matchedItem?.blocked
                }
                multiline={true}
                onChange={handleAbstractChange}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  color: "#6e6e6e",
                  flex: 1,
                  display: "flex",
                  padding: "5px 0px",
                  justifyContent: "flex-end",
                  transform: "translateY(-10px)",
                }}
              >
                {paperSubmissionData?.abstract?.length}/1000
              </div>

              <Autocomplete
                style={{ width: "100%" }}
                disabled={
                  matchedItem?.abstractApproved ||
                  (matchedItem?.abstract && !matchedItem?.adminResponseMade) ||
                  matchedItem?.abstractUpdated ||
                  matchedItem?.adminResponseMade ||
                  matchedItem?.blocked
                }
                onChange={(event, newValue) => {
                  if (newValue?.inputValue) {
                    if (!selectedAuthorNames.includes(newValue?.inputValue)) {
                      setSelectedAuthors((prevAuthors) => [
                        ...prevAuthors,
                        newValue?.inputValue,
                      ]);
                      setSelectedAuthorNames((prevNames) => [
                        ...prevNames,
                        `${newValue?.inputValue}`,
                      ]);
                      setPaperSubmissionData((prev) => ({
                        ...prev,
                        authors: [...prev.authors, newValue?.inputValue],
                      }));
                    }
                  } else if (newValue?.id) {
                    const selectedAuthorId = newValue?.id;
                    const selectedAuthor = users.find(
                      (user) => user.id === selectedAuthorId
                    );

                    if (
                      selectedAuthor &&
                      !selectedAuthors.includes(selectedAuthorId)
                    ) {
                      setSelectedAuthors((prevAuthors) => [
                        ...prevAuthors,
                        selectedAuthorId,
                      ]);
                      setSelectedAuthorNames((prevNames) => [
                        ...prevNames,
                        `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
                      ]);
                      setPaperSubmissionData((prev) => ({
                        ...prev,
                        authors: [...prev.authors, selectedAuthorId],
                      }));
                    }
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) =>
                      inputValue === `${option.firstName} ${option.lastName}`
                  );

                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }

                  // Exclude already selected authors
                  return filtered.filter(
                    (option) =>
                      !selectedAuthors.includes(option.id) &&
                      !selectedAuthorNames.includes(
                        `${option.firstName} ${option.lastName}`
                      )
                  );
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={users?.filter((user) => user?.id !== authUser?.uid)}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return `${option.firstName} ${option.lastName}`;
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.title || `${option.firstName} ${option.lastName}`}
                  </li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Select Coauthor(s)" />
                )}
              />

              {/* <Autocomplete
          id="controlled-demo"
          sx={{ flex: 1 }}
          disabled={
            matchedItem?.abstractApproved ||
            (matchedItem?.abstract && !matchedItem?.adminResponseMade) ||
            matchedItem?.abstractUpdated 
            || matchedItem?.adminResponseMade || matchedItem?.blocked

          }
          style={{ width: "100%", marginBottom: "1rem" }}
          options={users?.filter((e) => e?.id !== authUser?.uid)}
          autoHighlight
          // value={country} // Make sure `country` is one of the options in `countries`
          onChange={(e, newValue) => {
            const selectedAuthorId = newValue?.id;
            const selectedAuthor = users.find(
              (user: any) => user.id === selectedAuthorId
            );

            if (selectedAuthor && !selectedAuthors.includes(selectedAuthorId)) {
              setSelectedAuthors((prevAuthors) => [
                ...prevAuthors,
                selectedAuthorId,
              ]);
              setSelectedAuthorNames((prevNames) => [
                ...prevNames,
                `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
              ]);
              setPaperSubmissionData((prev) => ({
                ...prev,
                authors: [...prev.authors, selectedAuthorId],
              }));
            }
          }}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.firstName} {option.lastName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Coauthor(s)"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        /> */}

              <div
                className="selectedUserNames"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  marginBottom: "15px",
                  // justifyContent: 'stretch'
                }}
              >
                <div
                  style={{
                    background: "#ccc",
                    padding: "5px 10px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {userDataElements?.userData?.firstName}{" "}
                  {userDataElements?.userData?.lastName}{" "}
                  <IconButton
                    // disabled={true}
                    aria-label="delete"
                    size="large"
                    // color="error"
                    color="primary"
                  >
                    <AttributionIcon />
                  </IconButton>
                </div>

                {selectedAuthorNames.map((authorName, index) => (
                  <div
                    style={{
                      background: "#ccc",
                      padding: "5px 10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    {authorName}{" "}
                    <IconButton
                      disabled={
                        matchedItem?.abstractApproved ||
                        (matchedItem?.abstract &&
                          !matchedItem?.adminResponseMade) ||
                        matchedItem?.abstractUpdated ||
                        matchedItem?.adminResponseMade ||
                        matchedItem?.blocked
                      }
                      onClick={() => removeAuthor(index)}
                      aria-label="delete"
                      size="large"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>

              {matchedItem?.abstractApproved && (
                <>
                  <div
                    onClick={focusImage}
                    // onDragOver={handleDragOver}
                    // onDragLeave={handleDragLeave}
                    // onDrop={handleDrop}
                    className={classes.chooseImage}
                  >
                    <div className={classes.textSection}>
                      <FontAwesomeIcon
                        className={classes.chooseImageIcon}
                        icon={faFilePdf}
                        style={{ marginBottom: "10px" }}
                      />
                      <div>
                        {paperSubmissionData?.file?.name
                          ? `${paperSubmissionData?.file?.name}`
                          : matchedItem?.fileId
                          ? matchedItem?.fileId
                          : "Click here to upload file"}
                      </div>
                    </div>
                    <input
                      disabled={
                        userDataElements?.userData?.actualState >= 4 ||
                        matchedItem?.blocked
                      }
                      ref={imageRef}
                      type="file"
                      name="file"
                      id="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* <div
          style={{
            flex: 1,
            width: "100%",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          className="pdf"
        >
          <label htmlFor="file">Upload file</label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            // required
            onChange={handleFileChange}
          />
          
        </div> */}
                  {/* {matchedItem?.fileId && `Previous File = ${matchedItem?.fileId}`}
            <br /> */}
                  {/* {paperSubmissionData?.file?.name && 
        `File =  ${paperSubmissionData?.file?.name}`
    } */}
                </>
              )}

              {matchedItem?.blocked ? (
                <Button variant="contained" style={{ width: "100%" }} disabled>
                  Abstract Blocked
                </Button>
              ) : (
                <>
                  {isSubmitting || isAbstractSubmitting ? (
                    <LoadingButton
                      color="secondary"
                      loading={true}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      <span>Sending</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      disabled={
                        (matchedItem?.abstract &&
                          !matchedItem?.adminResponseMade) ||
                        matchedItem?.abstractUpdated ||
                        userDataElements?.userData?.actualState >= 4 ||
                        (matchedItem?.abstractApproved &&
                          !paperSubmissionData?.file)
                      }
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      {!matchedItem?.fileId
                        ? !matchedItem?.adminResponseMade
                          ? matchedItem?.abstract
                            ? "Abstract Sent"
                            : "Send Abstract"
                          : matchedItem?.abstractUpdated
                          ? "Update Sent"
                          : matchedItem?.abstractApproved
                          ? "Send File"
                          : "Update Abstract"
                        : userDataElements?.userData?.actualState >= 4
                        ? userDataElements?.userData?.actualState === 5
                          ? "Review Received"
                          : "Paper Sent for Review"
                        : "Update File"}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </form>
      ) : (
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ccc",
          }}
        >
          Loading Data
        </div>
      )}
    </>
  );
};

export default EditPaperSubmissionInputs;
