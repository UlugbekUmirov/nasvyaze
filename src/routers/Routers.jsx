import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Company from "../components/Company/Company";
import Complaint from "../components/Complaint/Complaintnew";
import Complaintold from "../components/Complaint/Complaintold";
import Conversation from "../components/Conversation/Conversation";
import Home from "../components/Home";
import NotFound from "../components/NotFound";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/company">
          <Route index element={<Company />} />
        </Route>
        <Route path="/conversation-type/:id">
          <Route index element={<Conversation />} />
        </Route>
        <Route path="/conversation-type/:id/new">
          <Route index element={<Complaint />} />
        </Route>
        <Route path="/conversation-type/:id/old">
          <Route index element={<Complaintold />} />
        </Route>
      </Routes>
    </>
  );
};
export default Routers;
