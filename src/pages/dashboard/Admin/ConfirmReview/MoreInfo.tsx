import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import {
  AssesmentViewProps,
  MoreInfoProps,
} from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetPapersToBeReviewed from "../../../../hooks/useGetPapersToBeReviewed";
import useGetProjects from "../../../../hooks/useGetProjects";
import useGetAuthorsData from "../../../../hooks/useGetAuthorsData";
import useGetReviews from "../../../../hooks/useGetReviews";
import { useEffect, useState } from "react";
import useGetReviewersList from "../../../../hooks/useGetReviewersList";
import useGetFinalReviews from "../../../../hooks/useGetFinalReviews";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import useCreateFinalReviews from "../../../../hooks/useCreateFinalReviews";
import useUpdateFinalReviews from "../../../../hooks/useUpdateFinalReviews";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";


import { collection, doc, setDoc, query, where, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/index"; 

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useNotifyAuthor from "../../../../notify/notifyAuthor";

const MoreInfo: React.FC<MoreInfoProps> = ({
  project,
  onClose,
  handleOpenOtherModal,
}) => {
  const { downloadLastPdf, downloadUrl, error, downloadLoading } =
    useDownloadPDF();
  const { finalReviews, finalReviewsLoading } = useGetFinalReviews();
  const { reviews } = useGetReviews();
  const { reviewersList } = useGetReviewersList();
  const { toBeReviewed, toBeReviewedLoading } = useGetPapersToBeReviewed();
  const { projects } = useGetProjects();
  const { authorsData } = useGetAuthorsData();
  const [paperReviewerIds, setpaperReviewerIds] = useState([]);
  const [paperReviews, setpaperReviews] = useState([]);

  const handleDownload = (
    correspondingAuthorId: string,
    projectId: string,
    paperId: string
  ) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };

  useEffect(() => {
    setpaperReviewerIds(
      reviews
        .filter((rev) => rev.paperId === project.paperId)
        .map((rev: any) => rev.reviewerId)
    );

    setpaperReviews(reviews.filter((rev) => rev.paperId === project.paperId));
  }, [reviews]);

  function getColor(value) {
    if (value >= 8) {
      return "#28a745"; // green
    } else if (value >= 5) {
      return "#fd7e14"; // orange
    } else {
      return "#dc3545"; // red
    }
  }

  // ________________________________________________________

  const { createFinalReviews, iDLoading } = useCreateFinalReviews();

  const [isAssesmentViewOpen, setIsAssesmentViewOpen] =
    useState<boolean>(false);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  const [finalAssessments, setFinalAssessments] = useState<{
    [key: string]: string;
  }>({});

  const { updateFinalReview, updating } = useUpdateFinalReviews();

  const { submittedPapers } = useGetSubmittedPapers();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleFinalAssessmentChange = (
    paperId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFinalAssessments((prevState) => ({
      ...prevState,
      [paperId]: event.target.value,
    }));
  };
  const handleCloseAssesmentView = () => {
    setIsAssesmentViewOpen(false);
  };

  const handleOpenAssesmentView = (paper: any) => {
    setSelectedPaper(paper);
    setIsAssesmentViewOpen(true);
  };
  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };

  const [type, setType] = useState("New");

  const uniqueRows = toBeReviewed?.filter(
    (row, index, self) =>
      index === self.findIndex((r) => r.paperId === row.paperId)
  );

  const [finalRevs, setFinalRevs] = useState([]);

  useEffect(() => {
    setFinalRevs(finalReviews);
  }, [finalReviews]);

  return (
    <StyledAssesmentView>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
            marginBottom: "15px",
          }}
        >
          PAPER INFO
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px",
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Conference Title
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {projects?.find((e) => e?.id === project?.projectId)?.title}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              color: "#5e5e5e",
              background: "#fff",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Corresponding Author
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  authorsData?.find(
                    (e) => e?.id === project.correspondingAuthor
                  )?.firstName
                }{" "}
                {
                  authorsData?.find(
                    (e) => e?.id === project.correspondingAuthor
                  )?.lastName
                }
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              color: "#5e5e5e",
              background: "#fff",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Co Author(s)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {project.authors.map((author: any) => {
                  return (
                    <div key={author} style={{ margin: "5px" }}>
                      {authorsData?.find((e) => e?.id === author)?.firstName}{" "}
                      {authorsData?.find((e) => e?.id === author)?.lastName}
                    </div>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              color: "#5e5e5e",
              background: "#fff",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Assigned Reviewer(s)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {project.assignedReviewers.map((reviewer: any) => {
                  return (
                    <p key={reviewer}>
                      <Button
                        variant="outlined"
                        style={{ width: "100%", borderRadius: "0px" }}
                        disabled={
                          reviewer !==
                          paperReviewerIds.find(
                            (reviewerId) => reviewerId === reviewer
                          )
                        }
                        onClick={() =>
                          handleOpenOtherModal(
                            paperReviews.find(
                              (review) => review.reviewerId === reviewer
                            )
                          )
                        }
                      >
                        {
                          reviewersList?.find((e) => e?.id === reviewer)
                            ?.firstName
                        }{" "}
                        {
                          reviewersList?.find((e) => e?.id === reviewer)
                            ?.lastName
                        }
                      </Button>
                    </p>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              color: "#5e5e5e",
              background: "#fff",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                File
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Button
                  variant="contained"
                  disabled={downloadLoading === project.paperId}
                  style={{ width: "100%", borderRadius: "0px" }}
                  onClick={() =>
                    handleDownload(
                      project.userId,
                      project.projectId,
                      project.paperId
                    )
                  }
                >
                  {downloadLoading === project.paperId
                    ? "Downloading"
                    : "Download"}
                </Button>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {finalReviews?.find((e) => project?.paperId === e?.paperId)
            ?.finalResult && (
            <Accordion
              style={{
                background:
                  finalReviews?.find((e) => project?.paperId === e?.paperId)
                    ?.finalResult === "Strong Accept"
                    ? "#28a745"
                    : finalReviews?.find((e) => project?.paperId === e?.paperId)
                        ?.finalResult === "Accept"
                    ? "#6f42c1"
                    : finalReviews?.find((e) => project?.paperId === e?.paperId)
                        ?.finalResult === "Weak Accept"
                    ? "#fd7e14"
                    : "#dc3545",
                color: "#fff",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Final Assessment
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#fff" }}>
                  {
                    finalReviews?.find((e) => project?.paperId === e?.paperId)
                      ?.finalResult
                  }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            background: "#fff",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="final-assessment-label">
                Final Assessment
              </InputLabel>
              <Select
                style={{ width: "100%", borderRadius: "0px" }}
                labelId="final-assessment-label"
                // defaultValue={
                //   finalReviews?.find((e) => row?.paperId === e?.paperId)?.finalResult
                // }
                id="final-assessment-select"
                label="Final Assessment"
                name="finalAssessment"
                value={finalAssessments[project.paperId]}
                onChange={(e) =>
                  handleFinalAssessmentChange(project.paperId, e)
                }
              >
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="Reject">Reject</MenuItem>
                <MenuItem value="Weak Accept">Weak Accept</MenuItem>
                <MenuItem value="Accept">Accept</MenuItem>
                <MenuItem value="Strong Accept">Strong Accept</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {finalReviews?.find((e) => project?.paperId === e?.paperId)
            ?.finalResult ? (
            updating ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%", borderRadius: "0px" }}
              >
                <span>Updating</span>
              </LoadingButton>
            ) : (
              <Button
                style={{ width: "100%", borderRadius: "0px" }}
                disabled={!finalAssessments[project.paperId] || updating}
                // disabled={iDLoading===row?.projectId || finalReviewsLoading || finalReviews?.some((e) => row?.paperId === e?.paperId)}
                variant="contained"
                color="success"
                onClick={async () => {
                  const finalReviewData = {
                    ...project,
                    reviews: paperReviews,
                    finalResult: finalAssessments[project.paperId],
                  };
                  updateFinalReview(
                    finalReviewData,
                    "finalReviews",
                    project.id
                  );

                  
      const userDocRef=doc(db, "authorUsers", project?.userId)
      await updateDoc(userDocRef, {
        actualState: 5,
        reviewResult: finalAssessments[project.paperId],
        paperUpdated: null
      })

      await useNotifyAuthor(project?.userId, "Your results were updated", `You final result for your submitted paper is ${finalAssessments[project.paperId]}`)
     

      onClose();

                }}
              >
                Update
              </Button>
            )
          ) : (
            iDLoading === project?.projectId ?
            
            <LoadingButton
            color="secondary"
            loading={true}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            style={{ width: "100%", borderRadius: "0px" }}
          >
            <span>Saving</span>
          </LoadingButton>
          :
            <Button
              style={{ width: "100%", borderRadius: "0px" }}
              disabled={
                iDLoading === project?.projectId ||
                finalReviewsLoading ||
                finalReviews?.some((e) => project?.paperId === e?.paperId)
              }
              variant="contained"
              color="success"
              onClick={async () => {
                const finalReviewData = {
                  ...project,
                  reviews: paperReviews,
                  finalResult: finalAssessments[project.paperId],
                };
                createFinalReviews(finalReviewData, "finalReviews", project.id);

                 
      const userDocRef=doc(db, "authorUsers", project?.userId)
      await updateDoc(userDocRef, {
        actualState: 5,
        reviewResult: finalAssessments[project.paperId],
        paperUpdated: null
      })

      await useNotifyAuthor(project?.userId, "You received results", `You final result for your submitted paper is ${finalAssessments[project.paperId]}`)
      
      onClose();
              }}
            >
              {finalReviews?.some((e) => project?.paperId === e?.paperId)
                ? "Sent"
                : "Send"}
            </Button>
          )}
        </div>

        <Button variant="contained" style={{ width: "100%" }} onClick={onClose}>
          close
        </Button>
      </div>
    </StyledAssesmentView>
  );
};

export default MoreInfo;
