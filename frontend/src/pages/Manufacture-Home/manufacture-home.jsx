import ManufactureOrder from "../../components/manufacture-input/manufacture-order";
import Home from "../home/home";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const ManufactureHome = () => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <Home />
      {userData ? <ManufactureOrder />: ''}
    </>
  );
};

export default ManufactureHome;
