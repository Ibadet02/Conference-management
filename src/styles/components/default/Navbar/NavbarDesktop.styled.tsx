import styled from "styled-components";

const circleSize: string = '.5rem';

export const StyledNavbarDesktop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .logo-container{

    }
    .navbar-links--all{
        display: flex;
        align-items: center;
        gap: 2rem;
        .navbar-links--main{
            display: flex;
            align-items: center;
            gap: 1rem;
            &__link{
                display: flex;
                align-items: center;
                gap: .3rem;
                text-decoration: none;
                padding: .3rem .5rem;
                border-radius: 5px;
                font-size: 1.1rem;
                font-style: normal;
                font-weight: normal;
                color: #fff;
                &.active{
                    background: rgba(255,255,255,0.15);
                }
            }
        }
        .navbar-links--register{
            display: flex;
            align-items: center;
            gap: 1rem;
        }
    }
`