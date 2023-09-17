import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const location = useLocation();

  return <div>

    {isAuth ? children : <Navigate state={location.pathname} to={"/login"} />}

  </div>;
};
