import { Link } from 'react-router-dom';
import { StyledSignButton } from '../../../styles/components/default/Navbar/SignButton.styled';
import { SignButtonProps } from '../../../types/default/props';
import {useNavigate} from 'react-router-dom'


const SignButton: React.FC<SignButtonProps> = ({ type }) => {

    
const userRole = localStorage.getItem("userRole");
    const navigate=useNavigate();

    return (
        <StyledSignButton onClick={() => {
            if(type.title?.toLowerCase() === "log in"){
            navigate("/signin")
        }
            else if(type.title?.toLowerCase() === "register") {
                navigate("/signup")

            } else {
                navigate(`/${userRole}-dashboard`)
            }
            
            }}>
            <div className='button-content-wrapper'>
                <button className='button'>
                    <span className='button--title'>
                        {type.title}
                    </span>
                </button>
            </div>
        </StyledSignButton>
    )
}

export default SignButton;