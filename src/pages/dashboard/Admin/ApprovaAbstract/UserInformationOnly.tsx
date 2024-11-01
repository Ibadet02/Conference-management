import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import {
  AssesmentViewProps,
  MoreInfoProps,
} from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/index";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserInformationOnly = ({ onClose, userId }) => {

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {

    async function fetchUserInfo(){
      try{

        const userDocRef = doc(db, `authorUsers`, userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserDetails(userData)
        } else {
          console.log("User document not found.");
        }
      } catch(e){
        console.error(e)
      }
    }

    if(userId){
      fetchUserInfo()
    }

  }, [userId])


  return (
    <StyledAssesmentView>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          position: 'relative',
        }}
      >
        <div style={{
          padding: "1rem", flex: 1, bottom: '20px', overflow: 'auto', height: '85%'}}>
        <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
            marginBottom: "15px",
          }}
        >
          AUTHOR INFORMATION
        </div>


        <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Full Name
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                 {
                  userDetails?.firstName ?
                  <>
                   {userDetails?.firstName} {userDetails?.lastName}
                  </>
                  :
                  userId
                 }
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
                  Email
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.email ? userDetails?.email : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>

                 {/* PHONE */}
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Phone
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.phone ? userDetails?.phone : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>
            
                 {/* SUPERVISOR */}
                 <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Supervisor
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.supervisor?.selectedOption ? userDetails?.supervisor?.selectedOption : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* AFFILIATION */}
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Affiliation
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.affiliation?.selectedOption ? userDetails?.affiliation?.selectedOption : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* ACADEMIC INTEREST */}
            
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Academic Interest
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.academicInterest?.selectedOption ? userDetails?.academicInterest?.selectedOption : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>

                 {/* PROGRAM */}
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Program
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {userDetails?.program?.selectedOption ? userDetails?.program?.selectedOption : <span style={{color: "red"}}>No Data</span>}
                </Typography>
              </AccordionDetails>
            </Accordion>

        </div>
        <div style={{padding: '1rem', position: 'absolute', bottom: '0px', flex: 1, width: '100%'}}>
        <Button variant="contained" style={{ width: "100%"}} onClick={onClose}>
          close
        </Button>
        </div>
      </div>
    </StyledAssesmentView>
  );
};

export default UserInformationOnly;
