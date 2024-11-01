import { StyledFooter } from "../../../styles/components/default/Footer/index.styled";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footerLinks } from "../../../data/components/default/Footer/FooterLinks";
import { socialLinks } from "../../../data/components/default/mutual/SocialLinks";
const Footer = () => {
  return (
    <StyledFooter>
      {true ? (
        <FooterDesktop
          paperPlaneIcon={<FontAwesomeIcon icon={faPaperPlane} />}
          footerLinks={footerLinks}
          socialLinks={socialLinks}
        />
      ) : (
        <FooterMobile
          paperPlaneIcon={<FontAwesomeIcon icon={faPaperPlane} />}
          footerLinks={footerLinks}
          socialLinks={socialLinks}
        />
      )}
    </StyledFooter>
  );
};

export default Footer;
