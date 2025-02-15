import React from "react";
import { AppliedProjectDataProps } from "../../../../types/dashboard/Author/props";
import PaperSubmissionInputs from "./PaperSubmissionInputs";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditPaperSubmissionInputs from "./EditPaperSubmissionInputs";
import PaperInputsArchived from "./PaperInputsArchived";

const AppliedProjectData: React.FC<AppliedProjectDataProps> = ({
  projectData,
  projectId,
  matchedItem,
  type
}) => {


  console.log("type", type)

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <>
    {
      type==="New" ?
      <EditPaperSubmissionInputs projectData={projectData} projectId = {projectId} matchedItem={matchedItem} />
      :
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography sx={{ width: '33%', flexShrink: 0 }}>
      {projectData.title}
      </Typography>
      {/* <Typography sx={{ color: 'text.secondary' }}>{projectData.description}</Typography> */}
    </AccordionSummary>
    <AccordionDetails>
        <PaperInputsArchived projectData={projectData} projectId = {projectId} matchedItem={matchedItem} />

    </AccordionDetails>
  </Accordion>
}
    </>
  );
};

export default AppliedProjectData;