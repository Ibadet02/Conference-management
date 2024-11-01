// export default PaperSubmissionInputs;
import React, { ChangeEvent, useEffect, useState } from "react";
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
import Button from "@mui/material/Button";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import usePaperUpdate from "../../../../hooks/usePaperUpdate";

const EditPaperSubmissionInputs: React.FC<PaperSubmissionInputsProps> = ({
  projectId,
  matchedItem,
}) => {
  
  const collectionName = "authorUsers";
  const { users, loading } = useGetUsers(collectionName);

  const [paperSubmissionData, setPaperSubmissionData] =
    useState<PaperSubmissionDataType>({
      abstract: matchedItem?.abstract ? matchedItem?.abstract : "",
      file: matchedItem?.fileId ? matchedItem?.fileId : null,
      authors: matchedItem?.authors ? matchedItem?.authors : [],
      correspondingAuthor: matchedItem?.correspondingAuthor
        ? matchedItem?.correspondingAuthor
        : "",
    });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(matchedItem?.authors ? matchedItem?.authors : []);
  const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>(
    matchedItem?.authors
      ? users?.filter((e) => matchedItem?.authors?.some((a) => a === e?.id)).map((user) => `${user?.firstName} ${user?.lastName}`)
      : []
  );

  useEffect(() => {
    setSelectedAuthorNames(
      matchedItem?.authors
        ? users?.filter((e) => matchedItem?.authors?.some((a) => a === e?.id)).map((user) => `${user?.firstName} ${user?.lastName}`)
        : []
    )
  }, [users])
  
  const { submitPaper, isSubmitting, error } = usePaperUpdate({
    paperSubmissionData,
    projectId,
    matchedItem
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
    submitPaper();
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
          required={true}
          multiline={true}
          onChange={handleAbstractChange}
          style={{ width: "100%" }}
        />

        <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="authors">Select Co-author</InputLabel>
            <Select
              value={selectedAuthors[selectedAuthors.length - 1] || ""}
              labelId="authors"
              id="demo-simple-select"
              label="Select Co-author"
              name="authors"
              required={true}
              onChange={handleAuthorChange}
            >
              {users.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedAuthorNames?.length > 0 && (
          <div
            className="selectedUserNames"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: '15px'
            }}
          >
            {selectedAuthorNames.map((authorName, index) => (
              <div
                style={{
                  background: "#ccc",
                  padding: "5px 10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                }}
                key={index}
              >
                {authorName}{" "}
                <IconButton
                  onClick={() => removeAuthor(index)}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}

        <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="authors">Corresponding Author</InputLabel>
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
        </Box>

        <div
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
        </div>
        Previous File = {matchedItem?.fileId}<br/>
        {paperSubmissionData?.file?.name && 
        `New File =  ${paperSubmissionData?.file?.name}`
    }

        {isSubmitting ? (
          <LoadingButton
            color="secondary"
            loading={true}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Updating</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" color="success" type="submit">
            Update Paper
          </Button>
        )}

        {/* {error && <p>{error}</p>} */}
      </div>
    </form>
  );
};

export default EditPaperSubmissionInputs;
