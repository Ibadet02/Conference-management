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
import Autocomplete from "@mui/material/Autocomplete";
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

const PaperInputsArchived: React.FC<PaperSubmissionInputsProps> = ({
  projectId,
  matchedItem,
  projectData,
}) => {
  const userDataElements = useUserData();

  const [isDragOver, setIsDragOver] = useState(false);
  const imageRef = useRef();

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
  const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>(
    matchedItem?.authors
      ? users
          ?.filter((e) => matchedItem?.authors?.some((a) => a === e?.id))
          .map((user) => `${user?.firstName} ${user?.lastName}`)
      : []
  );

  useEffect(() => {
    setSelectedAuthorNames(
      matchedItem?.authors
        ? users
            ?.filter((e) => matchedItem?.authors?.some((a) => a === e?.id))
            .map((user) => `${user?.firstName} ${user?.lastName}`)
        : []
    );
  }, [users]);

  const { submitPaper, isSubmitting, error } = usePaperUpdate({
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
    // Call the submitPaper function from the hook
    if (matchedItem?.abstractApproved) {
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

  return (
    <form onSubmit={handleSubmitPaper}>


      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          id="abstract"
          name="abstract"
          type="text"
          value={paperSubmissionData.abstract}
          label="Abstract"
          rows={3}
          inputProps={{ maxLength: 1000 }}
          required={true}
          disabled={true}
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
          id="controlled-demo"
          sx={{ flex: 1 }}
          disabled={true}
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
        />

        {/* <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="authors">Select Co-author</InputLabel>
            <Select
              value={selectedAuthors[selectedAuthors.length - 1] || ""}
              labelId="authors"
              id="demo-simple-select"
              label="Select Co-author"
              name="authors"
              disabled={matchedItem?.abstractApproved}
              required={true}
              onChange={handleAuthorChange}
            >
              {users?.filter((e) => e?.id !== authUser?.uid)?.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}

        {/* {selectedAuthorNames?.length > 0 && ( */}
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
                  disabled={true}
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
        {/* )} */}

        {/* <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="authors">Corresponding Author {paperSubmissionData?.correspondingAuthor}</InputLabel>
            <Select
              value={paperSubmissionData.correspondingAuthor}
              labelId="authors"
              id="demo-simple-select"
              label="Corresponding Author"
              name="authors"
              required={true}
              onChange={handleCorrespondingAuthor}
            >
              <MenuItem value={""}>Select Corresponding Author...</MenuItem>
              {paperSubmissionData.authors.map((authorId: string) => {
                const correspondingUser = users.find(
                  (user: any) => user.id === authorId
                );
                return (
                  <MenuItem key={authorId} value={authorId}>
                    {correspondingUser
                      ? `${correspondingUser.firstName} ${correspondingUser.lastName}`
                      : ""}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box> */}

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
                    : matchedItem?.fileId ? matchedItem?.fileId : "Click here to upload file"}
                </div>
              </div>
              <input
                disabled={true}
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
        {/* {console.log("matchedItem?.fileId", matchedItem)}
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
              (matchedItem?.abstract && !matchedItem?.adminResponseMade) ||
              (matchedItem?.abstractUpdated) || (userDataElements?.userData?.actualState >= 4)
            }
            variant="contained"
            color="success"
            type="submit"
          >
            {!matchedItem?.fileId
              ? !matchedItem?.adminResponseMade
                ? (matchedItem?.abstract
                  ? "Abstract Sent"
                  : "Send Abstract")
                : (matchedItem?.abstractUpdated)
                ? "Update Sent"
                : (matchedItem?.abstractApproved ? "Send File" : "Update Abstract")
              : (
                userDataElements?.userData?.actualState >= 4 ?  (userDataElements?.userData?.actualState === 5 ? "Review Received" : "Paper Sent for Review") : "Update File"
              )}
          </Button>
        )} */}

        {/* {error && <p>{error}</p>} */}
      </div>
    </form>
  );
};

export default PaperInputsArchived;
