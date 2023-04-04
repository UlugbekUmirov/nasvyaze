import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "../../../styleComponents/loyout/HeaderStyle";
import Axios from "../../../utils/httpClient";
import { removeToken } from "../../../utils/tokenStorge";
export default function Header() {
  const [is_activee, setActive] = useState(false);
  const [staff, setStaff] = useState(false);
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
        setStaff(res?.data?.is_staff);
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
        {console.log(staff, "staff")}
        <Link to={"/"} className="logo_a">
          <img src="/images/image 1.svg" alt="" className="logo" />
        </Link>
        <div style={{ display: "flex", alignItems: "center" }} className="">
          {staff === true ? (
            <NavLink  activeClassName={'active'} className="my_application" to={"/status-company"}>
              Статус
            </NavLink>
          ) : (
            ""
          )}
          <NavLink activeClassName={'active'}  className="my_application" to={"/my-applications"}>
            Мои заявки
          </NavLink>
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
