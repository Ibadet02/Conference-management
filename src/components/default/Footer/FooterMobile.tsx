import { FooterComponentsProps } from "../../../types/default/props";
const FooterMobile: React.FC<FooterComponentsProps> = ({paperPlaneIcon, footerLinks, socialLinks}) => {
  return (
    <div>{paperPlaneIcon}</div>
  )
}

export default FooterMobile;