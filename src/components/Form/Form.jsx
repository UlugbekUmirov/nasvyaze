import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import Axios from "../../utils/httpClient";
import "rsuite/dist/rsuite.css";
import "react-datetime/css/react-datetime.css";
import Select from "react-select";
import Loyout from "../sections/loyout/Loyout";
import InputMask from "react-input-mask";
import ModalInfo from "../ModalInfo";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "rsuite";
import "react-toastify/dist/ReactToastify.css";

import ModalInfoForm from "../ModalInfoForm";
/* 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers"; */

export default function Form() {
  const navigate = useNavigate();
  const notify = () => toast(`Copied!`);
  const { idd, id } = useParams();

  const [objE, setObjE] = useState({});
  const [question, setQuestion] = useState([]);
  const [complaints, setComplaints] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [company, setCompany] = useState([]);

  const [objErr, setObjErr] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  const dispatch = useDispatch();

  const [iddd, setIddd] = useState(0);
  const [objList, setObjList] = useState([]);
  const [obj, setObj] = useState({
    answers: [[]],
  });

  const [obj2, setObj2] = useState({});

  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  const defaultOptionsss = {
    isMulti: false,
    isSearchable: true,
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
      Option: (styles) => ({
        ...styles,
        zIndex: "9999999999",
        color: "black",
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
    isSearchable: true,
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
      Option: (styles) => ({
        ...styles,
        zIndex: "9999999999",
      }),
      indicatorsContainer: (styles) => ({
        ...styles,
        color: "black",
        margin: "12px 6px",
        minHeight: "25px",
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
        padding: "0px 11px",
      }),
      placeholder: (styles) => ({
        ...styles,
        fontWeight: 400,
        fontSize: "15px",
        marginLeft: "7px",
        lineHeight: "18px",

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
        let lc = [];
        let ls = [];
        get(res, "data", []).forEach((ss) => {
          if (ss?.type === 3) {
            ls.push({
              question: ss?.id,
              answer: get(ss, "select_answer[0].name", ""),
            });
          }
        });
        lc.push(ls);
        setObj({ answers: lc });
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const getForm = () => {
    setMainLoading(true);
    Axios()
      .get(`/api/v1/questionnaire/form-list/${id}/${idd}/`)
      .then((res) => {
        setComplaints(get(res, "data", {}));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const getCompanyyyyy = () => {
    setMainLoading(true);
    Axios()
      .get(`/api/v1/questionnaire/companys/`)
      .then((res) => {
        setCompany(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const handleAdd = () => {
    let ls = [];
    objList.forEach((ss) => {
      if (ss?.type === 3) {
        ls.push({
          question: ss?.id,
          answer: get(ss, "select_answer[0].name", ""),
        });
      }
    });

    setObj({ ...obj, answers: [...obj?.answers, ls] });
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
      if (cc?.question === q_id) {
        ncl = [
          ...ncl,
          {
            ...cc,
            answer: q_type === 6 ? e : e?.target?.value ?? "",
            type: q_type,
          },
        ];
        t = false;
      } else {
        ncl = [...ncl, cc];
      }
    });
    let a = [];
    objErr.forEach((o, index) => {
      if (i === index) {
        let p = o;
        p.oerr[q_id] = false;
        a = [...a, p];
      } else {
        a = [...a, o];
      }
    });
    setObjErr(a);

    if (t) {
      ncl = [
        ...ncl,
        {
          question: q_id,
          answer: q_type === 6 ? e : e?.target?.value ?? "",
          type: q_type,
        },
      ];
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
    let a = [];
    objErr.forEach((o, index) => {
      if (i === index) {
        let p = o;
        p.oerr[q_id] = false;
        a = [...a, p];
      } else {
        a = [...a, o];
      }
    });
    setObjErr(a);

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
    let a = [];
    objErr.forEach((o, index) => {
      if (i === index) {
        let p = o;
        p.oerr[q_id] = false;
        a = [...a, p];
      } else {
        a = [...a, o];
      }
    });
    setObjErr(a);
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
        } else if (ss.type === 6) {
          cl.push({
            question: ss?.question,
            answer: moment(ss?.answer).format("DD-MM-YYYY HH:mm"),
          });
        } else if (ss.type === 7) {
          cl.push({
            question: ss?.question,
            answer: ss?.answer
              .replace(/-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\s/g, "")
              .replace(/_/g, ""),
          });
        } else {
          cl.push({ question: ss?.question, answer: ss?.answer });
        }
      });
      ls.push(cl);
    });

    setMainLoading(true);

    let post_data = {
      ...obj,
      company: parseInt(id),
      form: parseInt(idd),
      answers: ls,
    };

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
  };
  const handleModal = () => {
    setStatusModal(true);
    let errr = [],
      answerErr = true;
    obj?.answers.forEach((anasrersItem, i) => {
      let oerr = {};
      objList.forEach((item, index) => {
        const s = anasrersItem.find((qq) => qq.question === item.id);

        if (
          (s?.answer && item?.type !== 7 && item?.is_required === true) ||
          (item?.is_required === false && item?.type !== 7)
        ) {
          oerr = { ...oerr, [item?.id]: false };
        } else if (
          (item?.type === 7 &&
            s?.answer
              .replace(/-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\+/g, "")
              .replace(/\s/g, "")
              .replace(/_/g, "")
              .toString().length >= 12 &&
            item?.is_required === true) ||
          (item?.is_required === false && item?.type === 7)
        ) {
          oerr = { ...oerr, [item?.id]: false };
        } else {
          oerr = { ...oerr, [item?.id]: true };
          answerErr = false;
        }
      });
      errr = [...errr, { oerr }];
    });
    setObjErr(errr);

    if (answerErr === false) {
      setStatusModal(false);
      window.scrollTo(0, 0);
    } else {
      setStatusModal(true);
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
                // onClick={() => navigate(`/conversation-type/${id}/new`)}
                onClick={() => navigate(-1)}
              />
              <div style={{ padding: "0px 25px" }}>{complaints?.label}</div>
              <div></div>
              {/*   <div>
                <FaQuestion
                  size={"30px"}
                  color="#4F89CB"
                  className="info"
                  onClick={() =>
                    complaints?.info
                      ? setInfoModal(true)
                      : toast("Информация не введена!")
                  }
                ></FaQuestion>
                <ToastContainer />
              </div> */}
            </div>
            {complaints?.info ? (
              <div className="infooo">{complaints?.info}</div>
            ) : (
              ""
            )}
            <form className="forms">
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
                        {i !== 0 ? <hr className="hr" /> : ""}
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
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err input_"
                                          : "input_"
                                      }
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
                                      pattern="[0-9]*"
                                      placeholder={item?.label}
                                      name={question?.id}
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err input_"
                                          : "input_"
                                      }
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
                                        get(item, "select_answer.0.name", "")
                                      )}
                                      defaultValue={get(
                                        item,
                                        "select_answer.0.name",
                                        ""
                                      )}
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err"
                                          : ""
                                      }
                                      name={question?.id}
                                      onChange={(e) => {
                                        changeInput(e, i, item?.id, item?.type);
                                      }}
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
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err"
                                          : ""
                                      }
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
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err"
                                          : ""
                                      }
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

                                    <DatePicker
                                      format="dd-MM-yyyy HH:mm"
                                      placeholder={item?.label}
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err input "
                                          : "input "
                                      }
                                      onChange={(e) => {
                                        changeInput(e, i, item?.id, item?.type);
                                      }}
                                      //disabledDate={disabledDate}
                                      value={
                                        new Date(
                                          get(
                                            get(obj, `answers[${i}]`, []).find(
                                              (qq) => qq.question === item.id
                                            ),
                                            "answer",
                                            new Date()
                                          )
                                        )
                                      }
                                    />
                                    {/*          <input
                                      type="datetime-local"
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err time"
                                          : "time"
                                      }
                                      max="2200-06-07T00:00"
                                      placeholder="дд.мм.гг. - чч.мм."
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                      value={
                                        get(
                                          get(obj, `answers[${i}]`, []).find(
                                            (qq) => qq.question === item.id
                                          ),
                                          "answer",
                                          ""
                                        ) || ""
                                      }
                                    /> */}
                                  </div>
                                </>
                              ) : item.type === 7 ? (
                                <>
                                  <div className="input_target">
                                    <label htmlFor="">{item?.label}</label>
                                    <InputMask
                                      placeholder={item?.label}
                                      formatChars={{
                                        k: "[3-9]",
                                        c: "[0-9]",
                                        b: `[${
                                          (
                                            get(
                                              get(
                                                obj,
                                                `answers[${i}]`,
                                                []
                                              ).find(
                                                (qq) => qq.question === item.id
                                              ),
                                              "answer",
                                              ""
                                            ) || ""
                                          ).slice(6, 7) == 3
                                            ? "3"
                                            : "0"
                                        }-9]`,
                                      }}
                                      mask={`+998 (kb) ccc-cc-cc`}
                                      maskChar=""
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err input_"
                                          : "input_"
                                      }
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
                              ) : item.type === 8 ? (
                                <>
                                  {" "}
                                  <div className="input_target">
                                    <label htmlFor="">{item?.label}</label>

                                    <input
                                      max="2200-06-14"
                                      /*  min="2018-06-07" */
                                      type={"date"}
                                      placeholder={item?.label}
                                      className={
                                        get(
                                          objErr,
                                          `${i}.oerr.${item?.id}`,
                                          false
                                        )
                                          ? "err date input_"
                                          : "date input_"
                                      }
                                      onChange={(e) =>
                                        changeInput(e, i, item?.id, item?.type)
                                      }
                                      value={
                                        get(
                                          get(obj, `answers[${i}]`, []).find(
                                            (qq) => qq.question === item.id
                                          ),
                                          "answer",
                                          ""
                                        ) || ""
                                      }
                                    />
                                  </div>
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
      {infoModal && complaints?.info ? (
        <ModalInfoForm close={setInfoModal} info={complaints?.info} />
      ) : null}
      {statusModal ? (
        <ModalInfo
          title0={"  "}
          title1={"Текст жалобы"}
          // title2={"/images/Vector (10).svg"}
          close={setStatusModal}
          obj2={obj2}
          onCopyText={onCopyText}
          obj={obj}
          notify={notify}
          statusYesN={true}
          send_group={complaints?.send_group}
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
