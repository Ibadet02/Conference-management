// import { initialRegisterFormData } from "../../Form/registration/InitialRegisterFormData";
import { ProjectDataType } from "../../../../types/dashboard/Admin/types";
export const initialProjectData: ProjectDataType = {
  title: "",
  topic: "",
  description: "",
  deadline: {
    startDate: null,
    endDate: null,
  },
  canApply: { options: [], selectedOption: "" },
  studentCapacity: 1,
  submittedStudents: [],
  appliedStudents: []
};
