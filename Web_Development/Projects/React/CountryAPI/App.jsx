
import Heading from "./Components/Heading";
import { Outlet } from "react-router";

export default function App() {
  return (
  <>
    <Heading/>
    <Outlet/>
  </>
    
  );
}
