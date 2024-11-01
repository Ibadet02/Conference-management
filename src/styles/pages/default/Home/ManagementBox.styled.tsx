import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

const managementBoxTransition: string = '200ms';

export const StyledManagementBox = styled.div<{theme: Theme}>`
    background-color: ${({theme})=>theme.colors.primaryWhite};
    padding: 4.5rem 1.5rem;
    box-shadow: none;
    border-radius: 10px;
    position: relative;
    transition: all 0.2s ease-in-out;
    z-index: 9;
    &:hover{
        background-color: #0f67fd;
        z-index: 99;
        box-shadow: 0px 5px 50px rgba(0,0,0,0.4);
        .management-box-container--img{
            svg{
                color: ${({theme})=>theme.colors.primaryWhite};
            }
        }
        .management-box-container--heading{
            color: #E7ECEF;
        }
        .management-box-container--description{
            color: #E1EFF6;
        }
    }
    .management-box-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        &--img{
            svg{
                font-size: 4rem;
                transition: color ${managementBoxTransition};
            }
        }
        &--heading{
            text-align: center;
            color: ${({theme})=>theme.colors.neutralGrey};
            transition: color ${managementBoxTransition};
        }
        &--description{
            text-align: center;
            color: ${({theme})=>theme.colors.description};
            transition: color ${managementBoxTransition};
        }
    }
`