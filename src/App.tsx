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
import { useCollection } from "react-firebase-hooks/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./helpers/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./helpers/firebase";

function App() {
  const [user] = useAuthState(auth);

  const [fotoCollectionValue, fotoLoading] = useCollection(
    query(collection(db, "foto"), orderBy("timestamp", "desc"))
  );
  const [videoCollectionValue, videoLoading] = useCollection(
    query(collection(db, "video"), orderBy("timestamp", "desc"))
  );

  return (
    <>
      {user && <AdminBar />}
      <Switch>
        <Route path="/admin">
          <Login />
          <BottomBar />
        </Route>
        <Route path="/foto">
          <Foto collectionValue={fotoCollectionValue} loading={fotoLoading} />
          <BottomBar activeElement="foto" />
        </Route>
        <Route path="/video">
          <Video
            collectionValue={videoCollectionValue}
            loading={videoLoading}
          />
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
