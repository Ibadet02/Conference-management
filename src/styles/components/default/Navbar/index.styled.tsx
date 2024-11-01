import styled from "styled-components";
import { Theme } from "../../../../types/default/types";

export const StyledNavbar = styled.nav<{theme: Theme}>`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background: #0f67fd;
    padding-inline: ${({theme})=>theme.paddings.mainInline};
    height: ${({theme})=>theme.heights.navbarHeight};
    z-index: 100;
    width: 100%;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.3)
`