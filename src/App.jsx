import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProjectDetailPage } from "./components";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import SingleBlog from "./Pages/SngleBlog";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Okr from "./Pages/Okr";
import Note from "./Pages/Note";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/okr" element={<Okr />} />
        <Route path="/dashboard/notes" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
