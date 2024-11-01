import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledAdminSidebar = styled.nav<{ theme: Theme }>`
  width: ${({ theme }) => theme.dashboards.author.widths.sidebar};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.6rem;
  overflow-y: auto;
`;
