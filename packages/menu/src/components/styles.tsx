import styled, { css } from "styled-components";
import { tokens } from "@francisco/ui";

export const MenuItem = styled.a<{ selected?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${tokens.roundedCorners.radius_full};
  padding: 8px;
  margin: 4px 8px;

  color: ${tokens.colors.white};

  &:hover {
    background-color: ${tokens.colors.main_500};
    color: ${tokens.colors.white};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${tokens.colors.white};
      color: ${tokens.colors.main_700m};
      box-shadow: ${tokens.elevation.elevation_1};
    `}
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const SubItemsContainer = styled.div`
  margin-left: 24px;
`;

export const ItemTitle = styled.span`
  margin: 0 10px;
  white-space: nowrap;
`;
