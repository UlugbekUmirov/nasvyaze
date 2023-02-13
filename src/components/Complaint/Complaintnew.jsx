import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";

export default function Complaint() {
  const { id } = useParams();

  const [company, setCompany] = useState([]);
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
      .get(`/api/v1/questionnaire/form-list/${id}/`)
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
            <img
              src="/images/back-arrow-icon 1.svg"
              alt=""
              onClick={() => navigate(`/conversation-type/${id}`)}
            />
            <div>Новая жалоба</div>
            <div></div>
          </div>
          {company
            ? company.map(({ label, id }) => (
                <>
                  <UiCard
                    key={id}
                    onClick={() =>
                      navigate(`/conversation-type/${idd}/${id}/new`)
                    }
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      className="companyCardd"
                      to={`/conversation-type/${idd}/${id}/new`}
                    >
                      <span>{label}</span>
                    </Link>
                  </UiCard>
                </>
              ))
            : ""}
        </div>
      </Container>
    </Loyout>
  );
}
