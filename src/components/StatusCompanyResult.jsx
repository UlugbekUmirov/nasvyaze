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
  const [results, setResults] = useState([]);
  const [company, setCompany] = useState([id]);
  const [startDate, setStartDate] = useState(new Date());
  const [obj, setObj] = useState({});
  const [getYear, setGetYear] = useState(new Date().getFullYear());
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
        padding:"0px 8px"
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
        }&year=${getYear}&month=${startDate.getMonth() + 1}`
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
  for (let i = 2020; i <= year; i++) {
    years.push(i);
  }
  const changeYear = (e) => {
    setGetYear(e.target.value);
    console.log(e, "e");
  };
  return (
    <>
      <Loyout>
        <Container>
          {console.log(obj?.id, "oj")}
          <div className="body">
            <div className="title"></div>
            <div className="">
              <form className="forms" style={{ marginBottom: "40px" }}>
                <div className="status_form">
                  <React.Fragment>
                    <div className="input_target">
                      <label htmlFor="">company</label>
                      <Select
                        {...defaultOptionsss}
                        value={
                          obj?.id !== undefined
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
                        onChange={(value) => setObj(value)}
                        options={company.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))}
                      />
                    </div>
                    <form className="input_target  input_select_year">
                      <label htmlFor="">year</label>
                      <select
                        value={getYear}
                        onChange={changeYear}
                        className="select_year input_"
                      >
                        {years.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </form>
                    <div className="input_target">
                      <label htmlFor="">month</label>
                      <DatePicker
                        selected={startDate}
                        className="input_ datepicker"
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM"
                        showMonthYearPicker
                      />
                    </div>
                  </React.Fragment>
                </div>
              </form>
              <div>
                <table style={{ overflow: "auto" }}>
                  <tr>
                    <th>Тип жалобы</th>
                    <th>номер</th>
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
