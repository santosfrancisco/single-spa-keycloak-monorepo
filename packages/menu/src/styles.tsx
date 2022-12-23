import styled from "styled-components";
import { tokens } from "@francisco/ui";

export const Container = styled.div`
  background: ${tokens.colors.main_800};
  height: 100vh;
  width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
