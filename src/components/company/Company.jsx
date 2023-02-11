import { useEffect, useState } from "react";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";
import { get } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Company() {
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
    <>
      <Container>
        {console.log("ressas", company)}
        <div className="body">
          <div className="title">Выберите компанию</div>
          {company.map(({ name, id, image }) => (
            <Link to={`/conversation-type/${id}`}>
              <UiCard>
                <div key={id}>
                  {name}
                  <img src={image} alt="" />
                </div>
              </UiCard>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}