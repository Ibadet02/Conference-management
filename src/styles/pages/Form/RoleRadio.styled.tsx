import styled from "styled-components";

export const StyledRoleRadio = styled.div`
  input {
    appearance: none;
    opacity: 0;
    position: absolute;
    box-shadow: none;
    transition: all 0.2s ease-in-out;

    &:checked + label {
      background: rgba(255,255,255,0.9);
      outline: solid .15rem rgba(255,255,255,0.9);
      box-shadow: 2px 5px 10px 0px rgba(0,0,0,0.3);
      color: #1e1e1e;
      &::after {
        background: #0f67fd;
      }
    }
  }
  label {
    cursor: pointer;
    position: relative;
    padding: 2.5rem 2rem;
    border-radius: .5rem;
    background: rgba(255,255,255,0.5);
    font-weight: bold;
    color: #4e4e4e;
    &::after {
      content: "";
      position: absolute;
      width: .8rem;
      height: .8rem;
      border-radius: 50%;
      right: .4rem;
      top: .5rem;
      background: #ededed;
    }
  }
`;
