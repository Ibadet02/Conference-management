import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import {
  AssesmentViewProps,
  MoreInfoProps,
} from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";

import { collection, doc, setDoc, query, where, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/index"; 

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetPapersToBeReviewed from "../../../../hooks/useGetPapersToBeReviewed";
import useGetProjects from "../../../../hooks/useGetProjects";
import useGetAuthorsData from "../../../../hooks/useGetAuthorsData";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { useEffect, useState } from "react";
import useGetUsers from "../../../../hooks/useGetUsers";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useUpdatePapersToBeReviewed from "../../../../hooks/useUpdatePapersToBeReviewed";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import TextField from "@mui/material/TextField";

import toast from 'react-hot-toast';
import useNotifyAuthor from "../../../../notify/notifyAuthor";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const MoreInfo: React.FC<MoreInfoProps> = ({ onClose, project }) => {
  const { toBeReviewed, toBeReviewedLoading } = useGetPapersToBeReviewed();
  const { projects } = useGetProjects();
  const { authorsData } = useGetAuthorsData();
  const [note, setNote] = useState(project?.note ?  project?.note : "")
  const [paperUpdateRequest, setPaperUpdateRequest] = useState(project?.paperUpdateRequest ? project?.paperUpdateRequest : false)
  const [prevData, setPrevData] = useState(project.prevData ? project.prevData : {});

  function getColor(value) {
    if (value >= 8) {
      return "#28a745"; // green
    } else if (value >= 5) {
      return "#fd7e14"; // orange
    } else {
      return "#dc3545"; // red
    }
  }

    // Function to check if two arrays are equal
    const arraysEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    };
  
    // Function to check if two strings are equal
    const stringsEqual = (str1, str2) => str1 === str2;

  
  const { downloadLastPdf, downloadUrl, error, downloadLoading } =
    useDownloadPDF();

  
  const handleDownload = (
    correspondingAuthorId: string,
    projectId: string,
    paperId: string
  ) => {
    downloadLastPdf(correspondingAuthorId, projectId, paperId);
  };

  // ____________________________________________________________

  const { loading, submittedPapers } = useGetSubmittedPapers();
  const [submitting, setSubmitting] = useState(false);
  const [rejectSubmitting, setRejectSubmitting] = useState(false);

  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useUpdatePapersToBeReviewed();

  const handleSendForReview = async (
    paperData: any,
    assignedReviewersData: any
  ) => {
    setSubmitting(paperData?.projectId);
    try {
      // Extract only the IDs from assignedReviewersData
      const assignedReviewersIds = assignedReviewersData.map(
        (reviewer: any) => reviewer.id
      );

      // Construct the data to send
      const dataToSend = {
        ...paperData,
        assignedReviewers: assignedReviewersIds, // Assign only the IDs
      };

      // Call the function to create papers to be reviewed
      await createPapersToBeReviewed(
        dataToSend,
        "toBeReviewed",
        project?.paperId
      );
      setPrevData({});
        setPaperUpdateRequest(false);
      console.log("Paper sent for review successfully!");
      setSubmitting("");
    } catch (error) {
      console.error("Error sending paper for review: ", error);
      setSubmitting("");
    }
  };

  const handleApprove = async() => {
    setSubmitting(true);
    try{
    const paperSubmissionsRef = collection(db, "paperSubmissions");
const paperDoc = doc(paperSubmissionsRef, project.paperId);

if ((await getDoc(paperDoc)).exists()) {
    await updateDoc(paperDoc, {
      abstractApproved: true,
      adminResponseMade: true,
      abstractUpdated: false,
      note: note
    });

    const userDocRef=doc(db, "authorUsers", project?.userId)
    await updateDoc(userDocRef, {
      actualState: 2,
      myStatus: "abstract approved",
      note: note
    })

    await useNotifyAuthor(project?.userId, "Abstract Approved", "Your abstract was approved. Please submit your paper")

    toast.success("Abstract Approved")
    
    setSubmitting(false);
} else {
    console.log("Document does not exist already:", project.paperId);
    setSubmitting(false);
}
} catch(e){
  console.error(e);
  setSubmitting(false);
} finally{
  onClose()
}
  }

  
  const handleReject = async() => {
    setRejectSubmitting(true);
    try{
    const paperSubmissionsRef = collection(db, "paperSubmissions");
const paperDoc = doc(paperSubmissionsRef, project.paperId);

if ((await getDoc(paperDoc)).exists()) {
    await updateDoc(paperDoc, {
      abstractApproved: false,
      adminResponseMade: true,
      abstractUpdated: false,
      note: note
    });

    const userDocRef=doc(db, "authorUsers", project?.userId)
    await updateDoc(userDocRef, {
      actualState: 1,
      myStatus: "abstract rejected",
      note: note
    })
    
    await useNotifyAuthor(project?.userId, "Abstract Rejected", "Your abstract was rejected. Please update you abstract and re-send for approval.")

    toast("Abstract Rejected")
    setRejectSubmitting(false);
} else {
    console.log("Document does not exist already:", project.paperId);
    setRejectSubmitting(false);
}
} catch(e){
  console.error(e);
  setRejectSubmitting(false);
} finally{
  onClose()
}
  }

  const [blocking, setBlocking] = useState(false);
  const [blockingReason, setBlockingReason] = useState(project?.blockingReason ?  project?.blockingReason : "");

  const handleBlock = async() => {
    setBlocking(true);
    try{
      const paperSubmissionsRef = collection(db, "paperSubmissions");
  const paperDoc = doc(paperSubmissionsRef, project.paperId);
  
  if ((await getDoc(paperDoc)).exists()) {
      await updateDoc(paperDoc, {
        // abstractApproved: null,
        // adminResponseMade: true,
        // abstractUpdated: false,
        blocked: true,
        blockingReason: blockingReason
      });
  
      const userDocRef=doc(db, "authorUsers", project?.userId)
      await updateDoc(userDocRef, {
        // actualState: 2,
        // myStatus: "blocked",
        blockingReason: blockingReason,
        blocked: true
      })

      await useNotifyAuthor(project?.userId, "Abstract Blocked", "Your abstract was blocked. You can no longer participate in current conference.")


      toast.success("Author Blocked")
      
      setBlocking(false);
  } else {
      console.log("Document does not exist already:", project.paperId);
      setBlocking(false);
  }
  } catch(e){
    console.error(e);
    setBlocking(false);
  } finally{
    onClose()
  }
  }

  
  const handleUnBlock = async() => {
    setBlocking(true);
    try{
      const paperSubmissionsRef = collection(db, "paperSubmissions");
  const paperDoc = doc(paperSubmissionsRef, project.paperId);
  
  if ((await getDoc(paperDoc)).exists()) {
      await updateDoc(paperDoc, {
        // abstractApproved: null,
        // adminResponseMade: null,
        // abstractUpdated: false,
        blocked: null,
        blockingReason: null
      });
  
      const userDocRef=doc(db, "authorUsers", project?.userId)
      await updateDoc(userDocRef, {
        // actualState: 1,
        // myStatus: "blocked",
        blockingReason: null,
        blocked: false
      })

      await useNotifyAuthor(project?.userId, "Abstract Unblocked", "Your abstract was Unblocked. You can now longer participate in current conference.")


      toast.success("Author Unblocked")
      
      setBlocking(false);
  } else {
      console.log("Document does not exist already:", project.paperId);
      setBlocking(false);
  }
  } catch(e){
    console.error(e);
    setBlocking(false);
  } finally{
    onClose()
  }
  }

  const [type, setType] = useState("New");
  const [shownData, setShownData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);

  const uniqueprojects = submittedPapers?.filter(
    (project, index, self) =>
      index === self.findIndex((r) => r?.paperId === project?.paperId)
  );

  useEffect(() => {
    const item = toBeReviewed?.find((e) => project?.paperId === e?.paperId);
    setAssignedReviewers(
      users?.filter((e) => item?.assignedReviewers?.some((f) => e?.id === f))
    );
  }, [toBeReviewed, users]);

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
                {projects?.find((e) => e?.id === project.projectId)?.title}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Corresponding Author  
                {
                  (prevData?.correspondingAuthor && !stringsEqual(project.correspondingAuthor, prevData?.correspondingAuthor)) &&
                  <span style={{marginLeft: '5px', color: 'red'}}>*</span>
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {
                  (prevData?.correspondingAuthor && !stringsEqual(project.correspondingAuthor, prevData?.correspondingAuthor)) &&
                  <span >
                    <span style={{color: 'red'}}><b>Previous: </b>
                  {
                  authorsData?.find(
                    (e) => e?.id === prevData?.correspondingAuthor
                  )?.firstName
                }{" "}
                {
                  authorsData?.find(
                    (e) => e?.id === prevData?.correspondingAuthor
                  )?.lastName
                }
                </span>
                <br/> 
                <br/> 

                <b>New: </b>
                </span>
                }
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

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Co Author(s) {
                  (prevData?.authors && !arraysEqual(project.authors, prevData?.authors)) &&
                  <span style={{marginLeft: '5px', color: 'red'}}>*</span>
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>

              {
                  (prevData?.authors && !arraysEqual(project.authors, prevData?.authors)) &&
                  <span >
                    <span style={{color: 'red'}}><b>Previous: </b>
                    {prevData?.authors.map((author: any, index) => {
                  return (
                    <div key={index} style={{ margin: "5px" }}>
                      {authorsData?.find((e) => e?.id === author)?.firstName}{" "}
                      {authorsData?.find((e) => e?.id === author)?.lastName}
                    </div>
                  );
                })}
                </span>
                <br/> 

                <b>New: </b>
                </span>
                }


                {project.authors.map((author: any, index) => {
                  return (
                    <div key={index} style={{ margin: "5px" }}>
                      {authorsData?.find((e) => e?.id === author)?.firstName}{" "}
                      {authorsData?.find((e) => e?.id === author)?.lastName}
                    </div>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Academic Selection {
                  (prevData?.academicInterest && !stringsEqual(project.academicInterest, prevData?.academicInterest)) &&
                  <span style={{marginLeft: '5px', color: 'red'}}>*</span>
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                
              {
                  (prevData?.academicInterest && !stringsEqual(project.academicInterest, prevData?.academicInterest)) &&
                  <span >
                    <span style={{color: 'red'}}><b>Previous: </b>
                  {
                  prevData?.academicInterest
                }
                </span>
                <br/> 
                <br/> 

                <b>New: </b>
                </span>
                }{project?.academicInterest}</Typography>


            </AccordionDetails>
          </Accordion>



          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Abstract {
                  (prevData?.abstract && !stringsEqual(project.abstract, prevData?.abstract)) &&
                  <span style={{marginLeft: '5px', color: 'red'}}>*</span>
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                
              {
                  (prevData?.abstract && !stringsEqual(project.abstract, prevData?.abstract)) &&
                  <span >
                    <span style={{color: 'red'}}><b>Previous: </b>
                  {
                  prevData?.abstract
                }
                </span>
                <br/> 
                <br/> 

                <b>New: </b>
                </span>
                }{project?.abstract}</Typography>


            </AccordionDetails>
          </Accordion>



          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Block / Unblock Author
              </Typography>
            </AccordionSummary>
            <AccordionDetails>

            <Typography sx={{ width: "100%", flexShrink: 0, marginBottom: '10px' }}>
              Blocking the author prevents him/her from sending any further abstracts for current conference.
            </Typography>

            <TextField disabled={project?.blocked} style={{marginBottom: '10px', width: '100%'}} label="Blocking Reason" placeholder="Enter blocking reason here" multiline={true} rows={2} value={blockingReason} onChange={(e) => {setBlockingReason(e.target.value)}} />

                {
                  project?.blocked ?
                  <>
                              {blocking ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%", borderRadius: "0px" }}
              >
                <span>Unblocking Author</span>
              </LoadingButton>
            ) : (
            <Button
                color="success"
                variant="contained"
                style={{ borderRadius: "0px", width: "100%" }}
                onClick={() => handleUnBlock()}
                startIcon={<LockOpenIcon />}
              >
                Unblock Author
              </Button>
            )
            }

                  </>
                  :
                  <>

            {blocking ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%", borderRadius: "0px" }}
              >
                <span>Blocking Author</span>
              </LoadingButton>
            ) : (
            <Button
              disabled={project?.blocked || (!blockingReason || blockingReason==="")}
                color="error"
                variant="contained"
                style={{ borderRadius: "0px", width: "100%" }}
                onClick={() => handleBlock()}
  startIcon={<LockIcon />}
              >
                {project?.blocked ? "Author Blocked" : "Block Author"}
              </Button>
            )
            }
            
          </>
        }


            </AccordionDetails>
          </Accordion> */}

          {/* <Accordion
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon  />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                 File
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography >
                <div>{project?.fileId}</div>
                <Button style={{marginTop: '10px'}} variant="contained">Download</Button>
                </Typography>
              </AccordionDetails>
            </Accordion> */}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
            padding: "20px 10px",
            background: "#fff",
          }}
        >
          <TextField label="Note to author" value={note} onChange={(e) => setNote(e.target.value)} style={{width: '100%'}} multiline={true} rows={2} />
          <div style={{display: 'flex', gap: '10px', width: '100%'}}>
            <div style={{flex: 1}}>
            {rejectSubmitting ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%", borderRadius: "0px" }}
              >
                <span>Rejecting</span>
              </LoadingButton>
            ) : (
              <Button
              disabled={((project?.adminResponseMade && project?.abstractApproved === false) && !(project?.abstractUpdated)) || project?.blocked}
                color="error"
                variant="contained"
                style={{ borderRadius: "0px", width: "100%" }}
                onClick={() => handleReject()}
              >
                {((project?.adminResponseMade && project?.abstractApproved === false)) ? "Rejected" : "Reject"}
              </Button>
            )}
            
            </div>
            <div style={{flex: 1}}>
            {submitting ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%", borderRadius: "0px" }}
              >
                <span>Approving</span>
              </LoadingButton>
            ) : (
              <Button
                color="success"
                disabled={((project?.adminResponseMade && project?.abstractApproved) && !(project?.abstractUpdated)) || project?.blocked}
                variant="contained"
                style={{ borderRadius: "0px", width: "100%" }}
                onClick={() => handleApprove()}
              >
                {((project?.adminResponseMade && project?.abstractApproved)) ? "Approved" : "Approve"}
              </Button>
            )}
            
            </div>
          </div>
        </div>

        <Button variant="contained" style={{ width: "100%" }} onClick={onClose}>
          close
        </Button>
      </div>
    </StyledAssesmentView>
  );
};

export default MoreInfo;
