import { Route, Switch } from "wouter";
import "./App.css";
import "./helpers/firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Foto from "./pages/Foto";
import Video from "./pages/Video";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./helpers/firebase";
import AdminBar from "./components/AdminBar";
import BottomBar from "./components/BottomBar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./helpers/firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <AdminBar />}
      <Switch>
        <Route path="/admin">
          <Login />
          <BottomBar />
        </Route>
        <Route path="/foto">
          <Foto />
          <BottomBar activeElement="foto" />
        </Route>
        <Route path="/video">
          <Video />
          <BottomBar activeElement="video" />
        </Route>
        <Route>
          <Home />
          <BottomBar activeElement="home" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
