import UiCard from "../../styleComponents/UiComponents/UiCard";
import { Container } from "../../styleComponents/login/LoginStyle";
import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/tokenStorge";
import ModalInfo from "../ModalInfo";

const Login = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputRefTwo = useRef(null);
  const [obj, setObj] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const navigate = useNavigate();
  const [objE, setObjE] = useState({});

  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setMainLoading(true);
    let t = true,
      err = {};
    if (!obj?.username) {
      t = false;
      err = { ...err, username: true };
    }
    if (!obj?.password) {
      t = false;
      err = { ...err, password: true };
    }
    if (t) {
      httpClient()
        .post("/api/v1/account/login/", obj, { headers: {} })
        .then((res) => {
    

          if (res?.status === 200) {
            const token = res?.data?.tokens?.access ?? "";
            setToken(token);
            navigate("/");
          } else {
            setStatusModal(true);
          }
        })
        .catch((error) => {
          setObjE({ ...objE, common: true });
        })
        .finally(() => {
          setMainLoading(false);
        });
    } else {

      setObjE(err);
      setMainLoading(false);
    }
  };
  const changeInput = (event) => {
    setObj({ ...obj, [event.target.name]: event.target.value });
    setObjE({ ...objE, [event.target.name]: false, common: false });
  };

  return (
    <>
      <div className="header_login">
        <img src="/images/image 1.svg" alt="" />
      </div>
      <Container>
        <div className="body">
          <>
            <div className="title">???????? ?? ??????????????</div>
            <form className="loginForm" onSubmit={submitLogin}>
              <input
                type={"text"}
                name="username"
                autoFocus
                className="phone"
                placeholder="??????????"
                value={obj?.username}
                onChange={changeInput}
              />
              <div className="errs">
                {objE.username ? <div>Username requered</div> : ""}
              </div>
              <div className="eye">
                {/*  <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span> */}
              </div>
              <input
                //  type={showPass ? "text" : "password"}
                name="password"
                className="password"
                placeholder="????????????"
                value={obj?.password}
                onChange={changeInput}
              />
              <div className="errs">
                {objE.password ? <div>Password requered</div> : ""}
                {objE.common ? <div>User not found</div> : ""}
              </div>
              <div>
                <button
                  type="submit"
                  className="lbtn"
                  style={{ padding: "10px 18px" }}
                >
                  ??????????
                </button>
              </div>
            </form>
          </>
        </div>
      </Container>
      {statusModal === true ? (
        <ModalInfo
          title={"???????????? ???????????? ?????? ????????????"}
          close={setStatusModal}
          statusYesN={false}
        />
      ) : null}
      <div className="footer_login">

      </div>
    </>
  );
};
export default Login;
