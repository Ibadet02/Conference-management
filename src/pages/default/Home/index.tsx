import { StyledHome } from "../../../styles/pages/default/Home/index.styled";
import Banner from "./Banner";
import Benefit from "./Benefit";
import Management from "./Management";
import { benefitData } from "../../../data/pages/default/Home/BenefitData";
const Home = () => {
  return (
    <StyledHome>
      <Banner />
      <Benefit benefitProp={benefitData[0]} />
      <Management />
      <Benefit benefitProp={benefitData[1]} />
    </StyledHome>
  )
}

export default Home;