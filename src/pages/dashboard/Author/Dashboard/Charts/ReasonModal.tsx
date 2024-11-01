import { StyledAssesmentView } from "../../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";

import Button from "@mui/material/Button";


const ReasonModal = ({ onClose, reason, title }) => {


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
          {title?.toUpperCase()}
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

          <p>{reason}</p>
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

export default ReasonModal;
