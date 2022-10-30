import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function LogOut2(props) {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div onClick={logout}>
        <div>{props.children}</div>
      </div>
    </>
  );
}

export default LogOut2;
