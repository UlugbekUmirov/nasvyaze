import { Link } from "react-router-dom";
import { Container } from "../../../styleComponents/loyout/HeaderStyle";
import { removeToken } from "../../../utils/tokenStorge";
export default function Header() {
  return (
    <>
      <Container>
        <Link to={"/"} className='logo_a'>
          <img src="/images/image 1.svg" alt=""  className="logo"/>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }} className=''>
          <Link
          className="my_application"
            
            to={"/my-applications"}
          >
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
            <img
              src="/images/Vector (9).svg"
              alt=""
             
              className='log-out'
            />

            <span className="close__span">Выйти</span>
          </Link>
        </div>
      </Container>
    </>
  );
}