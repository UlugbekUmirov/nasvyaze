import { get } from "lodash";
import { useEffect, useState } from "react";
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
  const [obj, setObj] = useState({});
  const [objE, setObjE] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const [iddd, setIddd] = useState(0);
  const [login, setLogin] = useState(0);
  const [val, setVal] = useState([[]]);
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
        border:'none',
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
        border: "2px solid #4F89CB",
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
  useEffect(() => {
    getCompany();
    setIddd(idd);
    setObj({ ...obj, login: login });
    setObjE({ ...objE, login: false, common: false });
  }, []);
  const changeInput = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
    setObjE({ ...objE, [e.target.name]: false, common: false });
  };

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const getCompany = () => {
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
  const options = [
    { id: 1, name: "ulugbek" },
    { id: 2, name: "umirov" },
    { id: 3, name: "otabek" },
  ];

  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };

  const handlechange = (onchangevalue, i) => {
    const inputdata = [...val];
    inputdata[i] = onchangevalue.target.value;
    setVal(inputdata);
    console.log(val, "vallll");
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
                    name="name"
                    value={obj?.name || ""}
                    onChange={changeInput}
                  />
                </div>
                <div className="input_target">
                  <label>Телефон номер для обращения</label>
                  <InputMask
                    className="InputMask"
                    placeholder="+998 __ ___ __ __"
                    formatChars={{ b: "[0-9]" }}
                    mask="+998 (bb) bbb-bb-bb"
                    maskChar=""
                    name="phone"
                    value={obj?.phone || ""}
                    onChange={(e) => {
                      changeInput(e);
              
                    }}
                    //  onFocus={() => setSmsInvalid(false)}
                  />
                </div>
              </div>

              {val.map((data, i) => {
                return (
                  <>
                    <div className="create">
                      <div className="input_target">
                        <label>Филиал</label>
                        <Select
                          {...defaultOptionsss}
                          onChange={(e) => handlechange(e, i)}
                          value={data || ""}
                          name="groups"
                          options={options.map(({ id, name }) => ({
                            label: name,
                            value: id,
                          }))}
                          placeholder="Выберите филиал"
                        />
                      </div>
                      <div className="input_target">
                        <label>Дата и время</label>
                        {/*                   <Datetime className="" /> */}

                        <Select
                          {...defaultOptionsss}
                          onChange={(e) => handlechange(e, i)}
                          // value={obj?.groups}
                          name="groups"
                          placeholder="Выберите филиал"
                        />
                      </div>
                    </div>
                    <div className="create">
                      <div className="input_target2">
                        <label>Комментарий</label>
                        <textarea
                          placeholder="Напишите свою жалобу"
                          value={data || ""}
                          name="comment"
                          onChange={(e) => handlechange(e, i)}
                        ></textarea>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="create create-button">
                <div className="input_target3">
                  <input
                    className="button_add"
                    value={"+ Дополнительная жалоба"}
                    type="button"
                    onClick={handleAdd}
                  />
                </div>
                <div className="input_target3">
                  <input
                    onClick={() => setStatusModal(true)}
                    className="button_copy"
                    value={"Отправить"}
                    type="button"
                  />
                </div>
              </div>
            </form>
          </div>
          {console.log(val, "valllllllllllllllll")}
        </Container>
      </Loyout>
      {statusModal ? (
        <ModalInfo
          title0={"  "}
          title1={"Тескт жалобы"}
          title2={"/images/Vector (10).svg"}
          close={setStatusModal}
          name={obj?.name}
          contact={obj?.login}
          market={`${"m"}`}
          data={`${"d"}`}
          onCopyText={onCopyText}
          summa={`${"s"}`}
          comment={obj?.comment}
          //  nomer={`${"n"}`}
          notify={notify}
          statusYesN={true}
          isCopied={isCopied}
          // del={handlegetIdForRemove}
        />
      ) : null}
    </>
  );
}
