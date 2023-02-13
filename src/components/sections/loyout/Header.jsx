import { Link } from "react-router-dom";
import { Container } from "../../../styleComponents/loyout/HeaderStyle";
import { removeToken } from "../../../utils/tokenStorge";
export default function Header() {
  return (
    <>
      <Container>
        <Link to={'/'}>
          <img src="/images/image 1.svg" alt="" />
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
            style={{ marginRight: "10px", cursor: "pointer" }}
          />

          <span className="close__span">Выйти</span>
        </Link>
      </Container>
    </>
  );
}
