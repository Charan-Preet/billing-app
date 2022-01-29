import { createContext, useEffect, useState } from "react";

const DataContext = createContext();
const DataContextProvider = (props) => {
  const [data,setData] = useState([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("data"));
    if (stored && stored.length > 0) {
      setData(stored);
    } else setData([]);
  },[])
  return (
    <DataContext.Provider
      value={{
        data
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };