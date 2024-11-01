import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

export const StyledManagement = styled.section<{ theme: Theme }>`
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
// background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);
    // background-color: ${({ theme }) => theme.colors.neutralSilver};
    padding: ${({theme})=>theme.paddings.mainBlock} ${({theme})=>theme.paddings.mainInline};
    .management-container{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        &__top{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .7rem;
            &--heading{
                color: ${({ theme }) => theme.colors.neutralGrey};
                font-size: 2.25rem;
                font-weight: 600;
                text-align: center;
                width: 40rem;
            }
            &--description{
                color: ${({ theme }) => theme.colors.description};
                font-size: 1rem;
                font-weight: 400;
            }
        }
        &__bottom{
            &--grid{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
            }
        }
    }
`