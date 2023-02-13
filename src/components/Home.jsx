import { useEffect, useState } from "react";

import { get } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "../utils/httpClient";
import Loyout from "./sections/loyout/Loyout";
import { Container } from "../styleComponents/GlobalCompanyStyle";
import UiCard from "../styleComponents/UiComponents/UiCard";

export default function Home() {
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
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
  return (
    <Loyout>
      <Container>
        <div className="body">
          <div className="title">
            <div></div>
            <div>Выберите компанию</div>
            <div></div>
          </div>
          {company.map(({ name, id, image }) => (
            <Link to={`/conversation-type/${id}`}>
              <UiCard >
                <div  className="companyCardd" key={id}>
                  {name}
                  <img src={image} alt="" />
                </div>
              </UiCard>
            </Link>
          ))}
        </div>
      </Container>
    </Loyout>
  );
}
