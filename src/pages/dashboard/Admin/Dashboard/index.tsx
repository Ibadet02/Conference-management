import { useEffect } from "react";
import { StyledMyConference } from "../../../../styles/pages/dashboard/Author/MyConference";
import AllConferencesChart from "./Charts/AllConferencesChart";
import FinalReviewedChart from "./Charts/FinalReviewedChart";
import ToBeReviewedChart from "./Charts/ToBeReviewedChart";

const AdminDashboard = () => {
  
  return (
    <StyledMyConference style={{overflow: 'hidden'}}>
      <div style={{flex: 1, padding: '2rem', overflow: 'auto', height: '100%'}}>

          <div style={{display: 'flex', marginBottom: '20px', gap: '20px', flexWrap: 'wrap'}}>

          <ToBeReviewedChart />
    <FinalReviewedChart />

          </div>


            <AllConferencesChart />


      </div>
    </StyledMyConference>
  );
};

export default AdminDashboard;
