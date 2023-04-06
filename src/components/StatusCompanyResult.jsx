import { useParams } from "react-router-dom";
import Loyout from "./sections/loyout/Loyout";
import React, { useEffect, useState } from "react";
import { Container } from "../styleComponents/GlobalCompanyStyle";
import Select from "react-select";
import Axios from "../utils/httpClient";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function StatusCompanyResult() {
  const { id } = useParams();
  const optionMonth = [
    { name: "январь", id: 1 },
    { name: "февраль", id: 2 },
    { name: "март", id: 3 },
    { name: "апрель", id: 4 },
    { name: "май", id: 5 },
    { name: "июнь", id: 6 },
    { name: "июль", id: 7 },
    { name: "август", id: 8 },
    { name: "сентябрь", id: 9 },
    { name: "октябрь", id: 10 },
    { name: "ноябрь", id: 11 },
    { name: "декабрь", id: 12 },
  ];
  const [results, setResults] = useState([]);
  const [company, setCompany] = useState([id]);
  const [startDate, setStartDate] = useState({
    label: optionMonth
      .filter((e) => e?.id === new Date().getMonth())
      .map((e) => e?.name)[0],

    value: new Date().getMonth(),
  });
  const [obj, setObj] = useState({
    label: company
      .filter((e) => {
        return e.id === parseInt(id);
      })
      .map((e) => e.name)[0],
    value: parseInt(
      company
        .filter((e) => {
          return e.id === parseInt(id);
        })
        .map((e) => e.id)[0]
    ),
  });
  const [getYear, setGetYear] = useState({
    label: new Date().getFullYear(),
    value: new Date().getFullYear() - 2020,
  });
  const dispatch = useDispatch();

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
      valueContainer: (styles) => ({
        ...styles,
        padding: "0px 8px",
      }),
      indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: "white",
        with: "0px",
      }),
      indicatorsContainer: (styles) => ({
        ...styles,
        color: "black",
        margin: "13px 14px",
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
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  useEffect(() => {
    getResult();
    getCompany();
  }, [obj, startDate, getYear]);

  const getResult = () => {
    setMainLoading(true);
    Axios()
      .get(
        `/api/v1/application/statistics/?company=${
          obj?.value ? obj?.value : id
        }&year=${getYear?.label}&month=${startDate?.value}`
      )
      .then((res) => {
        setResults(res?.data);
      })
      .finally(() => {
        setMainLoading(false);
      });
  };

  const getCompany = () => {
    setMainLoading(true);
    let s = "";

    Axios()
      .get("/api/v1/questionnaire/companys/")
      .then((res) => {
        setCompany(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };
  const year = new Date().getFullYear();

  const years = [];
  let l = {};
  for (let i = year; i >= 2020; i--) {
    l = { ...l, name: i, id: i - 2020 };
    years.push(l);
  }
  const changeInput = (e) => {
    setObj(e);
    console.log(e, "e");
  };
  const changeYear = (e) => {
    setGetYear(e);
  };
  const changeMonth = (e) => {
    setStartDate(e);
  };
  let summa = 0;
  results.forEach((e) => {
    summa = summa + e?.app_count;
  });
  return (
    <>
      <Loyout>
        <Container>
          {console.log(summa, "oj")}
          <div className="body">
            <div className="title"></div>
            <div className="">
              <form className="forms" style={{ marginBottom: "40px" }}>
                <div className="status_form">
                  <React.Fragment>
                    <div className="input_target">
                      <label htmlFor="">компания</label>
                      <Select
                        {...defaultOptionsss}
                        value={
                          obj?.label !== undefined
                            ? obj
                            : {
                                label: company
                                  .filter((e) => {
                                    return e.id === parseInt(id);
                                  })
                                  .map((e) => e.name)[0],
                                value: parseInt(
                                  company
                                    .filter((e) => {
                                      return e.id === parseInt(id);
                                    })
                                    .map((e) => e.id)[0]
                                ),
                              }
                        }
                        onChange={(value) => changeInput(value)}
                        options={company.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))}
                      />
                    </div>
                    <form className="input_target  input_select_year">
                      <label htmlFor="">год</label>

                      <Select
                        {...defaultOptionsss}
                        onChange={(value) => changeYear(value)}
                        value={getYear}
                        options={years.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))}
                      />
                    </form>
                    <div className="input_target">
                      <label htmlFor="">месяц</label>
                      <Select
                        {...defaultOptionsss}
                        onChange={(value) => changeMonth(value)}
                        value={startDate}
                        options={optionMonth.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))}
                      />
                    </div>
                  </React.Fragment>
                </div>
              </form>
              <div>
                <div style={{ fontSize: "18px", marginBottom: "5px" }}>
                  Общий : <b>{summa}</b>
                </div>
                <table style={{ overflow: "auto" }}>
                  <tr>
                    <th>Тип жалобы</th>
                    <th>Номер</th>
                  </tr>
                  {results && results.length !== 0 ? (
                    results.map(({ tag_name, app_count }) => (
                      <tr>
                        <td>{tag_name}</td>
                        <td>{app_count}</td>
                      </tr>
                    ))
                  ) : (
                    <>нет данных </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Loyout>
    </>
  );
}
