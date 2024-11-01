import React, { useEffect, useState } from "react";
import { ConferencesTableProps } from "../../../../types/dashboard/Author/props";
import { StyledConferencesTable } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencesTable.styled";
import { Timestamp } from "firebase/firestore";
import useUpdateProject from "../../../../hooks/useUpdateProject";
import { ProjectDataTypeWithIds } from "../../../../types/hooks/types";
import ConferencePopup from "./ConferencePopup";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import useAuthentication from "../../../../hooks/useAuthentication";
import Button from "@mui/material/Button";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import conferenceMeeting from "../../../../assets/images/conferenceMeeting.jpg";

const ConferencesTable: React.FC<ConferencesTableProps> = ({ projects }) => {
  const { updateProject, isUpdating, hasApplied } = useUpdateProject(); // Initializing the hook
  
  const [type, setType]= useState("New");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const authUser = useAuthentication();
  const handleApply = async (id: string) => {
    // Assuming you want to update the project when the Apply button is clicked
    try {
      // Logic to update project with userData
      await updateProject(id);
    } catch (error) {
      console.error("Error applying to project:", error);
    }
  };
  const [selectedProject, setSelectedProject] =
    useState<ProjectDataTypeWithIds | null>(null);
  const [isConferencePopupOpen, setIsConferencePopupOpen] =
    useState<boolean>(false);
  const handleMoreInfoClick = (project: ProjectDataTypeWithIds) => {
    setSelectedProject(project);
    setIsConferencePopupOpen(true);
  };
  const handleCloseConferencePopup = () => {
    setIsConferencePopupOpen(false);
  };
  const maxTableContentLength = Infinity;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  const dateToString = (date: Date | null) => {
    return date && date instanceof Timestamp
      ? date.toDate().toDateString()
      : "No Start Date";
  };

  const [latestProject, setLatestProject] = useState([]);
  const [remainingProjects, setRemainingProjects] = useState([]);

  useEffect(() => {
    if (projects?.length > 0) {
      const { latest, remaining } = projects.reduce(
        (acc, project) => {
          const projectDate = project.createdOn.toDate(); // Convert Firestore timestamp to JavaScript Date object
  
          if (!acc.latest || projectDate > acc.latest.createdOn) {
            if (acc.latest) {
              acc.remaining.push(acc.latest); // Push the current latest project to remaining
            }
            acc.latest = { ...project, createdOn: projectDate }; // Update the latest project with the JavaScript Date object
          } else {
            acc.remaining.push({ ...project, createdOn: projectDate }); // Add the project with the JavaScript Date object to remaining projects
          }
          return acc;
        },
        { latest: null, remaining: [] }
      );
      if (latest) {
        setLatestProject([latest]);
      }
      setRemainingProjects(remaining);
    }
  }, [projects]);
  
  

  const [shownProjects, setShownProjects] = useState([]);

  useEffect(() => {

    if(type==="New"){
      setShownProjects(latestProject);
    } else {
      setShownProjects(remainingProjects)
    }
  }, [type, latestProject, remainingProjects])
  


  return (
    <>
      <StyledConferencesTable
        style={{
          margin: "1rem",
          background: "rgba(255,255,255,1)",
          padding: "20px",
          borderRadius: "1rem",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
          overflow: 'hidden'
        }}
      >
        <div style={{flex: 1, width: '100%', height: '100%', overflow: 'auto'}}>
        <div
          style={{
            marginBottom: "15px",
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
          }}
        >
          ALL CONFERENCES
        </div>


        
        <div
                
                style={{
                  display: "flex",
                  alignContent: "center",
                  flex: 1,
                  background: "#eee",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
                  margin: "15px 10px",
                }}
              >
                <div
                  onClick={() => {
                    setType("New");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "New" ? "#0f67fd" : "transparent",
                    color: type === "New" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Current
                </div>
                <div
                  onClick={() => {
                    setType("Archived");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    background: type === "Archived" ? "#0f67fd" : "transparent",
                    color: type === "Archived" ? "#fff" : "#3e3e3e",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Archived
                </div>
              </div>

{
  !loading ?

 <>

          {
            shownProjects?.length > 0 ?
            <>
          {
            shownProjects?.length === 1 ?
            <div style={{padding: '20px', margin: '20px', background: '#fff', borderRadius: '10px', color: '#5e5e5e', boxShadow: '0px 5px 15px rgba(0,0,0,0.15)'}}>
            
            <div style={{flex: 1, textAlign: 'center', padding: '10px', fontSize: '1.5rem'}}><b>{shownProjects[0]?.title}</b></div>
            <div style={{flex: 1, textAlign: 'center', fontSize: '1.2rem'}}>Topic: {shownProjects[0]?.topic}</div>
            <br/>
            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <p><b>Start Date: </b>{dateToString(shownProjects[0]?.deadline?.startDate)}</p>
            <p><b>End Date: </b>{dateToString(shownProjects[0]?.deadline?.endDate)}</p>
            </div>
            <br/>
            <p><b>Description:</b></p>
            <p>{shownProjects[0]?.description}</p>
            </div>
            :
        <table style={{ color: "#5e5e5e", border: "1px solid #ccc" }}>
          <thead>
            <tr>
              {/* <th style={{ border: "1px solid #ccc" }}>ID</th> */}
              <th style={{ border: "1px solid #ccc" }}>Title</th>
              <th style={{ border: "1px solid #ccc" }}>Topic</th>
              <th style={{ border: "1px solid #ccc" }}>Start Date</th>
              <th style={{ border: "1px solid #ccc" }}>End Date</th>
              {/* <th style={{ border: "1px solid #ccc" }}>Reg./Limit</th> */}
              {/* <th style={{ border: "1px solid #ccc" }}>Register</th> */}
              <th style={{ border: "1px solid #ccc" }}>More Info</th>
            </tr>
          </thead>
          <tbody>
            {shownProjects?.sort((a, b) => {
  // Sort in descending order based on date
  return b.createdOn - a.createdOn;
})?.map((row) => {
              // const projectHasApplied = row.appliedStudents.includes(
              //   authUser?.uid!
              // ); // Check if the current user has applied to this project
              return (
                <tr key={row?.id}>
                  {/* <td style={{ border: "1px solid #ccc" }} title={row.id}>
                    {handleOverflowedText(row.id)}
                  </td> */}
                  <td style={{ border: "1px solid #ccc" }} title={row?.title}>
                    {handleOverflowedText(row?.title)}
                  </td>
                  <td style={{ border: "1px solid #ccc" }} title={row?.topic}>
                    {handleOverflowedText(row?.topic)}
                  </td>
                  <td
                    style={{ border: "1px solid #ccc" }}
                    title={dateToString(row?.deadline?.startDate)}
                  >
                    {handleOverflowedText(dateToString(row?.deadline?.startDate))}
                  </td>
                  <td
                    style={{ border: "1px solid #ccc" }}
                    title={dateToString(row?.deadline?.endDate)}
                  >
                    {handleOverflowedText(dateToString(row?.deadline?.endDate))}
                  </td>
                  {/* <td
                    style={{ border: "1px solid #ccc" }}
                  >{`${row.appliedStudents.length}/${row.studentCapacity}`}</td> */}
                  {/* <td style={{ border: "1px solid #ccc" }}>


                    <Button
                      onClick={() => handleApply(row.id)}
                      disabled={isUpdating === row.id || projectHasApplied}
                      variant="contained"
                      color="success"
                      style={{width: '100%', borderRadius: '0px'}}
                    >
                      {isUpdating === row.id
                        ? "Registering"
                        : projectHasApplied
                        ? "Registered"
                        : "Register"}
                    </Button>
                  </td> */}
                  <td style={{ border: "1px solid #ccc" }}>
                    <Button variant="contained" style={{width: '100%', borderRadius: '0px'}} onClick={() => handleMoreInfoClick(row)}>
                      More Info
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      </>
        :
        <div
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#ccc",
        }}
      >
        {loading ? "Loading Data" : "No Data"}
      </div>
      }
</>

:
  
  <div
  style={{
    height: "200px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ccc",
  }}
>
  Loading Data
</div>
}

        {isConferencePopupOpen && (
          <>
            <StyledConferencePopupContainer>
              <Backdrop onClick={handleCloseConferencePopup} />
              <ConferencePopup
                project={selectedProject}
                onClose={handleCloseConferencePopup}
                handleApply={handleApply}
                isUpdating={isUpdating}
                hasApplied={hasApplied}
              />
            </StyledConferencePopupContainer>
          </>
        )}
        </div>
      </StyledConferencesTable>
    </>
  );
};
export default ConferencesTable;
