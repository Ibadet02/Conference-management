import { useEffect } from "react";
import { StyledMyConference } from "../../../../styles/pages/dashboard/Author/MyConference";
import MyConferencesChart from "./Charts/MyConferencesChart";
import MyResultsChart from "./Charts/MyResultsChart";
import AllConferencesChart from "./Charts/AllConferencesChart";

const MyConference = () => {
  
  return (
    <StyledMyConference style={{overflow: 'hidden'}}>
      <div style={{flex: 1, padding: '2rem', overflow: 'auto', height: '100%'}}>

          <div style={{display: 'flex', marginBottom: '20px', gap: '20px', flexWrap: 'wrap'}}>

            <MyConferencesChart />

            <AllConferencesChart />


          </div>
            <MyResultsChart />



      </div>
    </StyledMyConference>
  );
};

export default MyConference;
