import styled from "styled-components";
import rightArrow from "../../../assets/images/rightArrow.svg";
export const StyledApproveBtn = styled.a`
  position: relative;
  cursor: pointer;
  margin-top: 4rem;
  color: #1e1e1e;
  background: rgba(255,255,255,0.5);
  font-size: 1em;
  display: inline-block;
  text-transform: uppercase;
  padding: 0.5em 2em;
  border-radius: .4rem;
  overflow: hidden;
  width: 100%;
  text-align: center;
  box-shadow: 2px 5px 10px 0px rgba(0,0,0,0.3);
  transition: 0.02s 0.2s cubic-bezier(0.1, 0, 0.1, 1);
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    background-color: #0f67fd;
    transition: 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1),
      left 0.3s cubic-bezier(0.1, 0, 0.1, 1);
    z-index: -1;
  }
  &::after {
    content: "";
    background-color: #adbdda;
    display: inline-block;
    background-image: url(${rightArrow});
    position: absolute;
    top: 0;
    left: calc(100% - 3em);
    right: 3em;
    bottom: 0;
    background-size: 1.5em;
    background-repeat: no-repeat;
    background-position: center;
    transition: right 0.3s cubic-bezier(0.1, 0, 0.1, 1);
  }
  &:hover {
    padding: 0.5em 3.5em 0.5em 0.5em; /* Adjust padding values for desired effect */

    background: rgba(255,255,255,0.8);
    &::before {
      left: calc(100% - 3em);
      right: 0;
      transition: 0.3s cubic-bezier(0.1, 0, 0.1, 1),
        left 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1); /* Fine-tune transition */
    }

    &::after {
      right: 0;
      transition: right 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1); /* Fine-tune transition */
    }
  }
`;
