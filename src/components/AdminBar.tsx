import { useSignOut } from "react-firebase-hooks/auth";
import "./AdminBar.css";
import { auth } from "../helpers/firebase";

const AdminBar = () => {
  const [signOut] = useSignOut(auth);
  return (
    <div className="admin-bar-container">
      <p>Ciao admin!</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

export default AdminBar;
