import { useEffect, useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";
import conferenceImage from "../../../../assets/images/thirdConference.jpg";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetPapersToBeReviewed from "../../../../hooks/useGetPapersToBeReviewed";
import useGetProjects from "../../../../hooks/useGetProjects";
import useGetAuthorsData from "../../../../hooks/useGetAuthorsData";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import MoreInfo from "./MoreInfo";
import useUpdatePapersToBeReviewed from "../../../../hooks/useUpdatePapersToBeReviewed";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import AbstractOnly from "./AbstractOnly";

import Tooltip from "@mui/material/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import UserInformationOnly from "./UserInformationOnly";

const ApprovaAbstract = () => {
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false)

  const { loading, submittedPapers } = useGetSubmittedPapers();
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [submitting, setSubmitting] = useState("");
  const [openAbstract, setOpenAbstract] = useState(false);

  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useUpdatePapersToBeReviewed();
  // const updatePapersToBe = useCreatePapersToBeReviewed();
  const handleAssignedReviewerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dataIndex: number
  ) => {
    const assignedReviewerId = e.target.value;
    const assignedReviewer = users.find(
      (user: any) => user.id === assignedReviewerId
    );

    if (assignedReviewer) {
      setAssignedReviewers((prevData) => {
        const updatedAssignedReviewers = [...prevData];
        const set = new Set(updatedAssignedReviewers[dataIndex]); // Convert to Set
        set.add(assignedReviewerId); // Add the new value
        updatedAssignedReviewers[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewers;
      });

      setAssignedReviewerNames((prevData) => {
        const updatedAssignedReviewerNames = [...prevData];
        const set = new Set(updatedAssignedReviewerNames[dataIndex]); // Convert to Set
        set.add(`${assignedReviewer.firstName} ${assignedReviewer.lastName}`); // Add the new value
        updatedAssignedReviewerNames[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewerNames;
      });
    }
  };

  const removeAssignedReviewer = (index: number, dataIndex: number) => {
    // Create copies of assignedReviewers and assignedReviewerNames arrays
    const updatedAssignedReviewers = [...assignedReviewers];
    const updatedAssignedReviewerNames = [...assignedReviewerNames];

    // Remove the selected element at the specified index from both arrays
    updatedAssignedReviewers[dataIndex].splice(index, 1);
    updatedAssignedReviewerNames[dataIndex].splice(index, 1);

    // Update the state with the updated arrays
    setAssignedReviewers(updatedAssignedReviewers);
    setAssignedReviewerNames(updatedAssignedReviewerNames);
  };

  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  const handleSendForReview = async (
    paperData: any,
    assignedReviewersData: any
  ) => {
    setSubmitting(paperData?.projectId);
    try {
      const dataToSend = {
        ...paperData,
        assignedReviewers: assignedReviewersData,
      };
      await createPapersToBeReviewed(
        dataToSend,
        "toBeReviewed",
        paperData?.paperId
      );
      console.log("Paper sent for review successfully!");
      setSubmitting("");
    } catch (error) {
      console.error("Error sending paper for review: ", error);
      setSubmitting("");
    }
  };

  const { toBeReviewed, toBeReviewedLoading } = useGetPapersToBeReviewed();
  const { projects } = useGetProjects();
  const { authorsData } = useGetAuthorsData();

  const [type, setType] = useState("New");
  const [shownData, setShownData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);

  const { downloadLastPdf, downloadUrl, error, downloadLoading } =
    useDownloadPDF();

  const handleDownload = (
    correspondingAuthorId: string,
    projectId: string,
    paperId: string
  ) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };

  function downloadAllFiles() {
    submittedPapers?.forEach((project) =>
      handleDownload(project.userId, project.projectId, project.paperId)
    );
  }

  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const uniqueRows = submittedPapers?.filter(
      (row, index, self) =>
        index ===
        self.findIndex((r) => r?.paperId === row?.paperId && !row.fileId)
    );
    setShownData(
      uniqueRows?.filter(
        (row) =>
          (!row.adminResponseMade || row?.abstractUpdated)
      )
    );

    setApproved(
      uniqueRows?.filter(
        (row) =>
          (!row.adminResponseMade || !row?.abstractUpdated) &&
          row?.abstractApproved === true
      )
    );
    setRejected(
      uniqueRows?.filter(
        (row) =>
          (row.adminResponseMade && !row?.abstractUpdated) &&
          row?.abstractApproved === false
      )
    );
    // setBlocked(uniqueRows?.filter((row) => row?.blocked));
    //     setArchivedData(uniqueRows?.filter((row) => row.adminResponseMade && !row?.abstractUpdated
    // ))
  }, [submittedPapers]);

  return (
    <StyledPapers>
      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          padding: "1rem",
        }}
      >
        <>
          <div
            style={{
              margin: "1rem",
              flex: 1,
              background: "rgba(255,255,255,1)",
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "5px 5px 20px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              {/* <Button variant="outlined" disabled={downloadLoading !== ""} style={{width: '100%'}} onClick={() => {downloadAllFiles();}}>Download All PDFs</Button> */}

              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  flex: 1,
                  background: "#eee",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
                  margin: "15px 10px",
                }}
              >
                <div
                  onClick={() => {
                    setType("New");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "New" ? "#0f67fd" : "transparent",
                    color: type === "New" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Pending
                </div>
                <div
                  onClick={() => {
                    setType("Approved");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "Approved" ? "#0f67fd" : "transparent",
                    color: type === "Approved" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Approved
                </div>
                <div
                  onClick={() => {
                    setType("Rejected");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "Rejected" ? "#0f67fd" : "transparent",
                    color: type === "Rejected" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Rejected
                </div>
                {/* <div
                  onClick={() => {
                    setType("Blocked");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "Blocked" ? "#0f67fd" : "transparent",
                    color: type === "Blocked" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Blocked
                </div> */}
              </div>

              {type === "New" && (
                <>
                  {shownData?.length > 0 ? (
                    <table
                      style={{ color: "#5e5e5e", border: "1px solid #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #ccc" }}>
                            Conference Title
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Corr Author
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Co-authors
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                          {/* <th style={{ border: "1px solid #ccc" }}>File</th> */}
                          {/* <th style={{ border: "1px solid #ccc" }}>
                      Assign Reviewer
                    </th>
                    <th style={{ border: "1px solid #ccc" }}>
                      Send for review
                    </th> */}
                          <th style={{ border: "1px solid #ccc" }}>
                            More Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shownData?.map((row: any, dataIndex) => {
                          const thisItemInDatabase = toBeReviewed?.find(
                            (e) => row?.paperId === e?.paperId
                          );
                          return (
                            <tr key={dataIndex}>
                              <td
                                style={{
                                  border: "1px solid #ccc",
                                }}
                              >
                                {row?.abstractUpdated && (
                                  <Tooltip title="This abstract was updated">
                                    <FontAwesomeIcon
                                      icon={faFlag}
                                      style={{
                                        color: "green",
                                        marginRight: "10px",
                                        cursor: 'pointer'
                                      }}
                                    />
                                  </Tooltip>
                                )}
                                {
                                  projects?.find((e) => e?.id === row.projectId)
                                    ?.title
                                }
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                                <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} onClick={() => {
                                  setSelectedUser(row.correspondingAuthor)
                                  setShowUserInfo(true)
                                }}>
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.firstName
                                }{" "}
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.lastName
                                }
                                </Button>
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                className="co-authors"
                                // title={row.authors}
                              >
                                {row.authors.map((author: any, index: any) => {
                                  return (
                                    <div key={index}>
                                    <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} key={author}  onClick={() => {
                                      setSelectedUser(author)
                                      setShowUserInfo(true)
                                    }}>
                                    <p style={{ margin: "5px" }}>
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        ) ?
                                        <>
                                        {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.firstName
                                      }{" "}
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.lastName
                                      }
                                        </>
                                        :
                                        author
                                      }
                                      
                                    </p>
                                </Button>
                                </div>
                                  );
                                })}
                                {
                                  row.authors?.length === 0 && <span  style={{color: '#ccc', fontSize: '15px'}}>No Co-author(s)</span>
                                }
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={row.abstract}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                  }}
                                >
                                  {handleOverflowedText(row.abstract)}
                                  <IconButton
                                    onClick={() => {
                                      setSelectedPaper(row);
                                      setOpenAbstract(true);
                                    }}
                                    aria-label="delete"
                                    size="large"
                                    color="primary"
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </div>
                              </td>
                              {/* <td style={{ border: "1px solid #ccc" }}>
                            {row.fileId}
                          </td> */}
                              {/* <td style={{ border: "1px solid #ccc" }}>
                              <>
                                <div>
                                  <Box sx={{ width: "100%" }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="authors">
                                        Assign reviewer(s)
                                      </InputLabel>
                                      <Select
                                        labelId="assignedReviewers"
                                        id="demo-simple-select"
                                        label="Assign reviewer(s)"
                                        name="assignedReviewers"
                                        disabled={toBeReviewedLoading}
                                        style={{
                                          borderRadius: "0px",
                                          width: "100%",
                                        }}
                                        value={
                                          assignedReviewers[dataIndex]?.[
                                            assignedReviewers[dataIndex]
                                              ?.length - 1
                                          ]
                                            ? assignedReviewers[dataIndex]?.[
                                                assignedReviewers[dataIndex]
                                                  ?.length - 1
                                              ]
                                            : thisItemInDatabase?.assignedReviewers?.map(
                                                (item, index) => {
                                                  const val = {
                                                    target: {
                                                      value: item,
                                                    },
                                                  };
                                                  handleAssignedReviewerChange(
                                                    val,
                                                    dataIndex
                                                  );
                                                }
                                              )
                                        } 
                                        onChange={(e) =>
                                          handleAssignedReviewerChange(
                                            e,
                                            dataIndex
                                          )
                                        }
                                      >
                                        <MenuItem value="">Select...</MenuItem>
                                        {users.map((user: any) => (
                                          <MenuItem
                                            key={user.id}
                                            value={user.id}
                                          >
                                            {`${user.firstName} ${user.lastName}`}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>
                                <div className="selectedUserNames">
                                  {assignedReviewerNames[dataIndex]?.map(
                                    (reviewerName, index) => (
                                      <div
                                        style={{
                                          display: "flex",
                                          flex: 1,
                                          justifyContent: "space-between",
                                          margin: "10px 5px",
                                          background: "#ccc",
                                          borderRadius: "5px",
                                          padding: "5px",
                                          alignItems: "center",
                                          gap: "5px",
                                        }}
                                        key={index}
                                      >
                                        {reviewerName}{" "}
                                        <IconButton
                                          type="button"
                                          onClick={() =>
                                            removeAssignedReviewer(
                                              index,
                                              dataIndex
                                            )
                                          }
                                          aria-label="delete"
                                          size="small"
                                        >
                                          <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            </td>
                            <td style={{ border: "1px solid #ccc" }}>
                              <Button
                                variant="contained"
                                style={{ borderRadius: "0px", width: "100%" }}
                                disabled={
                                  submitting === row?.paperId ||
                                  toBeReviewedLoading
                                  // ||
                                  // toBeReviewed?.some(
                                  //   (e) => row?.paperId === e?.paperId
                                  // )
                                }
                                onClick={() =>
                                  handleSendForReview(
                                    row,
                                    assignedReviewers[dataIndex]
                                  )
                                }
                              >
                                {toBeReviewed?.some(
                                  (e) => row?.paperId === e?.paperId
                                )
                                  ? "Update"
                                  : "Send for review"}
                              </Button>
                            </td> */}

                              <td style={{ border: "1px solid #ccc" }}>
                                <Button
                                  onClick={() => {
                                    setSelectedPaper(row);
                                    setShowModal(true);
                                  }}
                                  style={{ width: "100%", borderRadius: "0px" }}
                                  variant="contained"
                                >
                                  More Actions{" "}
                                  {row?.paperUpdateRequest &&
                                    `(Update Requested)`}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                      {loading ? "Loading Data" : "No Data"}
                    </div>
                  )}
                </>
              )}

              {type === "Approved" && (
                <>
                  {approved?.length > 0 ? (
                    <table
                      style={{ color: "#5e5e5e", border: "1px solid #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #ccc" }}>
                            Conference Title
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Corr Author
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Co-authors
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                          {/* <th style={{ border: "1px solid #ccc" }}>File</th> */}
                          {/* <th style={{ border: "1px solid #ccc" }}>
                      Assign Reviewer
                    </th>
                    <th style={{ border: "1px solid #ccc" }}>
                      Send for review
                    </th> */}
                          <th style={{ border: "1px solid #ccc" }}>
                            More Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {approved?.map((row: any, dataIndex) => {
                          const thisItemInDatabase = toBeReviewed?.find(
                            (e) => row?.paperId === e?.paperId
                          );
                          return (
                            <tr key={dataIndex}>
                              <td style={{ border: "1px solid #ccc" }}>
                                {
                                  projects?.find((e) => e?.id === row.projectId)
                                    ?.title
                                }
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                              <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} onClick={() => {
                                  setSelectedUser(row.correspondingAuthor)
                                  setShowUserInfo(true)
                                }}>
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.firstName
                                }{" "}
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.lastName
                                }
                                </Button>
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                className="co-authors"
                              >
                                {row.authors.map((author: any, index) => {
                                  return (
                                    <div key={index}>
                                    <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} key={author}  onClick={() => {
                                      setSelectedUser(author)
                                      setShowUserInfo(true)
                                    }}>
                                    <p style={{ margin: "5px" }}>
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        ) ?
                                        <>
                                        {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.firstName
                                      }{" "}
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.lastName
                                      }
                                        </>
                                        :
                                        author
                                      }
                                      
                                    </p>
                                </Button>
                                </div>
                                  );
                                })}
                                
                                {
                                  row.authors?.length === 0 && <span  style={{color: '#ccc', fontSize: '15px'}}>No Co-author(s)</span>
                                }
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={row.abstract}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                  }}
                                >
                                  {handleOverflowedText(row.abstract)}
                                  <IconButton
                                    onClick={() => {
                                      setSelectedPaper(row);
                                      setOpenAbstract(true);
                                    }}
                                    aria-label="delete"
                                    size="large"
                                    color="primary"
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </div>
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                                <Button
                                  onClick={() => {
                                    setSelectedPaper(row);
                                    setShowModal(true);
                                  }}
                                  style={{ width: "100%", borderRadius: "0px" }}
                                  variant="contained"
                                >
                                  More Actions <br />
                                  {row?.paperUpdateRequest &&
                                    `(Update Requested)`}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                      {loading ? "Loading Data" : "No Data"}
                    </div>
                  )}
                </>
              )}

              {type === "Rejected" && (
                <>
                  {rejected?.length > 0 ? (
                    <table
                      style={{ color: "#5e5e5e", border: "1px solid #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #ccc" }}>
                            Conference Title
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Corr Author
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Co-authors
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                          {/* <th style={{ border: "1px solid #ccc" }}>File</th> */}
                          {/* <th style={{ border: "1px solid #ccc" }}>
                      Assign Reviewer
                    </th>
                    <th style={{ border: "1px solid #ccc" }}>
                      Send for review
                    </th> */}
                          <th style={{ border: "1px solid #ccc" }}>
                            More Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejected?.map((row: any, dataIndex) => {
                          const thisItemInDatabase = toBeReviewed?.find(
                            (e) => row?.paperId === e?.paperId
                          );
                          return (
                            <tr key={dataIndex}>
                              <td style={{ border: "1px solid #ccc" }}>
                                {
                                  projects?.find((e) => e?.id === row.projectId)
                                    ?.title
                                }
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                              <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} onClick={() => {
                                  setSelectedUser(row.correspondingAuthor)
                                  setShowUserInfo(true)
                                }}>
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.firstName
                                }{" "}
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.lastName
                                }
                                </Button>
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                className="co-authors"
                              >
                                {row.authors.map((author: any, index: any) => {
                                  return (
                                    <div key={index}>
                                    <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} onClick={() => {
                                      setSelectedUser(author)
                                      setShowUserInfo(true)
                                    }}>
                                    <p style={{ margin: "5px" }}>
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        ) ?
                                        <>
                                        {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.firstName
                                      }{" "}
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.lastName
                                      }
                                        </>
                                        :
                                        author
                                      }
                                      
                                    </p>
                                </Button>
                                </div>
                                  );
                                })}
                                
                                {
                                  row.authors?.length === 0 && <span  style={{color: '#ccc', fontSize: '15px'}}>No Co-author(s)</span>
                                }
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={row.abstract}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                  }}
                                >
                                  {handleOverflowedText(row.abstract)}
                                  <IconButton
                                    onClick={() => {
                                      setSelectedPaper(row);
                                      setOpenAbstract(true);
                                    }}
                                    aria-label="delete"
                                    size="large"
                                    color="primary"
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </div>
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                                <Button
                                  onClick={() => {
                                    setSelectedPaper(row);
                                    setShowModal(true);
                                  }}
                                  style={{ width: "100%", borderRadius: "0px" }}
                                  variant="contained"
                                >
                                  More Actions <br />
                                  {row?.paperUpdateRequest &&
                                    `(Update Requested)`}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                      {loading ? "Loading Data" : "No Data"}
                    </div>
                  )}
                </>
              )}

              {/* {type === "Blocked" && (
                <>
                  {blocked?.length > 0 ? (
                    <table
                      style={{ color: "#5e5e5e", border: "1px solid #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #ccc" }}>
                            Conference Title
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Corr Author
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>
                            Co-authors
                          </th>
                          <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                          
                          <th style={{ border: "1px solid #ccc" }}>
                            More Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {blocked?.map((row: any, dataIndex) => {
                          const thisItemInDatabase = toBeReviewed?.find(
                            (e) => row?.paperId === e?.paperId
                          );
                          return (
                            <tr key={dataIndex}>
                              <td style={{ border: "1px solid #ccc" }}>
                                {
                                  projects?.find((e) => e?.id === row.projectId)
                                    ?.title
                                }
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                              <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e'}} onClick={() => {
                                  setSelectedUser(row.correspondingAuthor)
                                  setShowUserInfo(true)
                                }}>
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.firstName
                                }{" "}
                                {
                                  authorsData?.find(
                                    (e) => e?.id === row.correspondingAuthor
                                  )?.lastName
                                }
                                </Button>
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                className="co-authors"
                              >
                                {row.authors.map((author: any) => {
                                  return (
                                    <div>
                                    <Button style={{padding: '3px 10px', height: '25px', color: '#5e5e5e', color: '#5e5e5e'}} key={author}  onClick={() => {
                                      setSelectedUser(author)
                                      setShowUserInfo(true)
                                    }}>
                                    <p style={{ margin: "5px" }}>
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.firstName
                                      }{" "}
                                      {
                                        authorsData?.find(
                                          (e) => e?.id === author
                                        )?.lastName
                                      }
                                    </p>
                                </Button>
                                </div>
                                  );
                                })}
                                
                                {
                                  row.authors?.length === 0 && <span  style={{color: '#ccc', fontSize: '15px'}}>No Co-author(s)</span>
                                }
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={row.abstract}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                  }}
                                >
                                  {handleOverflowedText(row.abstract)}
                                  <IconButton
                                    onClick={() => {
                                      setSelectedPaper(row);
                                      setOpenAbstract(true);
                                    }}
                                    aria-label="delete"
                                    size="large"
                                    color="primary"
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </div>
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                                <Button
                                  onClick={() => {
                                    setSelectedPaper(row);
                                    setShowModal(true);
                                  }}
                                  style={{ width: "100%", borderRadius: "0px" }}
                                  variant="contained"
                                >
                                  More Actions <br />
                                  {row?.paperUpdateRequest &&
                                    `(Update Requested)`}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                      {loading ? "Loading Data" : "No Data"}
                    </div>
                  )}
                </>
              )} */}
            </div>
          </div>

          {openAbstract && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={() => setOpenAbstract(false)} />
                <AbstractOnly
                  project={selectedPaper}
                  onClose={() => setOpenAbstract(false)}
                />
              </StyledConferencePopupContainer>
            </>
          )}

{showUserInfo && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={() => setShowUserInfo(false)} />
                <UserInformationOnly
                  userId={selectedUser}
                  onClose={() => setShowUserInfo(false)}
                />
              </StyledConferencePopupContainer>
            </>
          )}

          {showModal && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={() => setShowModal(false)} />
                <MoreInfo
                  project={selectedPaper}
                  onClose={() => setShowModal(false)}
                />
              </StyledConferencePopupContainer>
            </>
          )}
        </>
      </div>
    </StyledPapers>
  );
};

export default ApprovaAbstract;
