import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

export const StyledBenefit = styled.section<{theme: Theme, $flex_direction: string}>`
    padding: ${({theme})=>theme.paddings.mainBlock} ${({theme})=>theme.paddings.mainInline};
    .benefit-container{
        display: flex;
        flex-direction: ${({$flex_direction})=>$flex_direction};
        align-items: center;
        gap: 4rem;
        &__left{
            flex: 0.3;
            img{
                width: 100%;
            }
        }
        &__right{
            flex: 1;
            &--info-box{
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                .benefit-info--header{
                    color: ${({theme})=>theme.colors.neutralBlack};
                    font-size: 2.25rem;
                    font-weight: 600;
                }
                .benefit-info--description{
                    color: ${({theme})=>theme.colors.description};
                    font-size: .875rem;
                }
            }
        }
    }
`