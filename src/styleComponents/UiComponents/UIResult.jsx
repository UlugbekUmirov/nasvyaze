import styled from "styled-components";

const UIResult = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 101.5px;
  margin-bottom: 18.5px;
  //transition: 0.5s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  display: flow-root;
  & .edit {
    position: absolute;
    border: 1.5px solid white;
    padding: 6px 7px 3px 7px;
    border-radius: 50%;
    right: 60px;
    top: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    :hover {
      background-color: #efeeee;
      border: 1.5px solid #efeeee;
    }
    @media (max-width: 450px) {
      top: 10px;
    }
  }
  & .delete {
    position: absolute;
    border: 1.5px solid white;
    padding: 6px 7px 3px 7px;
    border-radius: 50%;
    right: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    top: 15px;
    :hover {
      background-color: #efeeee;
      border: 1.5px solid #efeeee;
    }
    @media (max-width: 450px) {
      top: 10px;
    }
  }
  & .otvet_informations {
    padding: 30px;
    text-align: left;
    display: flow-root;
    & .otvet_information {
      display: flex;
      text-align: left;
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
      text-align: left;
      margin-left: 25px;
      margin-top: 15px;
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
    @media (max-width: 450px) {
      padding: 50px 30px 30px 30px;
    }
  }
`;
export default UIResult;
