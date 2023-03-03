import { get, result } from "lodash";
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
import UiInput from "../../styleComponents/UiComponents/UiInput";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";
import { FiFilter } from "react-icons/fi";
import { TbRefresh } from "react-icons/tb";
import UiResult from "../../styleComponents/UiComponents/UIResult";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import Modal from "../Modal";

export default function Complaintold() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [findId, setFindId] = useState("");
  const [results, setResults] = useState();
  const [statusModal, setStatusModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [staff, setStaff] = useState(false);
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
    getRole();
    setSearch(searchParams.get("search") ? searchParams.get("search") : "");
    setPage(searchParams.get("page") ? searchParams.get("page") : 1);
  }, [searchParams]);

  const getlist = () => {
    setMainLoading(true);
    let s = "";
    if (search) {
      s = "&search=" + search;
    }

    Axios()
      .get(
        `/api/v1/application/list/?pre_page=5&company=${id}` +
          (s !== "" ? s : "") +
          (page !== "" ? "&page=" + page : "&page=1")
      )
      .then((res) => {
        setResults(get(res, "data.results", []));
        setCount(get(res, "data.count", 1));
      })
      .finally(() => {
        setMainLoading();
      });
  };
  const handlechange = (e) => {
    if (e.target.value == null) {
      setSearch(null);
    } else {
      setSearch(e.target.value);
    }
  };
  const pageshow = (ii) => {
    for (let i = 0; i < count / 10; i++) {
      if (ii === i) {
        setPage(i + 1);
        setSearch(search);
        search
          ? setSearchParams({
              search: search,
              page: i + 1,
            })
          : searchParams.get("")
          ? setSearchParams({
              page: i + 1,
            })
          : search
          ? setSearchParams({
              search: search,
              page: i + 1,
            })
          : setSearchParams({
              page: i + 1,
            });
      }
      setSearch(search);
    }
  };
  const Refresh = () => {
    /* setSearchParams({
      search: "",
      page: 1,
    }); */
    setSearch("");
    setPage(1);
    navigate(`/conversation-type/${id}/old`);
  };
  const handlDelete = () => {
    Axios()
      .post(`/api/v1/application/delete/${findId}/`)
      .then((res) => {
        getlist();
        setFindId("");
      })
      .finally(() => {
        setMainLoading();
        setFindId("");
        setStatusModal(false);
      });
  };
  const getRole = () => {
    setMainLoading(true);
    Axios()
      .get("/api/v1/account/get-role/")
      .then((res) => {
        console.log(res?.data, "res");
        setStaff(res?.data?.is_staff);
      })
      .finally(() => {
        setMainLoading();
      });
  };
  let totalP = [];
  for (let i = 0; i < count / 10; i++) {
    totalP.push(i);
  }
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <>
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
            <form action=" " className="formm">
              <UiInput className="search" onSubmit={(e) => handleSearch(e)}>
                <input
                  type="text"
                  placeholder="Искать"
                  value={search !== null ? search : ""}
                  name="search"
                  onChange={handlechange}
                />
                <button
                  type="submit"
                  style={{ border: "none", marginBottom: "27px", padding: "0" }}
                >
                  <img src="/images/Group (2).svg" alt="" />
                </button>
              </UiInput>
              <div>
                <UiInput className="icons-search" onClick={Refresh}>
                  <TbRefresh size={"2em"} color={"#4F89CB"} />
                </UiInput>
              </div>
            </form>
            {results && results?.length ? (
              <>
                {results.map((results) => (
                  <UiResult>
                    {staff === true ? (
                      <Link to={`/edit/${results?.id}`} className="edit">
                        <MdOutlineModeEditOutline color="black" />
                      </Link>
                    ) : (
                      ""
                    )}

                    <div
                      onClick={() => {
                        setFindId(results?.id);
                        setStatusModal(true);
                      }}
                      className="delete"
                    >
                      <MdDeleteOutline color="black" />
                    </div>
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
                          Маркет: <span>{results?.company?.name}</span>
                        </p>
                      </div>
                      {results?.app_item.map((e) => {
                        return (e?.app_answer).map((ee) => {
                          return (
                            <>
                              <div className="otvet_information">
                                {ee?.question?.type === 1 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer}</span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 2 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer}</span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 3 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer}</span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 4 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>
                                        {" "}
                                        {ee?.select_answer?.map((e) => e?.name)}
                                      </span>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>
                                        {ee?.select_answer?.map((e) => e?.name)}
                                      </span>
                                    </p>
                                  </>
                                )}
                              </div>
                            </>
                          );
                        });
                      })}
                      {results?.reply.toString().length !== 0 ? (
                        <>
                          <div className="otvet_title">Ответ:</div>
                          {results?.reply.map((ee) => {
                            return (
                              <>
                                <div className="otvet">
                                  <p>{ee?.text}</p>
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </UiResult>
                ))}
              </>
            ) : (
              <h4 className="notFoundResult">Not Result Found</h4>
            )}

            <div className="page">
              {totalP.map((ee) => (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    className={
                      parseInt(ee) + 1 === parseInt(page) ? "active" : ""
                    }
                    onClick={() => pageshow(ee)}
                  >
                    {ee + 1}
                  </span>
                </>
              ))}
            </div>
          </div>
        </Container>
        {statusModal === true ? (
          <Modal
            title={"Вы уверены, что хотите удалить?"}
            close={setStatusModal}
            statusYesN={true}
            del={handlDelete}
          />
        ) : null}
      </Loyout>
    </>
  );
}
