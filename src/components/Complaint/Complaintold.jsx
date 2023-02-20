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
        <div className="body complaint-old">
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
          <form action=" " className="">
            <UiInput className="search">
              <input type="text" placeholder="Искать" />
              <img src="/images/Group (2).svg" alt="" />
            </UiInput>
          </form>
          <UiCard>
            <div className="otvet_informations">
              <div className="otvet_information">
                <p>
                  Ф.И.О клиента: <span>Алёна</span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Контакт: <span>950103749</span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Маркет: <span>Дархан Smart</span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Дата и время покупки:
                  <span> 04.02.2023 13:00:37 Цена: 26.800</span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Цена: <span>26.800, чек имеется</span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Суть обращения:
                  <span>
                    жалуется на качество сыра Валио пахнет химикатом пленка была
                    не пищевая
                  </span>
                </p>
              </div>
              <div className="otvet_information">
                <p>
                  Звонили с номера: <span>95010374</span>
                </p>
              </div>
              <div className="otvet_title">Ответ:</div>
              <div className="otvet">
                <p>
                  Клиент нечаянно нажал на кнопку о потери повербанка, просит
                  вернуть денежные средства, видео отправит через бот
                </p>
              </div>
            </div>
          </UiCard>
          <div className="page">
            {[{ id: 1 }, { id: 2 }, { id: 3 }].map(({ id }) => (
              <>
                <span>{id}</span>
              </>
            ))}
          </div>
        </div>
      </Container>
    </Loyout>
  );
}