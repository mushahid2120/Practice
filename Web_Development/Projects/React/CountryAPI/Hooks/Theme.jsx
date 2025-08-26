import { useContext } from "react";
import ThemeContext from "../Contexts/Theme";

export const  useTheme=()=>useContext(ThemeContext)