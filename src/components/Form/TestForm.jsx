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
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TestForm = () => {
  const [obj, setObj] = useState({
    answers: [[]],
  });
  const [objList, setObjList] = useState([]);
  const dispatch = useDispatch();
  const { idd, id } = useParams();

  useEffect(() => {
    getQuestion();
  }, []);

  const changeInput = (e, i, q_id, q_type) => {
    let l = get(obj, "answers", []);
    let cl = get(l, `[${i}]`, []);
    let ncl = [],
      t = true;

    cl.forEach((cc) => {
      if (cc?.question === q_id) {
        ncl = [...ncl, { ...cc, answer: e.target.value, type: q_type }];
        t = false;
      } else {
        ncl = [...ncl, cc];
      }
    });
    if (t) {
      ncl = [...ncl, { question: q_id, answer: e }];
    }
    l[i] = ncl;

    setObj({ ...obj, answers: l });
  };

  const selectAnswer = (val, i, q_id, q_type) => {
    console.log(val);

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
      ncl = [...ncl, { question: q_id, answer: val }];
    }
    l[i] = ncl;
    setObj({
      ...obj,
      answers: l,
    });
  };

  const handleAdd = () => {
    setObj({ ...obj, answers: [...obj?.answers, []] });
  };

  //  const handlechangeSingle = (e, i, question_id) => {
  //   const inputdata = [...val];
  //   inputdata[i] = e.value;
  //   setVal(inputdata);
  //   console.log(e, "e");
  //   setArr(
  //     val.map((ee) => {
  //       return [{ 'question': question_id, label: ee }];
  //     })
  //   );
  // };

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

  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  return (
    <div>
      <form>
        {objList && objList?.length > 0 ? (
          <>
            {obj?.answers.map((anasrersItem, i) => {
              return (
                <Flex>
                  {console.log("==>", obj?.answers)}
                  {objList.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {item.type === 1 ? (
                          <input
                            type="text"
                            value={anasrersItem?.answer}
                            name="question"
                            onChange={(e) =>
                              changeInput(e, i, item?.id, item?.type)
                            }
                            placeholder="question"
                          />
                        ) : item.type === 4 ? (
                          <Select
                            onChange={(value) =>
                              selectAnswer(value, i, item?.id, item?.type)
                            }
                            value={get(
                              get(obj, `answers[${i}]`, []).find(
                                (qq) => qq.question === item?.id
                              ),
                              "answer",
                              {}
                            )}
                            name="answer"
                            options={item.select_answer.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))}
                            placeholder="Выбрать из списка"
                          />
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </Flex>
              );
            })}
          </>
        ) : null}
      </form>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TestForm;
