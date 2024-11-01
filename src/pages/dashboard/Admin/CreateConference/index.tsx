import { useEffect, useState } from "react";
import { initialProjectData } from "../../../../data/pages/dashboard/Admin/InitialProjectData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProjectDataType } from "../../../../types/dashboard/Admin/types";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import useCreateProject from "../../../../hooks/useCreateProject";
import { StyledCreateConference } from "../../../../styles/pages/dashboard/Admin/CreateConference/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import conferenceImage from "../../../../assets/images/conference.jpg";
import { db } from "../../../../firebase/index";
import useGetProjects from "../../../../hooks/useGetProjects";
import useUpdateProjectAdmin from "../../../../hooks/useUpdateProjectAdmin";
import toast from 'react-hot-toast';
import {  doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import useGetAdminData from "../../../../hooks/useGetAdminData";
import useAuthentication from "../../../../hooks/useAuthentication";

const CreateConference = () => {

  const [savingDraft, setSavingDraft] = useState(false);

  const [projectData, setProjectData] =
    useState<ProjectDataType>(initialProjectData);
    const [currentConference, setCurrentConference] = useState({});
    const [type, setType] = useState("New")
  const [assignedReviewers, setAssignedReviewers] = useState<string[]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<string[]>(
    []
  );
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const { createProject, loading } = useCreateProject();
  const checkboxItems = initialRegisterFormData.author.program;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const index = projectData.canApply.options.indexOf(value);
    if (name === "canApply") {
      if (index === -1) {
        setProjectData({
          ...projectData,
          canApply: {
            ...projectData.canApply,
            options: [...projectData.canApply.options, value],
          },
          // canApply: [...projectData.canApply, value],
        });
      } else {
        const updateCanApply = [...projectData.canApply.options];
        updateCanApply.splice(index, 1);
        setProjectData({
          ...projectData,
          canApply: {
            ...projectData.canApply,
            options: [...updateCanApply],
          },
        });
      }
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };
  const handleStudentCapatity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };
  const handleCheckboxChecked = (value: string) => {
    return projectData.canApply.options.includes(value);
  };
  const handleDateChange = (
    date: Date | null,
    inputName: "startDate" | "endDate"
  ) => {
    setProjectData({
      ...projectData,
      deadline: {
        ...projectData.deadline,
        [inputName]: date,
      },
    });
  };

  const {updateProject, updating} = useUpdateProjectAdmin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(type==="New"){
    await createProject(projectData, "projects");
    
    const docRef = doc(db, "adminUsers", authUser.uid);
      
    await updateDoc(docRef, { draft: null });
    setProjectData(initialProjectData);
  } else {
    await updateProject(projectData, "projects", currentConference?.id);
    // setType("New");
  }
  };

  
  const authUser = useAuthentication();
  const {userData} = useGetAdminData();

  useEffect(() => {
    if(userData?.draft){
      setProjectData({
        ...userData?.draft, 
        deadline: {
          startDate: userData?.draft.deadline?.startDate?.seconds ? new Date(userData?.draft.deadline.startDate.seconds * 1000) : null,
          endDate: userData?.draft.deadline?.endDate?.seconds ? new Date(userData?.draft.deadline.endDate.seconds * 1000) : null,
        }
      })
    } else {
      setProjectData(initialProjectData)
    }
  }, [userData?.draft, type])

  const { projects } = useGetProjects();

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
        setCurrentConference(latest);
      }
    }
  }, [projects]);


  
  const saveDraft = async () => {
    try {
      setSavingDraft(true);
      const docRef = doc(db, "adminUsers", authUser.uid);
      
      await updateDoc(docRef, { draft: projectData });
  
      toast.success("Draft Saved");
    } catch (e) {
      console.error(e);
    } finally {
      setSavingDraft(false);
    }
  };


  useEffect(() => {
    if(type==="Edit"){
      if(currentConference?.deadline){
      setProjectData({
        ...currentConference,
        deadline: {
          startDate: currentConference?.deadline?.startDate?.seconds ? new Date(currentConference.deadline.startDate.seconds * 1000) : null,
          endDate: currentConference?.deadline?.startDate?.seconds ? new Date(currentConference.deadline.startDate.seconds * 1000) : null,
        }
      })
    } else {
      setProjectData(initialProjectData)
    }
    }
  }, [type])
  // console.log("currentConference", currentConference)

  return (
    <StyledCreateConference>
      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          padding: "1rem",
        }}
      >
        <form
          style={{
            margin: "1rem",
            flex: 1,
            background: "rgba(255,255,255,1)",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "5px 5px 20px rgba(0,0,0,0.3)",
          }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              width: "100%",
              fontWeight: "bolder",
              textAlign: "center",
              color: "#2e2e2e",
              marginBottom: "15px",
            }}
          >
            CREATE CONFERENCE
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
                cursor: 'pointer'
              }}
            >
              New
            </div>
            <div
              onClick={() => {
                setType("Edit");
              }}
              style={{
                flex: 1,
                padding: "10px",
                textAlign: "center",
                background: type === "Edit" ? "#0f67fd" : "transparent",
                color: type === "Edit" ? "#fff" : "#3e3e3e",
                fontWeight: "bolder",
                cursor: 'pointer'
              }}
            >
              Edit
            </div>
          </div>
              {
                type==="New" ?
          <div
            style={{
              margin: "1rem",
              background: "rgba(255,255,255,0.6)",
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <TextField
              id="Title"
              label="Title"
              style={{ width: "100%" }}
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
            />

            <TextField
              id="Topic"
              label="Topic"
              style={{ width: "100%" }}
              type="text"
              name="topic"
              value={projectData.topic}
              onChange={handleChange}
              required
            />

            <TextField
              id="Description"
              label="Description"
              style={{ width: "100%" }}
              type="text"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              required
              multiline
              rows={2}
            />

            <div
              style={{
                padding: "15px",
                border: "2px solid #ccc",
                background: "transparent",
                color: "#5e5e5e",
                width: "100%",
                height: "50px",
                display: "flex",
                gap: "10px",
                borderRadius: "5px",
              }}
            >
              <label style={{ color: "#5e5e5e" }}>Start Date:</label>
              <DatePicker
                selected={projectData.deadline.startDate}
                onChange={(date: Date) => handleDateChange(date, "startDate")}
                selectsStart
                startDate={projectData.deadline.startDate}
                endDate={projectData.deadline.endDate}
                placeholderText="Select start date"
                required
                name="startDate"
              />
            </div>

            <div
              style={{
                padding: "15px",
                border: "2px solid #ccc",
                background: "transparent",
                color: "#5e5e5e",
                width: "100%",
                height: "50px",
                display: "flex",
                gap: "10px",
                borderRadius: "5px",
              }}
            >
              <label style={{ color: "#5e5e5e" }}>End Date:</label>
              <DatePicker
                selected={projectData.deadline.endDate}
                onChange={(date: Date) => handleDateChange(date, "endDate")}
                selectsEnd
                startDate={projectData.deadline.startDate}
                endDate={projectData.deadline.endDate}
                minDate={projectData.deadline.startDate}
                placeholderText="Select end date"
                required
                name="endDate"
              />
            </div>

            {/* <div>
              {checkboxItems.options.map((inputValue, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={inputValue}
                        name="canApply"
                        checked={handleCheckboxChecked(inputValue)}
                        id=""
                        onChange={handleChange}
                      />
                    }
                    label={inputValue}
                  />
                );
              })}
            </div> */}

            {/* <div
              style={{
                padding: "15px",
                border: "2px solid #ccc",
                background: "transparent",
                color: "#5e5e5e",
                width: "100%",
                height: "80px",
                borderRadius: "5px",
              }}
            >
              <label style={{ color: "#5e5e5e" }}>Student Capacity:</label>
              <input
                type="number"
                name="studentCapacity"
                id=""
                min={1}
                max={10}
                value={projectData.studentCapacity}
                onChange={handleStudentCapatity}
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  height: "60%",
                  background: "transparent",
                  fontSize: "1.2rem",
                }}
              />
            </div> */}

            {/* <div>
          <label>Assign reviewer(s):</label>
          <select
            name="assignedReviewers"
            value={assignedReviewers[assignedReviewers.length - 1] || ""} // Set value to the last selected author ID or an empty string if no author is selected
            onChange={handleAssignedReviewerChange}
          >
            <option value="">Select...</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className="selectedUserNames">
          {assignedReviewerNames.map((reviewerName, index) => (
            <div key={index}>
              {reviewerName}{" "}
              <button
                type="button"
                onClick={() => removeAssignedReviewer(index)}
              >
                x
              </button>
            </div>
          ))}
        </div> */}

{savingDraft ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                style={{ width: "100%" }}
              >
                <span>Saving Draft</span>
              </LoadingButton>
            ) : (
              <Button
                onClick={saveDraft}
                variant="outlined"
                style={{ width: "100%" }}
                type="button"
              >
                Save draft
              </Button>
            )}

            {loading ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ width: "100%" }}
              >
                <span>CREATING</span>
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                style={{ width: "100%" }}
                type="submit"
              >
                CREATE CONFERENCE
              </Button>
            )}

          </div>
          :
          <div
          style={{
            margin: "1rem",
            background: "rgba(255,255,255,0.6)",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField
            id="Title"
            label="Title"
            style={{ width: "100%" }}
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
          />

          <TextField
            id="Topic"
            label="Topic"
            style={{ width: "100%" }}
            type="text"
            name="topic"
            value={projectData.topic}
            onChange={handleChange}
            required
          />

          <TextField
            id="Description"
            label="Description"
            style={{ width: "100%" }}
            type="text"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
            multiline
            rows={2}
          />

          <div
            style={{
              padding: "15px",
              border: "2px solid #ccc",
              background: "transparent",
              color: "#5e5e5e",
              width: "100%",
              height: "50px",
              display: "flex",
              gap: "10px",
              borderRadius: "5px",
            }}
          >
            <label style={{ color: "#5e5e5e" }}>Start Date:</label>
            <DatePicker
              selected={projectData.deadline.startDate}
              onChange={(date: Date) => handleDateChange(date, "startDate")}
              selectsStart
              startDate={projectData.deadline.startDate}
              endDate={projectData.deadline.endDate}
              placeholderText="Select start date"
              required
              name="startDate"
            />
          </div>

          <div
            style={{
              padding: "15px",
              border: "2px solid #ccc",
              background: "transparent",
              color: "#5e5e5e",
              width: "100%",
              height: "50px",
              display: "flex",
              gap: "10px",
              borderRadius: "5px",
            }}
          >
            <label style={{ color: "#5e5e5e" }}>End Date:</label>
            <DatePicker
              selected={projectData.deadline.endDate}
              onChange={(date: Date) => handleDateChange(date, "endDate")}
              selectsEnd
              startDate={projectData.deadline.startDate}
              endDate={projectData.deadline.endDate}
              minDate={projectData.deadline.startDate}
              placeholderText="Select end date"
              required
              name="endDate"
            />
          </div>

          {/* <div>
            {checkboxItems.options.map((inputValue, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      value={inputValue}
                      name="canApply"
                      checked={handleCheckboxChecked(inputValue)}
                      id=""
                      onChange={handleChange}
                    />
                  }
                  label={inputValue}
                />
              );
            })}
          </div> */}


          {updating ? (
            <LoadingButton
              color="secondary"
              loading={true}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              style={{ width: "100%" }}
            >
              <span>Updating</span>
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              style={{ width: "100%" }}
              type="submit"
            >
              Update CONFERENCE
            </Button>
          )}
        </div>
              }
        </form>
      </div>
    </StyledCreateConference>
  );
};

export default CreateConference;
