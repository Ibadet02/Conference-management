import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import {
  AssesmentViewProps,
  MoreInfoProps,
} from "../../../../types/dashboard/Admin/props";
import Button from "@mui/material/Button";


const AbstractOnly: React.FC<MoreInfoProps> = ({ onClose, project }) => {


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
          ABSTRACT
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px",
            padding: '1rem', background: '#eee', borderRadius: '5px'
          }}
        >

          <p>{project.abstract}</p>
        </div>
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

export default AbstractOnly;
