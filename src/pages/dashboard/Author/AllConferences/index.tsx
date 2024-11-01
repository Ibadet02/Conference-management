import useGetProjects from "../../../../hooks/useGetProjects";
import { StyledAllConferences } from "../../../../styles/pages/dashboard/Author/AllConferences/index.styled";
import { ProjectDataTypeWithIds } from "../../../../types/hooks/types";
import Conference from "./Conference";
import ConferencesTable from "./ConferencesTable";
import conferenceMeeting from '../../../../assets/images/conferenceMeeting.svg';

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;
  return (
    <StyledAllConferences style={{ overflow: "hidden" }}>
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflow: "auto",
          height: "100%",
        }}
      >
          <ConferencesTable projects={projects} loading={loading} />
      </div>
    </StyledAllConferences>
  );
};

export default AllConferences;
