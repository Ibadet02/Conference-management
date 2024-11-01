// import { useState } from "react";
// import AuthorRegisterFormStep1 from "../../../../pages/Form/registration/Author/AuthorRegisterFormStep1";
// import AuthorRegisterFormStep2 from "../../../../pages/Form/registration/Author/AuthorRegisterFormStep2";
// import AuthorRegisterFormStep3 from "../../../../pages/Form/registration/Author/AuthorRegisterFormStep3";
// import { RegisterFormStepsType } from "../../../../types/Form/registration/Author/types";
// import { initialRegisterFormData } from "./InitialRegisterFormData";

// const [registerAuthorFormData, setRegisterAuhtorFormData] = useState(
//   initialRegisterFormData.Author
// );

// function updateAuthorRegisterFields(
//   fields: Partial<typeof initialRegisterFormData.Author>
// ) {
//   setRegisterAuhtorFormData((prev) => {
//     return { ...prev, ...fields };
//   });
// }

// export const registerFormStepsData: RegisterFormStepsType = {
//   author: [
//     <AuthorRegisterFormStep1
//       {...registerAuthorFormData}
//       updateAuthorRegisterFields={updateAuthorRegisterFields}
//     />,
//     <AuthorRegisterFormStep2
//       {...registerAuthorFormData}
//       updateAuthorRegisterFields={updateAuthorRegisterFields}
//     />,
//     <AuthorRegisterFormStep3
//       {...registerAuthorFormData}
//       updateAuthorRegisterFields={updateAuthorRegisterFields}
//     />,
//   ],
//   reviewer: [],
//   admin: [],
// };
