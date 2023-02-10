import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Company from "../components/company/Company";
import Home from "../components/Home";
import NotFound from "../components/NotFound";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route  path="/" element={<Home />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/company">
          <Route index element={<Company />} />
        </Route>
      </Routes>
    </>
  );
};
export default Routers;
