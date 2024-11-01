import { styled } from 'styled-components';
import { Theme } from '../../../../../types/default/types';

export const StyledAuthorNavbar = styled.nav<{theme: Theme}>`
    height: ${({theme})=>theme.dashboards.author.heights.navbar};
    margin-left: ${({theme})=>theme.dashboards.author.widths.sidebar};
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: auto;
    .author-navbar__left{
        display: flex;
        align-items: center;
        gap: .3rem;
        font-size: .85rem;
        font-weight: 550;
        .previous-page-name{
            color: ${({theme})=>theme.dashboards.author.colors.secondaryText};
        }
        .slash, .current-page-name{
            color: ${({theme})=>theme.dashboards.author.colors.mainText};
        }
    }
    .author-navbar__right{
        display: flex;
        align-items: center;
        gap: .5rem;
        .search-input-box{
            width: 10rem;
            height: 1.75rem;
            position: relative;
            border-radius: .5rem;
            overflow: hidden;
            background-color: #fff;
            #author-navbar-search-input{
                width: 100%;
                height: 100%;
                padding-left: 1.8rem;
                border: none;
                outline: none;
                color: ${({theme})=>theme.dashboards.author.colors.mainText};
                &::placeholder{
                    font-size: .8rem;
                    color: ${({theme})=>theme.dashboards.author.colors.secondaryText};
                }
            }
            .search-input-button{
                position: absolute;
                top: 0;
                left: 0;
                width: 1.75rem;
                height: 1.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                background: none;
                background-color: #fff;
                cursor: pointer;
                svg{
                    color: ${({theme})=>theme.dashboards.author.colors.mainText};
                }
            }
        }
        .author-navbar-button{
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            cursor: pointer;
            color: ${({theme})=>theme.dashboards.author.colors.mainText};
            background-color: #fff;
            width: 1.75rem;
            height: 1.75rem;
            border-radius: .5rem;
            svg{
                width: 1rem;
            }
        }
    }
`