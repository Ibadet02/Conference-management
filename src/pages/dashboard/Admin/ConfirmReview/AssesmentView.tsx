import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import { AssesmentViewProps } from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AssesmentView: React.FC<AssesmentViewProps> = ({
  onClose,
  paperAssesment,
}) => {
    const assesmentData = paperAssesment?.assesmentData;

    function getColor(value) {
      if (value >= 8) {
          return '#28a745'; // green
      } else if (value >= 5) {
          return '#fd7e14'; // orange
      } else {
          return '#dc3545'; // red
      
      }}

  return (
    <StyledAssesmentView>
      <div style={{width: '100%', height: '100%', padding: '1rem', overflow: 'auto'}}>
        
      <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
            marginBottom: '15px'
          }}
        >
          REVIEW
        </div>
        <div style={{flex: 1, width: '100%', display: 'flex', flexDirection: 'column',  marginBottom: '15px'}}>


        <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.topic), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',  color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Topic Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
        <h4>Topic Score: {assesmentData?.topic}</h4>
        <h4>Topic Comment: {assesmentData?.topicComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.contribution), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',   color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Contribution Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Contribution Score: {assesmentData?.contribution}</h4>
        <h4>Contribution Comment: {assesmentData?.contributionComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.academicQuality), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Academic Quality Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Academic Quality Score: {assesmentData?.academicQuality}</h4>
        <h4>Academic Quality Comment: {assesmentData?.academicQualityComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.verificationOfResults), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Verification of Results Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Verification of Results Score: {assesmentData?.verificationOfResults}</h4>
        <h4>Verification of Results Comment: {assesmentData?.verificationOfResultsComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.novelty), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Novelty Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Novelty Score: {assesmentData?.novelty}</h4>
        <h4>Novelty Comment: {assesmentData?.noveltyComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData?.literatureReviewAndBibliography), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Literature Review and Bibliography Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Literature Review and Bibliography: {assesmentData.literatureReviewAndBibliography}</h4>
        <h4>Literature Review and Bibliography Comment: {assesmentData.literatureReviewAndBibliographyComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData.language), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Language Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Language: {assesmentData.language}</h4>
        <h4>Language Comment: {assesmentData.languageComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{color: '#5e5e5e', background: getColor(assesmentData.styleAndFormat), boxShadow: '0px 5px 10px rgba(0,0,0,0.1)', color: '#fff'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: '#fff'}} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Style and Format Review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#fff" }}>
                
                <h4>Style and Format: {assesmentData.styleAndFormat}</h4>
        <h4>Style and Format Comment: {assesmentData.styleAndFormatComment}</h4>
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            <Accordion
              style={{color: '#5e5e5e', background: "#fff", boxShadow: '0px 5px 10px rgba(0,0,0,0.1)'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon  />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Summary
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography >
                {assesmentData.summary}
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            <Accordion
              style={{color: '#5e5e5e', background: "#fff", boxShadow: '0px 5px 10px rgba(0,0,0,0.1)'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Comments for Organizing Committee
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography >
                {assesmentData.commentsForOrganizingCommittee}
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            

     

      <div style={{
                                    background:
                                    assesmentData?.recommendation === "Strong Accept"
                                        ? "#28a745"
                                        : assesmentData?.recommendation === "Accept"
                                        ? "#6f42c1"
                                        : assesmentData?.recommendation === "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "10px 20px",
                                    color: "#fff",
                                  }}>
                        <h4>Recommendation: {assesmentData.recommendation}</h4>
                    </div>
      {/* <div style={{color: '#5e5e5e', background: '#eee', boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',  padding: '10px 20px'}}>
        <h4>Recommendation: {assesmentData.recommendation}</h4>
      </div> */}
      </div>
      
      <Button variant="contained" style={{width: '100%'}} onClick={onClose}>close</Button>

      </div>
      
    </StyledAssesmentView>
  );
};

export default AssesmentView;
