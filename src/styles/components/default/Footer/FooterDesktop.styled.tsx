import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

const socialLinkSize: string = '2rem';
const newletterBtnWidth: string = '2rem'
export const StyledFooterDesktop = styled.div<{theme: Theme}>`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    .footer-container__left{
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        &--logo{
            align-self: flex-start;
        }
        &--copyright{
            display: flex;
            flex-direction: column;
            gap: .5rem;
            span{
                color: ${({theme})=>theme.colors.neutralSilver};
                font-size: .875rem;
                font-weight: 400;
            }
        }
        &--social{
            display: flex;
            align-items: center;
            gap: 1rem;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                width: ${socialLinkSize};
                height: ${socialLinkSize};
                background-color: ${({theme})=>theme.colors.neutralGrey};
                border-radius: 50%;
                transition: background-color 200ms;
                &:hover{
                    background-color: ${({theme})=>theme.colors.description};
                }
                svg{
                    width: 1.1rem;
                    fill: ${({theme})=>theme.colors.primaryWhite};
                }
            }
        }
    }
    .footer-container__right{
        display: flex;
        justify-content: space-between;
        gap: 3rem;
        width: 50rem;
        .footer-tools{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            h3{
                font-size: 1.25rem;
                font-weight: 600;
                color: ${({theme})=>theme.colors.primaryWhite};
            }
            .footer-links{
                display: flex;
                flex-direction: column;
                gap: .7rem;
                a{
                    text-decoration: none;
                    color: ${({theme})=>theme.colors.neutralSilver};
                    font-size: .875rem;
                    font-weight: 400;
                    span{
                        transition: transform 300ms;
                        display: flex;
                    }
                    &:hover{
                        span{
                            transform: translateX(1rem);
                        }
                    }
                }
            }
            label{
                display: flex;
                align-items: center;
                width: 15.938rem;
                height: 2.3rem;
                position: relative;
                border-radius: .5rem;
                overflow: hidden;
                #newsletter{
                    width: 100%;
                    height: 100%;
                    background: #56585D;
                    border: none;
                    outline: none;
                    padding-inline: .4rem ${newletterBtnWidth};
                    font-size: .875rem;
                    font-weight: 400;
                    color: #D9DBE1;
                    &::placeholder {
                        color: #D9DBE1;
                        font-size: .875rem;
                        font-weight: 400;
                    }
                }
                button{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: ${newletterBtnWidth};
                    height: 100%;
                    border: none;
                    background: none;
                    cursor: pointer;
                    svg{
                        color: ${({theme})=>theme.colors.primaryWhite};
                    }
                }
            }
        }
    }
`