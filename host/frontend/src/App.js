import "./App.css";
import { MyRouter } from "./router/router";
import { TopBar } from "./components/TopBar";


function App() {
  return (
    <>
      <div className="MainConteiner">
        <TopBar />
        <div className="bodyArea">
         
          <MyRouter />
        </div>
      </div>
    </>
  );
}

export default App;
// <SideBar />