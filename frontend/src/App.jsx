import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/blog.page";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    // Any component which is inside the context provider will have access to the context values
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          {/* index refers to parent path here "/" is index path*/}
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<UserAuthForm type={"Sign-In"} />} />
          <Route path="/signup" element={<UserAuthForm type={"Sign-Up"} />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
