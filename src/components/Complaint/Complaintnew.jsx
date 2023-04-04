import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
  const [parentt, setParent] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
    setIdd(id);
    setParent(
      parseInt(searchParams.get("parent"))
        ? parseInt(searchParams.get("parent"))
        : null
    );
  }, [searchParams]);

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
  const getChild = (i) => {
    setParent(i);
    const o = company.filter((parent) => i === parent.parent);
    if (o.length === 0) {
      navigate(`/conversation-type/${idd}/${i}/new`);
    } else {
      navigate(`/conversation-type/${idd}/new?parent=${i}`);
    }
  };
  const GoBack = () => {
    /* if (index.length === 1) {
      navigate("/conversation-type/" + idd);
    } else {
      setParent(index[index.length - 2]);
      setIndex(index.slice(0, index.length - 1));
    } */
    navigate(-1);
  };
  return (
    <Loyout>
      {console.log(company?.toString()?.length , 'c')}
      <Container>
        <div className="body">
          <div className="title">
            <img src="/images/back-arrow-icon 1.svg" alt="" onClick={GoBack} />
            <div>Новая жалоба</div>
            <div></div>
          </div>
          <div className={company.length === 1 ? `` : `new_problem`}>
            {company
              ? company
                  .filter((parent) => parentt === parent.parent)
                  .map(({ label, id, parent }) => (
                    <>
                      <UiCard key={id} onClick={() => getChild(id)}>
                        <div className="companyCardd">
                          <span>{label}</span>
                        </div>
                      </UiCard>
                    </>
                  ))
              : ""}
          </div>
        </div>
      </Container>
    </Loyout>
  );
}
