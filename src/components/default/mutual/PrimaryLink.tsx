import { StyledPrimaryLink } from "../../../styles/components/default/mutual/PrimaryLink.styled";
import { PrimaryLinkProps } from "../../../types/default/props";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const PrimaryLink: React.FC<PrimaryLinkProps> = ({ path, title, arrow }) => {
  return (
    <StyledPrimaryLink to={path} $doesarrowexist={arrow ? true : false}>
      <span className="title">{title}</span>
      {
        arrow ? <FontAwesomeIcon className="arrow" icon={arrow} /> : null
      }
    </StyledPrimaryLink>
  )
}

export default PrimaryLink;