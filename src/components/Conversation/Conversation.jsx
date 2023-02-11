import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";

export default function Conversation() {
  const { id } = useParams();

  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <div className="body">
          <div className="title">Тип разговора</div>
          <UiCard onClick={()=>navigate(`/conversation-type/${id}/new`)}>
            <div className="companyCard">Новая жалоба</div>
          </UiCard>
          <UiCard onClick={()=>navigate(`/conversation-type/${id}/old`)}>
            <div className="companyCard">Проверка статуса жалобы</div>
          </UiCard>
        </div>
      </Container>
    </>
  );
}
