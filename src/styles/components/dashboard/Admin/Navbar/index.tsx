import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledAdminNavbar = styled.nav<{ theme: Theme }>`
  height: ${({ theme }) => theme.dashboards.author.heights.navbar};
  margin-left: ${({ theme }) => theme.dashboards.author.widths.sidebar};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding-inline: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
`;
