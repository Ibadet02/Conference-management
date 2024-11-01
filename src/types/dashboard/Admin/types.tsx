import { InitialRegisterFormDataType } from "../../Form/registration/types";
export type ProjectDataType = {
  title: string;
  topic: string;
  description: string;
  deadline: {
    startDate: null | Date;
    endDate: null | Date;
  };
  canApply: InitialRegisterFormDataType["author"]["program"];
  studentCapacity: number;
  submittedStudents: string[]
  appliedStudents: string[];
  // assignedReviewers: string[]
};