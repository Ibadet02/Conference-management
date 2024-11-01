import {
  InitialRegisterFormDataType,
  MutualInitialRegisterFormDataType,
} from "../../../../types/Form/registration/types";

const mutualInitialRegisterFormData: MutualInitialRegisterFormDataType = {
  firstName: "",
  lastName: "",
  affiliation: {
    options: ["BME AUT", "BME Industry 4.0 Technology Center", "Other"],
    selectedOption: "",
  },
  email: "",
  phone: "",
  academicInterest: {
    options: [
      "Energetics, Industry 4.0",
      "Robotics",
      "Power Electronics",
      "Hardware Design",
      "Data Mining and Intelligent Systems",
      "Digitalization and Digital Transformations",
      "Machine Learning and Artificial Intelligence",
      "Graph and Model Transformation",
      "Metamodeling and Domain-Specific Languages",
      "Mobile and Distributed Systems",
      "Computer Graphics and Image Recognition",
      "Control Theory, Control Engineering",
      "Other",
    ],
    selectedOption: "",
  },
};
export const initialRegisterFormData: InitialRegisterFormDataType = {
  author: {
    ...mutualInitialRegisterFormData,
    program: { options: ["BSc", "MSc", "PhD", "Researcher", "Other"], selectedOption: "" },
    supervisor: {
      options: ["name1", "name2", "name3", "name4", "name5", "OTHER"],
      selectedOption: "",
    },
    password: "",
    confirmPassword: ""
  },
  reviewer: {
    ...mutualInitialRegisterFormData,
    reviewCapacity: { options: [2, 3, 4, 5], selectedOption: 2 },
    password: "",
    confirmPassword: ""
  },
  admin: {
    email: "",
    password: "",
  },
};

export type RoleType = keyof InitialRegisterFormDataType;

// const getRoleFormData = (role: RoleType): InitialRegisterFormDataType => {
//   switch (role) {
//     case 'author':
//       return {
//         ...mutualInitialRegisterFormData,
//         program: ["BSc", "MSc", "PhD", "OTHER"],
//         supervisor: ["name1", "name2", "name3", "name4", "name5", "OTHER"],
//         password: "",
//       };
//     case 'reviewer':
//       return {
//         ...mutualInitialRegisterFormData,
//         reviewCapacity: [2, 3, 4, 5],
//         password: "",
//       };
//     case 'admin':
//       return {
//         email: "",
//         password: "",
//       };
// default:
// Adjust the default return value based on your application logic
// return null; // You might return an empty object or handle differently based on the scenario.
//   }
// };
