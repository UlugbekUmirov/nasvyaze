import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";

import Complaint from "../components/Complaint/Complaintnew";
import Complaintold from "../components/Complaint/Complaintold";
import Conversation from "../components/Conversation/Conversation";
import Form from "../components/Form/Form";
import Home from "../components/Home";
import NotFound from "../components/NotFound";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/conversation-type/:id">
          <Route index element={<Conversation />} />
        </Route>
        <Route path="/conversation-type/:id/new">
          <Route index element={<Complaint />} />
        </Route>
        <Route path="/conversation-type/:id/old">
          <Route index element={<Complaintold />} />
        </Route>
         <Route path="/conversation-type/:id/:idd/new">
          <Route index element={<Form />} />
        </Route> 
      </Routes>
    </>
  );
};
export default Routers;
