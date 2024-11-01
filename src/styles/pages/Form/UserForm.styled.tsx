import styled from "styled-components";
import { Theme } from "../../../types/default/types";

export const StyledUserForm = styled.form<{theme: Theme}>`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
