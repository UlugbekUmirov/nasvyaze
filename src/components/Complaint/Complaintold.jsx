import { get, result } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import UiInput from "../../styleComponents/UiComponents/UiInput";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";

export default function Complaintold() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [results, setResults] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [page, setPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : ""
  );
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getlist();
    setSearch(searchParams.get("search") ? searchParams.get("search") : "");
    setPage(searchParams.get("page") ? searchParams.get("page") : 1);
  }, [searchParams]);
  const getlist = () => {
    //setMainLoading(true);
    let s = "";
    if (search) {
      s = "search=" + search;
    }
    Axios()
      .get(
        `/api/v1/application/list/?` +
          (s !== "" ? s : "") +
          /*  +
          "page=" +
          page */
          `&company=${id}`
      )
      .then((res) => {
        setResults(get(res, "data.results", []));
      });
  };
  const handlechange = (e) => {
    setSearch(e.target.value);
  };
  const pageshow = (e) => {
    console.log(e, "e");

    for (let i = 0; i < results?.length; i++) {
      if (e === i) {
        setPage(i + 1);
      }
      setSearch(search);
    }
    console.log(page, "p");
  };

  let totalP = [];
  for (let i = 0; i < results?.length; i++) {
    totalP.push(i);
  }
  const handleSearch = () => {};
  return (
    <Loyout>
      <Container>
        <div className="body complaint-old">
          <div className="title">
            <div>
              <img
                src="/images/back-arrow-icon 1.svg"
                alt=""
                onClick={() => navigate(`/conversation-type/${id}`)}
              />
            </div>
            <div>Тип жалобы</div>
            <div></div>
          </div>
          <form action=" " className="">
            <UiInput className="search">
              <input
                type="text"
                placeholder="Искать"
                value={search !== null ? search : ""}
                name="search"
                onChange={handlechange}
              />
              <img src="/images/Group (2).svg" alt="" />
            </UiInput>
          </form>
          {results && results?.length ? (
            <>
              {results.map((results) => (
                <UiCard>
                  <div className="otvet_informations">
                    <div className="otvet_information">
                      <p>
                        Ф.И.О клиента: <span>{results?.full_name}</span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Контакт: <span>{results?.phone}</span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Маркет: <span>Дархан Smart</span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Дата и время покупки:
                        <span> 04.02.2023 13:00:37 Цена: 26.800</span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Цена: <span>26.800, чек имеется</span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Суть обращения:
                        <span>
                          жалуется на качество сыра Валио пахнет химикатом
                          пленка была не пищевая
                        </span>
                      </p>
                    </div>
                    <div className="otvet_information">
                      <p>
                        Звонили с номера: <span>95010374</span>
                      </p>
                    </div>
                    <div className="otvet_title">Ответ:</div>
                    <div className="otvet">
                      <p>
                        Клиент нечаянно нажал на кнопку о потери повербанка,
                        просит вернуть денежные средства, видео отправит через
                        бот
                      </p>
                    </div>
                  </div>
                </UiCard>
              ))}
            </>
          ) : (
            <></>
          )}

          <div className="page">
            {totalP.map((ee) => (
              <>
                <span onClick={pageshow}>{ee + 1}</span>
              </>
            ))}
          </div>
        </div>
      </Container>
    </Loyout>
  );
}
