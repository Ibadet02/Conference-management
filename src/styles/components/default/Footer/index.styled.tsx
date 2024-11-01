import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';


export const StyledFooter = styled.footer<{ theme: Theme }>`
    background-color: #1e1e1e;
    padding: ${({ theme }) => theme.paddings.mainBlock} ${({ theme }) => theme.paddings.mainInline};
    /* position: absolute;
    bottom: 0;
    left: 0; */
    width: 100%;
    padding-top: 3rem;
    
    padding-bottom: 3rem;
`