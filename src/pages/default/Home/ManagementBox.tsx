import { StyledManagementBox } from "../../../styles/pages/default/Home/ManagementBox.styled";
import { ManagementBoxProp } from "../../../types/default/props";
const ManagementBox: React.FC<{ managementBoxData: ManagementBoxProp }> = ({ managementBoxData }) => {
    return (
        <StyledManagementBox>
            <div className="management-box-container">
                <div className="management-box-container--img">
                    {managementBoxData.image}
                </div>
                <h4 className="management-box-container--heading">
                    {managementBoxData.title}
                </h4>
                <p className="management-box-container--description">
                    {managementBoxData.description}
                </p>
            </div>
        </StyledManagementBox>
    )
}

export default ManagementBox;