import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';


export const StyledPrimaryLink = styled(Link)<{$doesarrowexist: boolean, theme: Theme}>`
    width: 8rem;
    height: 2.5rem;
    background-color: #0f67fd;
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({$doesarrowexist})=>$doesarrowexist ? '.7rem' : '0'};
    font-size: .9rem;
    font-weight: 500;
    border-radius: .25rem;
    border: .1rem solid #0f67fd;
    transition: all 0.2s ease-in-out;

    .arrow{
        transition: transform 200ms;
        font-size: .9rem;
    }
    &:hover{
        background-color: transparent;
        color: #0f67fd;
    }
    &:active{
        .arrow{
            transform: translateX(-0.3rem);
        }
    }
`