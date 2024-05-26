import { useContext } from "react";
import Context from "./Context";

/** Export [state, dispatch] */
export const useGlobalState = () => useContext(Context);