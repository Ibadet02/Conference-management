import { styled, keyframes } from 'styled-components';

const signButtonSize = {
    width: '9rem',
    height: '2.2rem'
}

const signLinksFadeIn = keyframes`
    from{
        transform: scaleY(0);
        opacity: 0;
    }
    to{
        transform: scaleY(1);
        opacity: 1;
    }
`

export const StyledSignButton = styled.div`
    .button-content-wrapper{
        position: relative;
        box-shadow: none;
        
        border-radius: 1rem;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        &:hover{
            box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
            ul{
                
                animation: ${signLinksFadeIn} 200ms forwards ease-in-out;
            }
        }
        .button{
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${signButtonSize.width};
            height: ${signButtonSize.height};
            cursor: pointer;
            background: none;
            border: none;
            background-color: #fff;

            &--title{
                color: #0f67fd;
                font-size: 1rem;
                font-weight: bold
            }
        }
        ul{
            width: 100%;
            position: absolute;
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
            li{
                list-style-type: none;
                a{
                    width: ${signButtonSize.width};
                    height: ${signButtonSize.height};
                    background-color: #000;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    &:hover{
                        background-color: #fff;
                        color: #000;
                    }
                }
            }
        }
    }
`