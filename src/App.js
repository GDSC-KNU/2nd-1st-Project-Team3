import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResult from "./pages/SearchResult";
import Detailpage from "./pages/Detailpage";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/detail/:id/:mediaType" element={<Detailpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
