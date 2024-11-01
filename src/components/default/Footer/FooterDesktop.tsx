import { Link } from "react-router-dom";
import { FooterComponentsProps } from "../../../types/default/props";
import { StyledFooterDesktop } from "../../../styles/components/default/Footer/FooterDesktop.styled";
import logo from "../../../assets/logo.png";


const FooterDesktop: React.FC<FooterComponentsProps> = ({ paperPlaneIcon, footerLinks, socialLinks }) => {
    return (
        <StyledFooterDesktop>
            <div className="footer-container__left">
                <Link to='/' className="footer-container__left--logo">
                    <img src={logo} alt="Logo" style={{width: '50px', height: 'auto'}} />
                </Link>
                <p className="footer-container__left--copyright">
                    <span>Copyright &copy; 2020 Conference Management System(CMS)</span>
                    <span>All rights reserved</span>
                </p>
                <div className="footer-container__left--social">
                    {
                        socialLinks.map(socialLink => {
                            return (
                                <Link key={socialLink.id} title={socialLink.title} to={socialLink.path}>
                                    {socialLink.image}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="footer-container__right">
                {
                    footerLinks.map(linkSet => {
                        return (
                            <div key={linkSet.id} className='footer-tools'>
                                <h3>{linkSet.title}</h3>
                                <div className="footer-links">
                                    {
                                        linkSet.links.map(link => {
                                            return (
                                                <Link key={link.id} to={link.path}>
                                                    <span>{link.title}</span>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="footer-tools">
                    <h3>Stay up to Date</h3>
                    <label htmlFor="newsletter">
                        <input placeholder="Your email address" type="email" name="newsletter" id="newsletter" />
                        <button>
                            {paperPlaneIcon}
                        </button>
                    </label>
                </div>
            </div>
        </StyledFooterDesktop>
    )
}

export default FooterDesktop;