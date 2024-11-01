import React, { useEffect, useState } from "react";
import { StyledConferencePopup } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopup.styled";
import { ConferencePopupProps } from "../../../../types/dashboard/Author/props";
import { StyledAccordion } from "../../../../styles/pages/dashboard/Author/AllConferences/Accordion.styled";
import Button from "@mui/material/Button";
import { Timestamp } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuthentication from "../../../../hooks/useAuthentication";
import { db } from "../../../../firebase/index";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";


import {
  collection,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore";

const ConferencePopup: React.FC<ConferencePopupProps> = ({
  project,
  onClose,
  handleApply,
  isUpdating,
  hasApplied,
}) => {
    
  const [disabled, setDisabled] = useState(false);

  const dateToString = (date: Date | null) => {
    return date && date instanceof Timestamp
      ? date.toDate().toDateString()
      : "No Start Date";
  };
  const authUser = useAuthentication();


  const projectHasApplied = project.appliedStudents.includes(
    authUser?.uid!
  );

  const [loading, setLoading] = useState(false);


  async function deleteConference(){
    try{
      setLoading(true)
      const docRef = doc(db, "projects", project?.id)
      await deleteDoc(docRef)

    }catch(e){
      console.error(e)
    } finally{
      setLoading(false)
      onClose()
    }

  }


  return (
    <StyledConferencePopup>
      {project && (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "auto", height: "100%", padding: "1rem" }}>
            <div
              style={{
                color: "#1e1e1e",
                fontWeight: "bold",
                fontSize: "2rem",
                flex: 1,
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              Conference Information
            </div>

            {/* <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Project ID
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {project?.id}
                </Typography>
              </AccordionDetails>
            </Accordion> */}

            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Project Title
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {project?.title}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Project Topic
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {project?.topic}
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Start Date
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {dateToString(project?.deadline?.startDate)}
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  End Date
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  
                {dateToString(project?.deadline?.endDate)}
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  
                {project?.description}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {
              localStorage.getItem("userRole") === "admin" &&
              <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Delete Conference
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

              {loading ? (
            <LoadingButton
              color="secondary"
              loading={true}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              style={{ width: "100%" }}
            >
              <span>Deleting Conference</span>
            </LoadingButton>
          ) : (

                <Button onClick={deleteConference} color="error" style={{width: '100%'}} variant="contained">
                  Delete
                </Button>
          )}

              </AccordionDetails>
            </Accordion>
            }

            {/* <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Regd./Limit
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                {`${project?.appliedStudents.length}/${project?.studentCapacity}`}
                </Typography>
              </AccordionDetails>
            </Accordion> */}

          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "10px",
              padding: "1rem 0rem",
              justifyContent: "flex-end",
              width: '100%',
            }}
          >
            <Button variant="contained" color="error" onClick={onClose}>
              Close
            </Button>

            {/* <Button
              color="success"
              variant="contained"
              onClick={() => {
                setDisabled(true)
                handleApply(project.id)}}
              disabled={isUpdating || projectHasApplied || disabled}
            >
              {isUpdating
                ? "Registering"
                : (projectHasApplied || disabled)
                ? "Registered"
                : "Register"}
            </Button> */}
          </div>
          </div>

        </div>
      )}
    </StyledConferencePopup>
  );
};

export default ConferencePopup;
