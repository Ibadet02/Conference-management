import { useEffect } from "react";
import { StyledMyConference } from "../../../../styles/pages/dashboard/Author/MyConference";
import useUserAppliedProjects from "../../../../hooks/useUserAppliedProjects"; // Adjust the path
import ReadOnlyUserData from "./ReadOnlyUserData";
import AppliedProjectData from "./AppliedProjectData";
import useUserData from "../../../../hooks/useUserData";

const Profile = () => {
  const userDataElements = useUserData();
  return (
    <StyledMyConference style={{overflow: 'hidden'}}>
      <div style={{flex: 1, padding: '1rem', overflow: 'auto', height: '100%'}}>
      
          <ReadOnlyUserData userDataElements={userDataElements} />


      </div>
    </StyledMyConference>
  );
};

export default Profile;
