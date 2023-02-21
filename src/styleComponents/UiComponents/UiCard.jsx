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
 /*  :hover {
    opacity: 0.8;
  } */
  & .otvet_informations {
    padding: 30px;
    & .otvet_information {
      display: flex;
      & p {
        margin: 0;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 18px;
        color: #223260;
        line-height: 21px;
        & span {
          color: #8f939a;
        }
      }
    }
    & .otvet_title {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      text-decoration-line: underline;
      color: #223260;
      margin-left: 25px;
    }
    & .otvet {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      padding: 19px 20px;
      background: #eaf2f9;
      border-radius: 12px;
      color: #223260;
      margin-top: 10px;
      & p {
        margin: 0;
      }
    }
  }
`;
export default UiCard;
