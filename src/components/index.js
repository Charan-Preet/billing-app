import Add from "./add"
import { DataContextProvider } from "../context/index"
function Main() {
  return (
    <div className="main w-100">
      <DataContextProvider>
        <Add />
      </DataContextProvider>
    </div>
  );
}

export default Main;
