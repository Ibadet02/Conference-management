import { StyledApproveBtn } from "../../styles/pages/Form/ApproveBtn.styled";
import { ApproveBtnProps } from "../../types/Form/props";

const ApproveBtn: React.FC<ApproveBtnProps> = ({ handleApproveRole }) => {
  return (
    <StyledApproveBtn type="button" onClick={handleApproveRole}>
      Proceed
    </StyledApproveBtn>
  );
};

export default ApproveBtn;