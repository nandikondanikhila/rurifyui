import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
export const Context = createContext([{}, () => {}]);

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({ role: "",});

  const updateState = (newDetails) => {
    setState((prevUser) => ({
      ...prevUser,
      ...newDetails,
    }));
  };
  const contextValue = useMemo(() => [state, updateState], [state]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
