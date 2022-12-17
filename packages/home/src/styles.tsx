import styled from "styled-components";
import { tokens } from "@francisco/ui";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h1`
  color: ${tokens.colors.grey_800};
`;

export const Text = styled.p`
  color: ${tokens.colors.grey_500};
`;
