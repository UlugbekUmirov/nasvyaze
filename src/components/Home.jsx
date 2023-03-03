import { useEffect, useState } from "react";

import { get } from "lodash";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "../utils/httpClient";
import Loyout from "./sections/loyout/Loyout";
import { Container } from "../styleComponents/GlobalCompanyStyle";
import UiCard from "../styleComponents/UiComponents/UiCard";
import UiInput from "../styleComponents/UiComponents/UiInput";
import { TbRefresh } from "react-icons/tb";
export default function Home() {
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const setMainLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };

  useEffect(() => {
    getCompany();
    setSearch(searchParams.get("search") ? searchParams.get("search") : "");
  }, [searchParams]);

  const getCompany = () => {
    setMainLoading(true);
    let s = "";
    if (search) {
      s = "&search=" + search;
    }

    Axios()
      .get("/api/v1/questionnaire/companys/?" + (s !== "" ? s : ""))
      .then((res) => {
        setCompany(get(res, "data", []));
      })
      .finally(() => {
        setMainLoading(false);
      });
  };
  const handlechange = (e) => {
    if (e.target.value == null) {
      setSearch(null);
    } else {
      setSearch(e.target.value);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const Refresh = () => {
    /* setSearchParams({
      search: "",
      page: 1,
    }); */
    setSearch("");

    navigate(`/`);
  };
  return (
    <Loyout>
      <Container>
        <div className="body">
          <div className="title">
            <div></div>
            <div>Выберите компанию</div>
            <div></div>
          </div>
          <form
            action="
          
          "
          className="formm"
          >
            <UiInput className="search" onSubmit={(e) => handleSearch(e)}>
              <input
                type="search"
                placeholder="Искать"
                value={search !== null ? search : ""}
                name="search"
                onChange={handlechange}
              />
              <button
                type="submit"
                style={{ border: "none", marginBottom: "27px", padding: "0" }}
              >
                <img src="/images/Group (2).svg" alt="" />
              </button>
            </UiInput>
            <div>
              <UiInput className="icons-search" onClick={Refresh}>
                <TbRefresh size={"2em"} color={"#4F89CB"} />
              </UiInput>
            </div>
          </form>
          {company.map(({ name, id, image }) => (
            <Link
              to={`/conversation-type/${id}`}
              style={{ textDecoration: "none" }}
            >
              {}
              <UiCard>
                <div className="companyCardd" key={id}>
                  {image === "" ? (
                    <div className="name">{name}</div>
                  ) : (
                    <img
                      width={"100%"}
                      height={"100%"}
                      src={`https://isurvey.gazon-tashkent.uz/media/${image}`}
                      alt=""
                    />
                  )}
                </div>
              </UiCard>
            </Link>
          ))}
        </div>
      </Container>
    </Loyout>
  );
}
