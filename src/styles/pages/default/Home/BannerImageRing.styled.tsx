import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

export const StyledBannerImageRing = styled.div<{ $bannerimgsize: string, $bannerimgpadding: string, theme: Theme }>`
    width: ${({ $bannerimgsize }) => $bannerimgsize};
    height: ${({ $bannerimgsize }) => $bannerimgsize};
    border-radius: 50%;
    border: .1rem solid ${({ theme }) => theme.colors.description};
    padding: ${({ $bannerimgpadding }) => $bannerimgpadding};
    position: absolute;
    background-color: #fff;
    &:nth-child(2){
        left: 0;
        bottom: 5rem;
    }
    &:nth-child(3){
        right: 0;
        top: 3.5rem;
    }
    &:nth-child(4){
        right: 1rem;
        bottom: 1rem;
    }
    .banner-ring--inner-border{
        border-radius: 50%;
        overflow: hidden;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
`