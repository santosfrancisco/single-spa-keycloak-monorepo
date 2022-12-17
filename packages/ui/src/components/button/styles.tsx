import styled, { css } from "styled-components";
import { tokens } from "../../styles/tokens";

const primary = css`
  color: ${tokens.colors.white};
  background-color: ${tokens.colors.main_700m};
  border-color: ${tokens.colors.main_700m};

  &:active {
    background-color: ${tokens.colors.main_800};
    border-color: ${tokens.colors.main_800};
  }

  &:disabled {
    color: ${tokens.colors.white};
    background-color: ${tokens.colors.grey_500};
    border-color: ${tokens.colors.grey_500};
    cursor: auto;
    &:active {
      background-color: ${tokens.colors.grey_500};
      border-color: ${tokens.colors.grey_500};
    }
  }
`;

const primaryInvert = css`
  color: ${tokens.colors.main_700m};
  background-color: ${tokens.colors.white};
  border-color: ${tokens.colors.white};

  &:hover {
    background-color: ${tokens.colors.main_100};
    border-color: ${tokens.colors.main_100};
  }

  &:disabled {
    color: ${tokens.colors.grey_500};
    background-color: ${tokens.colors.grey_100};
    border-color: ${tokens.colors.grey_100};
    cursor: auto;
    &:active {
      background-color: ${tokens.colors.grey_100};
      border-color: ${tokens.colors.grey_100};
    }
  }
`;

const secondary = css`
  color: ${tokens.colors.main_700m};
  background-color: transparent;
  border-color: ${tokens.colors.main_700m};

  &:active {
    background-color: ${tokens.colors.main_100};
    border-color: ${tokens.colors.main_700m};
  }

  &:disabled {
    color: ${tokens.colors.grey_500};
    background-color: transparent;
    border-color: ${tokens.colors.grey_500};
    cursor: auto;
    &:active {
      background-color: transparent;
      border-color: ${tokens.colors.grey_500};
    }
  }
`;

const secondaryInvert = css`
  color: ${tokens.colors.white};
  background-color: transparent;
  border-color: ${tokens.colors.white};

  &:active {
    background-color: ${tokens.colors.main_800};
    border-color: ${tokens.colors.white};
  }

  &:disabled {
    color: ${tokens.colors.grey_500};
    background-color: transparent;
    border-color: ${tokens.colors.grey_500};
    cursor: auto;
    &:active {
      background-color: transparent;
      border-color: ${tokens.colors.grey_500};
    }
  }
`;

const ghost = css`
  color: ${tokens.colors.main_700m};
  background-color: transparent;
  border-color: transparent;

  &:active {
    background-color: ${tokens.colors.main_100};
    border-color: transparent;
  }

  &:disabled {
    color: ${tokens.colors.grey_500};
    background-color: transparent;
    border-color: transparent;
    cursor: auto;
    &:active {
      background-color: transparent;
      border-color: transparent;
    }
  }
`;

const ghostInvert = css`
  color: ${tokens.colors.white};
  background-color: transparent;
  border-color: transparent;

  &:active {
    background-color: ${tokens.colors.main_500};
    border-color: transparent;
  }

  &:disabled {
    color: ${tokens.colors.grey_500};
    background-color: transparent;
    border-color: transparent;
    cursor: auto;
    &:active {
      background-color: transparent;
      border-color: transparent;
    }
  }
`;

export const getTypeStyle = (theme) => {
  switch (theme) {
    case "primary":
      return primary;
    case "primaryInvert":
      return primaryInvert;
    case "secondary":
      return secondary;
    case "secondaryInvert":
      return secondaryInvert;
    case "ghost":
      return ghost;
    case "ghostInvert":
      return ghostInvert;
    default:
      return primary;
  }
};

const autoSize = css`
  height: fit-content;
  width: auto;
`;

const proportionalSize = css`
  height: auto;
  width: 100%;
`;

const getSizeStyle = (size) => {
  switch (size) {
    case "autoSize":
      return autoSize;
    case "proportionalSize":
      return proportionalSize;
    default:
      return autoSize;
  }
};

export const StyledButton = styled.button<{ size?: string; theme?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-style: solid;
  border-width: 2px;
  border-radius: ${tokens.roundedCorners.radius_full};
  padding: 6px 32px;

  &:hover {
    filter: brightness(50%);
  }

  ${({ theme }) => getTypeStyle(theme)};
  ${({ size }) => getSizeStyle(size)};
`;
