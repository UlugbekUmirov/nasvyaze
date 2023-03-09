import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createStore from "./utils/store";
import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import Routers from "./routers/Routers";
import LoadingProvider from "./components/sections/loading/LoadingProvider";
function App() {
  const store = createStore();
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
        <LoadingProvider />
      </Provider>
    </div>
  );
}

export default App;
