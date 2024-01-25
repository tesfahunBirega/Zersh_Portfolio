import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProjectDetailPage } from "./components";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/projectdetail/:name" element={<ProjectDetailPage />} />
        <Route path="/blogs/" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
