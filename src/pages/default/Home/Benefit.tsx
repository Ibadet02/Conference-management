import { StyledBenefit } from "../../../styles/pages/default/Home/Benefit.styled";
import PrimaryLink from "../../../components/default/mutual/PrimaryLink";
import { BenefitProp } from "../../../types/default/props";


const Benefit: React.FC<{benefitProp: BenefitProp}> = ({benefitProp}) => {
  return (
    <StyledBenefit $flex_direction = {benefitProp.flexDirection}>
      <div className="benefit-container">
        <div className="benefit-container__left">
          <div className="benefit-container__left--img-box">
            <img src={benefitProp.image} alt="password-frame" />
          </div>
        </div>
        <div className="benefit-container__right">
          <div className="benefit-container__right--info-box">
            <h3 className="benefit-info--header">{benefitProp.title}</h3>
            <p className="benefit-info--description">{benefitProp.description}</p>
            <PrimaryLink
            path={benefitProp.path}
            title="Learn More" />
          </div>
        </div>
      </div>
    </StyledBenefit>
  )
}

export default Benefit;