import Home from '../home/home';
import TransporterOrder from '../../components/transporter-input/transporter-order'
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const TransporterHome = () => {
  const { userData } = useContext(UserContext);


  return (
    <>
    <Home />
    {userData ? <TransporterOrder />: ''}
  </>
  )
}

export default TransporterHome