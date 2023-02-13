import styled from "styled-components";

const UiInput = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 48px;
  margin-bottom: 18.5px;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & img {
    padding-right: 32px;
    cursor: pointer;
    @media (max-width:450px) {
      padding-right: 10px;
    }
  }
  & input[type="text"] {
    outline: none;
    border: 1px solid white;
    min-height: 48px;
    border-radius: 12px;
    font-weight: 400;
    font-size: 25px;
    line-height: 20px;
    padding-left: 32px;
    @media (max-width:450px) {
      padding-left: 10px;
    }
  }
  /*  & input[type=submit] {
    padding-right: 32px;
    
  } */
   
`;
export default UiInput;
