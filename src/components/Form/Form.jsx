import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import Axios from "../../utils/httpClient";
import Select from "react-select";
import Loyout from "../sections/loyout/Loyout";
import InputMask from "react-input-mask";
import ModalInfo from "../ModalInfo";
import Datetime from "react-datetime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const navigate = useNavigate();
  const notify = () => toast(`Copied!`);
  const { idd, id } = useParams();

  const [objE, setObjE] = useState({});
  const [question, setQuestion] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [company, setCompany] = useState([]);
  const [errP, setErrP] = useState(false);
  const [errN, setErrN] = useState(false);
  const dispatch = useDispatch();
  const [iddd, setIddd] = useState(0);

  const [obj, setObj] = useState({
    answers: [[]],
  });

  const [obj2, setObj2] = useState({});
  const [objList, setObjList] = useState([]);

  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  const defaultOptionsss = {
    isMulti: false,
    isSearchable: false,
    isDisabled: false,
    styles: {
      control: (styles) => ({
        ...styles,
        width: "100%",
        maxHeight: "48px",
        border: "none",
        borderRadius: "12px",
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:hover": {
          borderColor: "#CED5DC",
        },
      }),
      indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: "white",
        with: "0px",
      }),
      indicatorsContainer: (styles) => ({
        ...styles,
        color: "black",
        margin: "10px 14px",
        height: "25px",
        width: "25px",
        //  border: "2px solid #4F89CB",
        borderRadius: "50%",
      }),
      indicatorContainer: (styles) => ({
        ...styles,
        padding: "0px",
      }),
      MultiValueGeneric: (styles) => ({
        ...styles,
        paddingTop: "10px",
      }),
      multiValue: (styles) => ({
        ...styles,
        maxHeight: "35px",
        borderRadius: "5px",
        marginLeft: "-6px",
        marginRight: "8px",
        background: "#F4F6F9",
      }),
      placeholder: (styles) => ({
        ...styles,
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "18px",
      }),
    },
  };
  const defaultOptionss = {
    isMulti: true,
    isSearchable: false,
    isDisabled: false,
    styles: {
      control: (styles) => ({
        ...styles,
        width: "100%",
        maxHeight: "48px",
        border: "none",
        borderRadius: "12px",
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:hover": {
          borderColor: "#CED5DC",
        },
      }),
      indicatorContainer: (styles) => ({
        ...styles,
        /*  backgroundColor: "white",
        with: "0px", */
        margin: "0px 5px",
        height: "25px",
        width: "25px",
        border: "2px solid #4F89CB",
        borderRadius: "50%",
      }),
      indicatorsContainer: (styles) => ({
        ...styles,
        color: "black",
        margin: "12px 6px",
        height: "25px",
      }),
      indicatorSeparator: (styles) => ({
        ...styles,
        padding: "0px",
      }),
      MultiValueGeneric: (styles) => ({
        ...styles,
        paddingTop: "10px",
      }),
      multiValue: (styles) => ({
        ...styles,
        maxHeight: "35px",
        borderRadius: "5px",
        marginLeft: "-6px",
        padding: "5px 5px  5px",
        marginRight: "8px",
        background: "#F4F6F9",
      }),
      valueContainer: (styles) => ({
        ...styles,
        padding: "7px 11px",
      }),
      placeholder: (styles) => ({
        ...styles,
        fontWeight: 400,
        fontSize: "15px",
        marginLeft: "7px",
        lineHeight: "18px",
        paddingBottom: "11px",
        paddinfLeft: "7px",
      }),
    },
  };
  useEffect(() => {
    getQuestion();
    getForm();
    setIddd(idd);
    getCompanyyyyy();
    // setObjE({ ...objE, login: false, common: false });
  }, []);
  const handlechangeInput = (e) => {
    setObj2({ ...obj2, [e.target.name]: e.target.value });
    setObjE({ ...objE, [e.target.name]: false });
  };
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const getQuestion = () => {
    setMainLoading(true);
    Axios()
      .get(`/api/v1/questionnaire/question-list/${id}/${idd}/`)
      .then((res) => {
        setObjList(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const getForm = () => {
    setMainLoading(true);
    Axios()
      .get(`/api/v1/questionnaire/form-list/${id}/`)
      .then((res) => {
        setComplaints(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const getCompanyyyyy = () => {
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

  const handleAdd = () => {
    setObj({ ...obj, answers: [...obj?.answers, []] });
  };
  const handlDelete = (i) => {
    let l = [];
    const objj = { ...obj, answers: [...obj?.answers] };
    objj?.answers.forEach((item, index) => {
      if (i !== index) {
        l.push(item);
      }
    });
    setObj({ ...obj, answers: l });
  };

  const changeInput = (e, i, q_id, q_type) => {
    let l = get(obj, "answers", []);
    let cl = get(l, `[${i}]`, []);
    let ncl = [],
      t = true;

    cl.forEach((cc) => {
      console.log(cc, "cc");
      if (cc?.question === q_id) {
        ncl = [...ncl, { ...cc, answer: e?.target?.value ?? "", type: q_type }];
        t = false;
      } else {
        ncl = [...ncl, cc];
      }
    });
    if (t) {
      ncl = [...ncl, { question: q_id, answer: e?.target?.value }];
    }
    l[i] = ncl;

    setObj({ ...obj, answers: l });
  };
  const selectAnswer = (val, i, q_id, q_type) => {
    let l = get(obj, "answers", []);
    let cl = get(l, `[${i}]`, []);
    let ncl = [],
      t = true;
    cl.forEach((qq) => {
      if (qq?.question === q_id) {
        ncl = [...ncl, { ...qq, answer: val, type: q_type }];
        t = false;
      } else {
        ncl = [...ncl, qq];
      }
    });
    if (t) {
      ncl = [...ncl, { question: q_id, answer: val, type: q_type }];
    }

    l[i] = ncl;
    setObj({
      ...obj,
      answers: l,
    });
  };
  const selectAnswerMulti = (val, i, q_id, q_type) => {
    let l = get(obj, "answers", []);
    let cl = get(l, `[${i}]`, []);
    let ncl = [],
      t = true;
    cl.forEach((qq) => {
      if (qq?.question === q_id) {
        ncl = [...ncl, { ...qq, answer: val, type: q_type }];
        t = false;
      } else {
        ncl = [...ncl, qq];
      }
    });
    if (t) {
      ncl = [...ncl, { question: q_id, answer: val, type: q_type }];
    }
    l[i] = ncl;
    setObj({
      ...obj,
      answers: l,
    });
  };
  const handleSumbit = () => {
    let ls = [];

    const objs = { ...obj, answers: [...obj?.answers] };
    objs?.answers.forEach((qq, index) => {
      let cl = [];
      qq.forEach((ss) => {
        if (ss.type === 4) {
          cl.push({ question: ss?.question, answer: ss?.answer?.value });
        } else if (ss.type === 5) {
          cl.push({
            question: ss?.question,
            answer: ss?.answer.map((e) => e.value),
          });
        } else {
          cl.push({ question: ss?.question, answer: ss?.answer });
        }
      });
      ls.push(cl);
    });

    let t = true,
      err = {};

    if (!obj2?.phone) {
      t = false;
      err = { ...err, phone: true };
    }

    setMainLoading(true);

    let post_data = {
      ...obj,
      full_name: obj2?.full_name,
      company: parseInt(id),
      form: parseInt(idd),
      answers: ls,
      phone: obj2?.phone
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "")
        .replace(/\s/g, "")
        .replace(/_/g, ""),
    };
    if (t) {
      Axios()
        .post("/api/v1/application/create/", post_data)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          setObjE(err);
        })
        .finally(() => {
          setMainLoading(false);
        });
    }
  };
  const handleModal = () => {
    setStatusModal(true);
    if (
      obj2?.phone === "" ||
      obj2?.phone === undefined ||
      obj2?.full_name === "" ||
      obj2?.full_name === undefined ||
      get(obj2?.phone, "phone", "").replace(/-/g, "").toString().length < 10
    ) {
      setStatusModal(false);
      //setErr(true);
    }
    if (
      //  get(obj2?.phone, "phone", "").replace(/-/g, "").toString().length < 10 ||
      obj2?.phone == undefined ||
      obj2?.phone == ""
    ) {
      setErrP(true);
    } else {
      setErrP(false);
      setStatusModal(true);
    }
    if (obj2?.full_name === "" || obj2?.full_name === undefined) {
      setErrN(true);
    } else {
      setErrN(false);
    }
  };
  return (
    <>
      <Loyout>
        <Container>
          <div className="body">
            <div className="title">
              <img
                src="/images/back-arrow-icon 1.svg"
                alt=""
                onClick={() => navigate(`/conversation-type/${id}/new`)}
              />
              <div>
                Жалоба на{" "}
                {complaints
                  .filter(({ id }) => id === parseInt(iddd))
                  .map(({ label }) => label)}
              </div>
              <div></div>
            </div>
            <form className="forms">
              <div className="create">
                <div className="input_target">
                  <label>ФИО Заявителя</label>
                  <input
                    type="text"
                    placeholder="ФИО"
                    name="full_name"
                    value={obj2?.full_name || ""}
                    className={errN ? "err " : ""}
                    onChange={(e) => {
                      handlechangeInput(e);
                      setErrN(false);
                    }}
                  />
                </div>
                <div className="input_target">
                  <label>Телефон номер для обращения</label>
                  <InputMask
                    placeholder="+998 __ ___ __ __"
                    formatChars={{ b: "[0-9]", k: "[33-99]" }}
                    mask="+998 (kk) bbb-bb-bb"
                    maskChar=""
                    name="phone"
                    className={errP ? "err InputMask" : "InputMask"}
                    value={obj2?.phone || ""}
                    onChange={(e) => {
                      handlechangeInput(e);
                      setErrP(false);
                    }}
                    //  onFocus={() => setSmsInvalid(false)}
                  />
                </div>
              </div>
              {obj?.answers.map((anasrersItem, i) => {
                return (
                  <>
                    {obj?.answers ? (
                      <div>
                        <div className="complaint">
                          <div></div>
                          {i !== 0 ? (
                            <div
                              onClick={() => handlDelete(i)}
                              className="close"
                            >
                              <div>
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABq0lEQVR4nO2WS0oDQRCGv73BlQY1EVGDeheNax8n0MSFxIu4U/EAEo2rGO+hoHgLTdzEZBhp+ANNZ5xHj0EX+WCg6aqu6q7pqmqYMiUby0AdeARegU99ZtwBakCZCVACLoEBECZ8AdAEVn7L+S7QlfE+cAPsAZvAjD4z3pesL12zpprX+YlOFOpUqynWrAF3VjTML/M+eQAMgVOP9Q2tDXwiUbLC7uPc3oSx8QEsZll4bYU9Ly3ZMpc4daoNdZmi/vkRUIyYL0rmsi5bA0U2kbp2bG60y7Fkz84mipoLpePSjJGN0ZGySSsX29FoE1FzLoeSt0nBm5Q3fpC7DpOcozoRqmIm0pNyIUZnHniyqp8xvBCjX5CesZ1I13MDcWk2a6Xj//8Fnb++hLUJpmFUnRijrKLRV2PJW4gqWQuR4Uo7Nl0tL/eydZFl0ZKVDaah+HImG+8JaRpJ1WrHDU/no3a8jSd160HSUmNJomKFPdClzsWOCsjoSWZu9AGwpWJV0Nik2i3wZYXd++Quc8B5ykfpQL0/0wMkLSWl2gPwotre07gtWepUmzLF8A3lSrGRZtYFBAAAAABJRU5ErkJggg=="
                                  alt=""
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {/*   <hr /> */}
                        <hr
                          style={{
                            marginTop: "23px",
                            border: "1px solid #8F939A",
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="create">
                      {objList?.toString().length !== 0 ? (
                        <>
                          {objList.map((item, index) => (
                            <React.Fragment key={index}>
                              {item.type === 1 ? (
                                <>
                                  <div className="input_target">
                                    <label>{item?.label}</label>
                                    <input
                                      type="text"
                                      placeholder={item?.label}
                                      name={question?.id}
                                      value={get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item.id
                                        ),
                                        "answer",
                                        ""
                                      )}
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                    />
                                  </div>
                                </>
                              ) : item.type === 2 ? (
                                <>
                                  <div className="input_target">
                                    <label>{item?.label}</label>
                                    <input
                                      type="number"
                                      placeholder={item?.label}
                                      name={question?.id}
                                      value={get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item.id
                                        ),
                                        "answer",
                                        ""
                                      )}
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                    />
                                  </div>
                                </>
                              ) : item.type === 3 ? (
                                <>
                                  <div className="input_target2">
                                    <label>{item?.label}</label>
                                    <textarea
                                      placeholder={item?.label}
                                      value={get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item.id
                                        ),
                                        "answer",
                                        ""
                                      )}
                                      name={question?.id}
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                    ></textarea>
                                  </div>
                                </>
                              ) : item.type === 4 ? (
                                <>
                                  <div className="input_target">
                                    <label>{item?.label}</label>
                                    <Select
                                      {...defaultOptionsss}
                                      value={get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item?.id
                                        ),
                                        "answer",
                                        null
                                      )}
                                      onChange={(value) =>
                                        selectAnswer(
                                          value,
                                          i,
                                          item?.id,
                                          item?.type
                                        )
                                      }
                                      name={question?.id}
                                      options={item.select_answer.map(
                                        ({ id, name }) => ({
                                          label: name,
                                          value: id,
                                        })
                                      )}
                                      placeholder={item?.label}
                                    />
                                  </div>
                                </>
                              ) : item.type === 5 ? (
                                <>
                                  <div className="input_target">
                                    <label>{item?.label}</label>
                                    <Select
                                      {...defaultOptionss}
                                      onChange={(value) =>
                                        selectAnswerMulti(
                                          value,
                                          i,
                                          item?.id,
                                          item?.type
                                        )
                                      }
                                      value={get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item?.id
                                        ),
                                        "answer",
                                        []
                                      )}
                                      name={question?.id}
                                      options={item.select_answer.map(
                                        ({ id, name }) => ({
                                          label: name,
                                          value: id,
                                        })
                                      )}
                                      placeholder={item?.label}
                                    />
                                  </div>
                                </>
                              ) : item.type === 6 ? (
                                <>
                                  <div className="input_target">
                                    <label htmlFor="">{item?.label}</label>
                                    <InputMask
                                      placeholder="дд.мм.гг. - чч.мм."
                                      formatChars={{ B: "[0-9]" }}
                                      mask="BBBB-BB-BB BB:BB"
                                      maskChar=""
                                      name={question?.id}
                                      value={
                                        get(
                                          get(obj, `answers[${i}]`, []).find(
                                            (qq) => qq.question === item.id
                                          ),
                                          "answer",
                                          ""
                                        ) || ""
                                      }
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                    />
                                  </div>
                                </>
                              ) : item.type === 7 ? (
                                <>
                                  <InputMask
                                    placeholder="+998 __ ___ __ __"
                                    formatChars={{ b: "[0-9]", k: "[33-99]" }}
                                    mask="+998 (kk) bbb-bb-bb"
                                    maskChar=""
                                    name={question?.id}
                                    value={
                                      get(
                                        get(obj, `answers[${i}]`, []).find(
                                          (qq) => qq.question === item.id
                                        ),
                                        "answer",
                                        ""
                                      ) || ""
                                    }
                                    onChange={(e) =>
                                      changeInput(e, i, item?.id, item?.type)
                                    }
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      ) : (
                        <div style={{ textAlign: "center" }}>нет данных</div>
                      )}
                    </div>
                  </>
                );
              })}
              <div className="create create-button">
                {objList && objList?.toString().length ? (
                  <>
                    <div className="input_target3">
                      <input
                        className="button_add"
                        value={"+ Дополнительная жалоба"}
                        type="button"
                        onClick={handleAdd}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input_target3">
                      <input
                        className="button_add"
                        value={"+ Дополнительная жалоба"}
                        type="button"
                        //onClick={handleAdd}
                      />
                    </div>
                  </>
                )}

                <div className="input_target3">
                  <input
                    onClick={handleModal}
                    className="button_copy"
                    value={"Отправить"}
                    type="button"
                  />
                </div>
              </div>
            </form>
          </div>
        </Container>
      </Loyout>
      {statusModal ? (
        <ModalInfo
          title0={"  "}
          title1={"Тескт жалобы"}
          // title2={"/images/Vector (10).svg"}
          close={setStatusModal}
          market={`${"m"}`}
          data={`${"d"}`}
          obj2={obj2}
          onCopyText={onCopyText}
          summa={`${"s"}`}
          obj={obj}
          notify={notify}
          statusYesN={true}
          objList={objList}
          company={company
            .filter((i) => i.id === parseInt(id))
            .map(({ name }) => name)}
          isCopied={isCopied}
          del={handleSumbit}
        />
      ) : null}
    </>
  );
}
