import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "../../styleComponents/MyApplication/MyApplication";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import Axios from "../../utils/httpClient";
import Loyout from "../sections/loyout/Loyout";
import InputMask from "react-input-mask";
import UIResult from "../../styleComponents/UiComponents/UIResult";
export default function Applications() {
  const [company, setCompany] = useState([]);
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [answer, setAnswer] = useState(
    searchParams.get("company") ? searchParams.get("company") : ""
  );
  const [phone, setPhone] = useState(
    searchParams.get("phone") ? searchParams.get("phone") : ""
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
    setAnswer(searchParams.get("company") ? searchParams.get("company") : "");
    setPhone(searchParams.get("phone") ? searchParams.get("phone") : "");
    getlist();
  }, [searchParams]);

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
  const Client = (ee) => {
    setAnswer(ee.target.value);
    // const inputValueToUrll = encodeURI(ee.target.value);

    getlist(
      searchParams.get("phone") ? searchParams.get("phone") : "",
      ee.target.value
    );
    //window.location.href = "?company=" + inputValueToUrll;
  };
  const PhoneNum = (e) => {
    setPhone(e.target.value);
    const inputValueToUrl = encodeURI(
      e.target.value
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "")
        .replace(/\s/g, "")
        .replace(/_/g, "")
    );

    if (
      e.target.value
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "")
        .replace(/\s/g, "")
        .replace(/_/g, "")
        .toString().length === 12
    ) {
      getlist(
        e.target.value,
        searchParams.get("company") ? searchParams.get("company") : ""
      );
      window.location.href = "?phone=" + inputValueToUrl;
    }
  };
  const Clear = () => {
    setAnswer("");
    setPhone("");
    navigate("/my-applications");
  };
  const getlist = (phoneNum = phone, Client = answer) => {
    setMainLoading(true);
    Axios()
      .get(
        `/api/v1/application/list/?is_my=1` +
          (Client !== "" ? `&company=${Client}` : "") +
          (phoneNum
            .replace(/-/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/\+/g, "")
            .replace(/\s/g, "")
            .replace(/_/g, "")
            .toString().length === 12
            ? `&phone=${phoneNum
                .replace(/-/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .replace(/\+/g, "")
                .replace(/\s/g, "")
                .replace(/_/g, "")}`
            : "")
      )
      .then((res) => {
        setResults(get(res, "data.results", []));
      })
      .finally(() => {
        setMainLoading();
      });
  };

  return (
    <>
      <Loyout>
        <Container>
          {console.log(answer, "aa")}
          <div className="body">
            <div className="filter">
              <h4>Клиент</h4>
              {company.map((ee) => (
                <div className="client">
                  <label htmlFor={"company" + ee?.id}>
                    <input
                      onChange={(e) => Client(e)}
                      id={"company" + ee?.id}
                      type="radio"
                      value={ee?.id}
                      className="checkbox"
                      checked={ee?.id == answer}
                    />
                    <p>{ee?.name}</p>
                  </label>
                </div>
              ))}

              <h4>Номер телефона</h4>
              <InputMask
                className="InputMask"
                placeholder="+998 __ ___ __ __"
                formatChars={{ b: "[0-9]" }}
                mask="+998 (bb) bbb-bb-bb"
                maskChar=""
                name="phone"
                value={phone || ""}
                onChange={(e) => PhoneNum(e)}
                //  onFocus={() => setSmsInvalid(false)}
              />

              <button className="clear" onClick={Clear}>
                Сбросить все фильтры
              </button>
            </div>
            <div className="results">
              <div className="title">
                <img
                  src="/images/back-arrow-icon 1.svg"
                  alt=""
                  onClick={() => navigate(-1)}
                />
                <div>
                  <div style={{ margin: "0" }}>Мои заявки</div>
                </div>
                <div>{""}</div>
              </div>
              {results && results?.length ? (
                <>
                  {results.map((results) => (
                    <UIResult>
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
                                          {ee?.select_answer?.map(
                                            (e) => e?.name
                                          )}
                                        </span>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p>
                                        {ee?.question?.name} :{" "}
                                        <span>
                                          {ee?.select_answer?.map(
                                            (e) => e?.name
                                          )}
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
                    </UIResult>
                  ))}
                </>
              ) : (
                <div
                  className="notFoundResult"
                  style={{ marginLeft: "14px", marginBottom: "20px" }}
                >
                  {" "}
                  <h4>Not Result Found! </h4>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Loyout>
    </>
  );
}
