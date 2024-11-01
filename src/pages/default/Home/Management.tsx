import { managementBoxes } from "../../../data/pages/default/Home/ManagementBoxes";
import { StyledManagement } from "../../../styles/pages/default/Home/Management.styled";
import ManagementBox from "./ManagementBox";

const Management = () => {
  return (
    <StyledManagement>
      <div className="management-container">
        <div className="management-container__top">
          <h2 className="management-container__top--heading">
            Manage your entire community in a single system
          </h2>
          <p className="management-container__top--description">
            Who is Nextcent suitable for?
          </p>
        </div>
        <div className="management-container__bottom">
          <div className="management-container__bottom--grid">
            {managementBoxes.map((managementBox) => {
              return (
                <ManagementBox
                  key={managementBox.id}
                  managementBoxData={managementBox}
                />
              );
            })}
          </div>
        </div>
      </div>
    </StyledManagement>
  );
};

export default Management;
