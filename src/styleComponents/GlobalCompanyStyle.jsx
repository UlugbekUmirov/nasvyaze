import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & .body {
    width: 662px;
    margin: 0 32px;

    & .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #001d56;
      text-align: center;
      margin-bottom: 22px;
    }
    
  }
`;
