import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResult from "./pages/search/SearchResult";
import Detailpage from "./pages/detail/Detailpage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import Main from "./pages/main/Main";
import Intro from "./pages/Intro/Intro";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/detail/:id/:mediaType" element={<Detailpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
