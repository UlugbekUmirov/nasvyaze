import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styleComponents/GlobalCompanyStyle";
import UiCard from "../../styleComponents/UiComponents/UiCard";
import UiInput from "../../styleComponents/UiComponents/UiInput";
import Loyout from "../sections/loyout/Loyout";

export default function Complaintold() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Loyout>
      <Container>
        <div className="body">
          <div className="title">
            <div>
              <img
                src="/images/back-arrow-icon 1.svg"
                alt=""
                onClick={() => navigate(`/conversation-type/${id}`)}
              />
            </div>
            <div>Тип жалобы</div>
            <div></div>
          </div>
          <div className="">
            <form action=" ">
              <UiInput>
                <input type="text" placeholder="Искать" />
                <img src="/images/Group (2).svg" alt="" />
              </UiInput>
            </form>
          </div>
        </div>
      </Container>
    </Loyout>
  );
}
