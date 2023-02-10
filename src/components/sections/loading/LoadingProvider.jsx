import { useSelector } from "react-redux";
import Loading from "./Loading";

const LoadingProvider = () => {
    const {loading} = useSelector(s=>s.main);
    return(<>
        {loading?<Loading/>:null}
    </>);
}
export default LoadingProvider;