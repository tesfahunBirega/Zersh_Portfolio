import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProjectDetailPage } from "./components";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import SingleBlog from "./Pages/SngleBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/projectdetail/:name" element={<ProjectDetailPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
