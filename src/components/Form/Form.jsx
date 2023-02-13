import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import UiInput from "../../styleComponents/UiComponents/UiInput";
import Axios from "../../utils/httpClient";
import Select from "react-select";
import Loyout from "../sections/loyout/Loyout";
import InputMask from "react-input-mask";
import ModalInfo from "../ModalInfo";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
export default function Form() {
  const navigate = useNavigate();
  const { idd, id } = useParams();

  const [complaints, setComplaints] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const dispatch = useDispatch();
  const [iddd, setIddd] = useState(0);
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  const defaultOptionsss = {
    isMulti: true,
    isSearchable: false,
    isDisabled: false,
    styles: {
      control: (styles) => ({
        ...styles,
        width: "104%",
        maxHeight: "48px",
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
        paddingBottom: "7px",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "18px",
      }),
    },
  };
  useEffect(() => {
    getCompany();
    setIddd(idd);
  }, []);

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
                  <label>asdsaasf</label>
                  <input type="text" placeholder="ФИО" />
                </div>
                <div className="input_target">
                  <label>asdsaasf</label>
                  <InputMask
                    className="InputMask"
                    placeholder="+998 __ ___ __ __"
                    formatChars={{ b: "[0-9]" }}
                    mask="+998 (bb) bbb-bb-bb"
                    maskChar=""
                    // value={login}
                    onChange={(e) => {
                      const login = e.target.value
                        .replace(/-/g, "")
                        .replace(/\(/g, "")
                        .replace(/\)/g, "")
                        .replace(/\+/g, "")
                        .replace(/\s/g, "")
                        .replace(/_/g, "");
                      // setLogin(login);
                    }}
                    //  onFocus={() => setSmsInvalid(false)}
                  />
                </div>
              </div>
              <div className="create">
                <div className="input_target">
                  <label>asdsaasf</label>
                  <Select
                    {...defaultOptionsss}
                    //onChange={(value) => selectGroups(value)}
                    // value={obj?.groups}
                    name="groups"
                    /*    options={groupsList.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))} */
                    placeholder="Выберите филиал"
                  />
                </div>
                <div className="input_target">
                  <label>asdsaasf</label>
                  <Datetime  className=""/>
                </div>
              </div>
              <div className="create">
                <div className="input_target2">
                  <label>asdsaasf</label>
                  <textarea
                    name=""
                    id=""
                    placeholder="Напишите свою жалобу"
                  ></textarea>
                </div>
              </div>
              <div className="create">
                <div className="input_target3">
                  <input
                    className="button_add"
                    value={"+ Дополнительная жалоба"}
                    type="button"
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
        </Container>
      </Loyout>
      {statusModal ? (
        <ModalInfo
          title0={"  "}
          title1={"Тескт жалобы"}
          title2={"/images/Vector (10).svg"}
          close={setStatusModal}
          name={`${"dddddd ddddddddddd dddddddddddddddd ccccccccccccccccccccc cccccccccccccccccccccccc ccccccccccccddfn"}`}
          contact={`${"c"}`}
          market={`${"m"}`}
          data={`${"d"}`}
          summa={`${"s"}`}
          comment={`${"mening ismim ulugbek va  men 20 yoshdaman nima gap soglila yaxsmsia"}`}
          nomer={`${"n"}`}
          statusYesN={true}
          // del={handlegetIdForRemove}
        />
      ) : null}
    </>
  );
}
