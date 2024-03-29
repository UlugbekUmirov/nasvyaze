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
import UiInput from "../../styleComponents/UiComponents/UiInput";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";
import { TbRefresh } from "react-icons/tb";
import UiResult from "../../styleComponents/UiComponents/UIResult";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import Modal from "../Modal";
import { Pagination } from "@nextui-org/react";
import { CPagination, CPaginationItem } from "@coreui/react";
import { CSmartPagination } from "@coreui/react-pro";

export default function Complaintold() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [findId, setFindId] = useState("");
  const [results, setResults] = useState();
  const [statusModal, setStatusModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(true);
  const [staff, setStaff] = useState(false);
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [page, setPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : 1
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
        `/api/v1/application/list/?pre_page=10&company=${id}` +
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
  const pageshow = (p) => {
    setPage(p);
    setSearch(search);
    search
      ? setSearchParams({
          search: search,
          page: p,
        })
      : searchParams.get("")
      ? setSearchParams({
          page: p,
        })
      : search
      ? setSearchParams({
          search: search,
          page: p,
        })
      : setSearchParams({
          page: p,
        });
  };
  const Refresh = () => {
    setSearch("");
    setPage(1);
    navigate(`/conversation-type/${id}/old`);
  };
  const handlDelete = () => {
    setMainLoading(true);
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
        setStaff(res?.data?.is_staff);
        setActive(res?.is_active);
        dispatch({
          type: "IS_ACTIVE",
          payload: res?.is_active,
        });
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  let totalP = [];
  for (let i = 0; i < count / 10; i++) {
    totalP.push(i);
  }
  const handleSearch = (e) => {
    e.preventDefault();

    if (search !== "") {
      setSearchParams({
        // ...searchParams,
        search: search,
        page: 1,
      });
    } else {
      setSearchParams({
        // ...searchParams,
        search: "",
        page: 1,
      });
      navigate("/conversation-type/9/old");
    }
  };
  return (
    <>
      <Loyout>
        <Container>
          <div className="body complaint-old">
            <div className="title">
              <img
                src="/images/back-arrow-icon 1.svg"
                alt=""
                onClick={() => navigate(`/conversation-type/${id}`)}
              />

              <div>Тип жалобы</div>
              <div></div>
            </div>
            <form className="formm" onSubmit={handleSearch}>
              <UiInput className="search">
                {/*  <label
                  htmlFor="
              "
                > */}
                <input
                  type="text"
                  placeholder="Искать"
                  value={search !== null ? search : ""}
                  name="search"
                  onChange={handlechange}
                />
                {/*  </label> */}
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
                      <>
                        <Link
                          to={`/edit/${results?.company?.id}/${results?.form?.id}/${results?.id}/`}
                          className="edit"
                        >
                          <MdOutlineModeEditOutline color="black" size={16} />
                        </Link>
                        <div
                          onClick={() => {
                            setFindId(results?.id);
                            setStatusModal(true);
                          }}
                          className="delete"
                        >
                          <MdDeleteOutline color="black" size={16} />
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div className="otvet_informations">
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
                                      {ee?.question?.name} :
                                      <span>
                                        {" "}
                                        {ee?.select_answer?.map((e) => e?.name)}
                                      </span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 5 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>
                                        {ee?.select_answer?.map((e) => e?.name)}
                                      </span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 6 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer.replace(/T/, " ")}</span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 7 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer}</span>
                                    </p>
                                  </>
                                ) : ee?.question?.type === 8 ? (
                                  <>
                                    <p>
                                      {ee?.question?.name} :{" "}
                                      <span>{ee.answer}</span>
                                    </p>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </>
                          );
                        });
                      })}
                      {
                        <div className="otvet_information">
                          <p>
                            Оператор:{" "}
                            <span>
                              {results?.operator?.operator_name
                                ? results?.operator?.operator_name
                                : `№ ` + results?.operator?.id}
                            </span>
                          </p>
                        </div>
                      }
                      {results?.reply.toString().length !== 0 ? (
                        <>
                          <div className="otvet_title">Ответ:</div>
                          {results?.reply.map((ee) => {
                            return (
                              <>
                                <div className="otvet">
                                  <p>{ee?.text}</p>
                                  <span
                                    style={{
                                      textAlign: "end",
                                      display: "flex",
                                      flexDirection: "column",
                                      fontSize: "12px",
                                      color: "rgb(120, 120, 120)",
                                    }}
                                  >
                                    <>
                                      {" "}
                                      {ee?.created_at
                                        .replace("T", " ")
                                        .slice(0, 16)}
                                    </>
                                  </span>
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
              <h4 className="notFoundResult">Результат не найден!</h4>
            )}
            {results && results.toString().length !== 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "40px 0px",
                }}
              >
                {/* <Pagination
                  total={totalP.length}
                  initialPage={parseInt(page)}
                  onChange={pageshow}
                /> */}
                <CSmartPagination
                  align="center"
                  pages={totalP.length}
                  onActivePageChange={pageshow}
                  activePage={parseInt(page)}
                />
              </div>
            ) : (
              <></>
            )}
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
