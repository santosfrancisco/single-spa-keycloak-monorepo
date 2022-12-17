import styled from "styled-components";
import { tokens } from "@francisco/ui";

export const Container = styled.div`
  background: ${tokens.colors.main_800};
  height: 100vh;
  width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a {
    color: ${tokens.colors.white};
    text-decoration: none;
    display: block;
    padding: 20px;
  }

  ul {
    padding: 0;
    margin: 0;

    li {
      color: ${tokens.colors.white};
      font-size: 16px;
      transition: all 0.25s ease;
      animation: fadeInRight 0.25s ease forwards;
      padding: 8px 16px;
      border-bottom: 1px solid ${tokens.colors.white};

      &:hover {
        opacity: 0.8;
        transition: all 0.25s ease;
        background: ${tokens.colors.main_700m};
        cursor: pointer;
      }
    }
  }
`;
