import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../../styleComponents/loyout/HeaderStyle";
import Axios from "../../../utils/httpClient";
import { removeToken } from "../../../utils/tokenStorge";
export default function Header() {
  const [is_activee, setActive] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    Axios()
      .get("/api/v1/account/get-role/")
      .then((res) => {
        console.log(res?.data?.is_active, "s");
        setActive(res?.data?.is_active);
        if (res?.data?.is_active === false) {
          removeToken();
          navigate("/login");
        }
        /*  const interval = setTimeout(() => {
          //console.log(res?.data?.is_active , 'ee');
        }, 60000); */
        //  return () => clearInterval(interval);
      })
      .finally(() => {
        setMainLoading(false);
      });
    console.log(is_activee, "s");
  }, [is_activee]);

  //const getRole = () => {};

  return (
    <>
      <Container>
        <Link to={"/"} className="logo_a">
          <img src="/images/image 1.svg" alt="" className="logo" />
        </Link>
        <div style={{ display: "flex", alignItems: "center" }} className="">
          <Link className="my_application" to={"/my-applications"}>
            Мои заявки
          </Link>
          <Link
            className="close"
            style={{
              alignItems: "center",
              display: "flex",
              textDecoration: "none",
            }}
            onClick={removeToken}
            to={"/login"}
          >
            <img src="/images/Vector (9).svg" alt="" className="log-out" />

            <span className="close__span">Выйти</span>
          </Link>
        </div>
      </Container>
    </>
  );
}
