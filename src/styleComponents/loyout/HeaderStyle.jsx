import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 0px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 1086px;
  & .close {
    cursor: pointer;
    & .close__span {
      color: #223260;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }
  }
  @media (max-width: 1100px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`;
