import { useEffect, useState } from "react";
import useGetProjects from "../../../../hooks/useGetProjects";
import useAuthentication from "../../../../hooks/useAuthentication";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import PaperAssessmentForm from "../PaperAssesment"; // Import the PaperAssessmentForm component
import useGetToBeReviewed from "../../../../hooks/useGetToBeReviewed";
import { StyledSubmittedConferences } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import conferenceImage from "../../../../assets/images/conference.jpg";
import useGetReviewerData from "../../../../hooks/useGetReviewerData";
import useGetAuthorsData from "../../../../hooks/useGetAuthorsData";
import MoreInfo from "./MoreInfo";
import useGetReviews from "../../../../hooks/useGetReviews";

import Tooltip from "@mui/material/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const SubmittedConferences = () => {
  const navigate = useNavigate();
  // const { projects, loading } = useGetProjects();
  const [isPaperAssessmentFormOpen, setIsPaperAssessmentFormOpen] =
    useState(false);
  // const [selectedPaper, setSelectedPaper] = useState(null);
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [type, setType] = useState("New");

  const authUser = useAuthentication();
  const {
    downloadLastPdf,
    downloadUrl,
    error,
    downloadProjectId,
    downloadLoading,
  } = useDownloadPDF();
  const [selectedPaper, setSelectedPaper] = useState(null); // State to track selected paper
  const { userData } = useGetReviewerData();

  const handleDownload = (
    correspondingAuthorId: string,
    projectId: string,
    paperId: string
  ) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };

  const downloadFile = async () => {
    if (downloadUrl) {
      try {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = downloadUrl.substring(downloadUrl.lastIndexOf("/") + 1); // Set the file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  // const handleAssessment = (paper: any) => {
  //   setSelectedPaper(paper); // Set the selected paper for assessment
  // };
  const handleClosePaperAssesmentFormPopup = () => {
    setIsPaperAssessmentFormOpen(false);
  };
  const handleAssesPaperClick = (paper: any) => {
    setSelectedPaper(paper);
    setIsPaperAssessmentFormOpen(true);
  };

  const { authorsData } = useGetAuthorsData();
  const { projects } = useGetProjects();

  const [shownData, setShownData] = useState([]);

  const { reviews } = useGetReviews();

  useEffect(() => {
    const uniqueRows = toBeReviewed?.filter(
      (row, index, self) =>
        index === self.findIndex((r) => r?.paperId === row?.paperId)
    );

    if (type === "New") {
      setShownData(
        uniqueRows?.filter(
          (paper) => !reviews?.some((row) => (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid))
        )
      );
    } else {
      setShownData(
        uniqueRows?.filter((paper) =>
          reviews?.some((row) => (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid))
        )
      );
    }
  }, [type, toBeReviewed, reviews]);

  return (
    <StyledSubmittedConferences>
      <div
        style={{ flex: 1, padding: "1rem", overflow: "auto", height: "100%" }}
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
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  flex: 1,
                  width: "100%",
                  background: "#eee",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
                  margin: "15px 0px",
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
                  New
                </div>
                <div
                  onClick={() => {
                    setType("Archived");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "Archived" ? "#0f67fd" : "transparent",
                    color: type === "Archived" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Archived
                </div>
              </div>

              {shownData?.length <= 0 ? (
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
              ) : (
                <table style={{ color: "#5e5e5e", border: "1px solid #ccc" }}>
                  <thead>
                    <tr>
                      {/* <th>Paper</th> */}
                      <th style={{ border: "1px solid #ccc" }}>
                        Corresponding Author
                      </th>
                      <th style={{ border: "1px solid #ccc" }}>Co-authors</th>
                      <th style={{ border: "1px solid #ccc" }}>Project</th>
                      {/* <th style={{ border: "1px solid #ccc" }}>File</th> */}
                      <th style={{ border: "1px solid #ccc" }}>
                        Download File
                      </th>
                      <th style={{ border: "1px solid #ccc" }}>
                        {type === "New" ? "Asses Paper" : "Assessment Result"}
                      </th>
                      <th style={{ border: "1px solid #ccc" }}>More Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shownData
                      .filter(({ assignedReviewers }) =>
                        (assignedReviewers as string[]).includes(authUser?.uid!)
                      )
                      .map((paper, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid #ccc" }}>
                            {paper?.paperUpdated && (
                              <Tooltip title="This paper was updated by the author">
                                <FontAwesomeIcon
                                  icon={faFlag}
                                  style={{
                                    color: "green",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            )}
                            {
                              authorsData?.find(
                                (e) => e?.id === paper.correspondingAuthor
                              )?.firstName
                            }{" "}
                            {
                              authorsData?.find(
                                (e) => e?.id === paper.correspondingAuthor
                              )?.lastName
                            }
                          </td>
                          <td style={{ border: "1px solid #ccc" }}>
                            {paper.authors.map((author: any) => {
                              return (
                                <p style={{ margin: "5px" }} key={author}>
                                  {authorsData?.find(
                                    (e) => e?.id === author
                                  ) ? (
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
                                  ) : (
                                    author
                                  )}
                                </p>
                              );
                            })}

                            {paper.authors?.length === 0 && (
                              <span style={{ color: "#ccc", fontSize: "15px" }}>
                                No Co-author(s)
                              </span>
                            )}
                          </td>
                          <td style={{ border: "1px solid #ccc" }}>
                            {
                              projects?.find((e) => e?.id === paper.projectId)
                                ?.title
                            }
                          </td>
                          {/* <td style={{ border: "1px solid #ccc" }}>{paper.fileId}</td> */}
                          <td style={{ border: "1px solid #ccc" }}>
                            <Button
                              variant="contained"
                              style={{ width: "100%", borderRadius: "0px" }}
                              disabled={downloadLoading === paper.paperId}
                              onClick={() => {
                                handleDownload(
                                  paper.userId,
                                  paper.projectId,
                                  paper.paperId
                                );
                              }}
                            >
                              {downloadLoading === paper.paperId
                                ? "Downloading"
                                : "Download"}
                            </Button>
                          </td>
                          <td style={{ border: "1px solid #ccc" }}>
                            {reviews?.find(
                              (row) => ((row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid))
                            )?.assesmentData?.recommendation ? (
                              <>
                                <div
                                  style={{
                                    background:
                                      reviews?.find(
                                        (row) => (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid)
                                      )?.assesmentData?.recommendation ===
                                      "Strong Accept"
                                        ? "#28a745"
                                        : reviews?.find(
                                            (row) =>
                                            (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid)
                                          )?.assesmentData?.recommendation ===
                                          "Accept"
                                        ? "#6f42c1"
                                        : reviews?.find(
                                            (row) =>
                                            (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid)
                                          )?.assesmentData?.recommendation ===
                                          "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "9px 5px",
                                    color: "#fff",
                                  }}
                                >
                                  {
                                    reviews?.find(
                                      (row) => (row?.paperId === paper?.paperId) && (row?.reviewerId === authUser?.uid)
                                    )?.assesmentData?.recommendation
                                  }
                                </div>
                              </>
                            ) : (
                              <Button
                                style={{ width: "100%", borderRadius: "0px" }}
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  navigate(`${paper?.paperId}`)
                                  handleAssesPaperClick(paper)
                                }}
                              >
                                Asses PAPER
                              </Button>
                           )}
                          </td>

                          <td style={{ border: "1px solid #ccc" }}>
                            <Button
                              onClick={() => {
                                setSelectedPaper(paper);
                                setShowInfoModal(true);
                              }}
                              style={{ width: "100%", borderRadius: "0px" }}
                              variant="contained"
                            >
                              More Info
                            </Button>
                          </td>
                          {/* <td>
    <select
      name="assignedReviewers"
      value={
        assignedReviewers[index]?.[
          assignedReviewers[index]?.length - 1
        ] || ""
      }
      onChange={(e) => handleAssignReviewer(e, index)}
    >
      <option value="">Select Reviewer</option>
      {authUser?.uid && (
        <option value={authUser?.uid!}>{authUser?.uid}</option>
      )}
    </select>
  </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}

              {showInfoModal && (
                <>
                  <StyledConferencePopupContainer>
                    <Backdrop
                      onClick={() => {
                        setShowInfoModal(false);
                      }}
                    />
                    <MoreInfo
                      project={selectedPaper}
                      onClose={() => {
                        setShowInfoModal(false);
                      }}
                      projects={projects}
                    />
                  </StyledConferencePopupContainer>
                </>
              )}

              {isPaperAssessmentFormOpen && (
                <StyledConferencePopupContainer>
                  <Backdrop onClick={handleClosePaperAssesmentFormPopup} />
                  <PaperAssessmentForm
                    // correspondingAuthor={selectedPaper.correspondingAuthor}
                    // projectId={selectedPaper.projectId}
                    selectedPaper={selectedPaper}
                    onClose={handleClosePaperAssesmentFormPopup}
                  />
                </StyledConferencePopupContainer>
              )}
            </div>
          </div>
        </>
      </div>
    </StyledSubmittedConferences>
  );
};

export default SubmittedConferences;
