import { Route } from "wouter";
import "./App.css";
import "./helpers/firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Foto from "./pages/Foto";
import Video from "./pages/Video";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./helpers/firebase";

function App() {
  // const [user, loadingAuth] = useAuthState(auth);

  return (
    <>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/admin">
        <Login />
      </Route>
      <Route path="/foto">
        <Foto />
      </Route>
      <Route path="/video">
        <Video />
      </Route>
    </>
  );
}

export default App;
