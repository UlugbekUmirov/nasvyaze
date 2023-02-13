import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";

export default function Conversation() {
  const { id } = useParams();

  const [company, setCompany] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idd, setIdd] = useState(0);
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
    setIdd(id);
  }, []);

  const getCompany = () => {
    setMainLoading(true);
    Axios()
      .get("/api/v1/questionnaire/companys/")
      .then((res) => {
        setCompany(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };
  ///    if (drugStartE !== id) {
  //let f = objList.find((e) => e?.id === id);
  return (
    <Loyout>
      <Container>
        <div className="body">
          <div className="title">
            <img src="/images/back-arrow-icon 1.svg" alt=""  onClick={() =>navigate('/')}/>
            <div>
              Тип разговора с {''}
              {company
                .filter(({ id }) => id === parseInt(idd))
                .map(({ name }) => name)}
            </div>
            <div></div>
          </div>
          <div className="tip">
            <UiCard
              className="card_comp"
              onClick={() => navigate(`/conversation-type/${id}/new`)}
            >
              <div className="companyCard">
                <p> Новая жалоба</p>
                <img src="/images/Vector (7).svg" alt="" />
              </div>
            </UiCard>
            <UiCard
              className="card_comp"
              onClick={() => navigate(`/conversation-type/${id}/old`)}
            >
              <div className="companyCard">
                <p>Проверка жалобы</p>
                <img src="/images/Vector (8).svg" alt="" />
              </div>
            </UiCard>
          </div>
        </div>
      </Container>
    </Loyout>
  );
}
