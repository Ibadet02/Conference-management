import React from "react";
import { StyledConference } from "../../../../styles/pages/dashboard/Author/AllConferences/Conference.styled";
import { ConferenceProps } from "../../../../types/dashboard/Author/props";
import useUpdateProject from "../../../../hooks/useUpdateProject"; // Replace 'path-to-your-hook' with the correct path

const Conference: React.FC<ConferenceProps> = React.memo(
  ({ conferenceInfo }) => {
    const {
      id,
      appliedStudents,
      canApply,
      title,
      topic,
      studentCapacity,
      deadline,
      description,
    } = conferenceInfo;
    const { updateProject, isUpdating, hasApplied } = useUpdateProject(); // Initializing the hook
    const handleApply = async () => {
      // Assuming you want to update the project when the Apply button is clicked
      try {
        // Logic to update project with userData
        await updateProject(id);
      } catch (error) {
        console.error("Error applying to project:", error);
      }
    };

    return (
      <StyledConference>
        <div>
          <span>{id}</span>
          <button onClick={handleApply} disabled={isUpdating || hasApplied}>
            {isUpdating ? "Applying..." : "Apply"}
            {hasApplied ? "Applied" : "Apply"}
          </button>
          <div>
            <h3>number of applicants</h3>
            <span>
              {appliedStudents.length}/{studentCapacity}
            </span>
          </div>
        </div>
      </StyledConference>
    );
  }
);

export default Conference;
