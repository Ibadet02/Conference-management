import { ProjectDataTypeWithIds, UserDataProps } from "../../hooks/types";
import { ProjectDataType } from "../Admin/types";

export interface ConferenceProps {
  conferenceInfo: ProjectDataTypeWithIds;
}

export interface AppliedProjectDataProps {
  projectData: ProjectDataType;
  projectId: string;
  matchedItem: Object;
}
export interface ReadOnlyUserDataProps {
  userDataElements: UserDataProps;
}
export interface PaperSubmissionInputsProps {
  projectId: string;
  matchedItem: Object;
  projectData: Object
}

export interface ConferencesTableProps {
  projects: ProjectDataTypeWithIds[];
}

export interface ConferencePopupProps {
  project: ProjectDataTypeWithIds | null;
  onClose: () => void;
  handleApply: (id: string) => Promise<void>
  isUpdating: boolean
  hasApplied: boolean
  projects: Array
}
