import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResult from "./pages/main/SearchResult";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
