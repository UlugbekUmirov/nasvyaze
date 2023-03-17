import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../styleComponents/loyout/FooterStyle";
import { Container } from "../../../styleComponents/loyout/LoyoutStyle";
import { issetToken } from "../../../utils/tokenStorge";
import Header from "./Header";

export default function Loyout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!issetToken()) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Container>
        <Header />
        <div className="mainSection">{props?.children}</div>
        <Footer />
      </Container>
    </>
  );
}
