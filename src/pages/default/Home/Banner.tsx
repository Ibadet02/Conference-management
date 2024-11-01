import { StyledBanner } from "../../../styles/pages/default/Home/Banner.styled";
import BannerImageRing from "./BannerImageRing";
import { BannerImages } from "../../../data/pages/default/Home/BannerImages";
import PrimaryLink from "../../../components/default/mutual/PrimaryLink";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useAuthentication from "../../../hooks/useAuthentication";
const Banner = () => {
  
const authUser = useAuthentication();
const userRole = localStorage.getItem("userRole");

  return (
    <StyledBanner>
      <div className="banner-container">
        <div className="banner-container__left">
          <h2 className="welcome">
            Welcome to BME's Conference Management System (CMS)
          </h2>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            dolorum facere quisquam excepturi deleniti magni cumque harum illo
            esse ipsum.
          </p>
          <div className="registration-login">
            {
              authUser ? 
              <PrimaryLink path={`/${userRole}-dashboard`} title="Dashboard" arrow={faArrowRight} />
              :
              <>
              <PrimaryLink path="/signup" title="Register" arrow={faArrowRight} />
              <PrimaryLink path="/signin" title="Log In" arrow={faArrowRight} />
              </>
            }
          </div>
        </div>
        <div className="banner-container__right">
          <div
            style={{
              width: BannerImages[0].size,
              height: BannerImages[0].size,
            }}
            className="banner-image-ring--wrapper"
          >
            {BannerImages.map((bannerImageRingData) => {
              return (
                <BannerImageRing
                  key={bannerImageRingData.id}
                  bannerImageRingData={bannerImageRingData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </StyledBanner>
  );
};

export default Banner;
