import styled from "styled-components";

const UiCard = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 101.5px;
  margin-bottom: 18.5px;
  transition: 0.5s;
  position: relative;
  
  & .companyCardd {
    text-align: center;
    justify-content: center;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: black;
    font-weight: 500;
    font-size: 25px;
    line-height: 20px;
    position: absolute;
    top: 40%;
    width: 100%;
  }
  cursor: pointer;
  :hover {
    background: #4f89cb;
  }
`;
export default UiCard;
