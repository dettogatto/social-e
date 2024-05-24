import "./Login.css";
import { useEffect, useState } from "react";
import { auth } from "../helpers/firebase";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, , loading, error] = useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("no error");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setErrorText(error.code);
    }
  }, [error]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  if (user) {
    return (
      <div className="page-container">
        <h1>Social-E - Login</h1>
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Social-E - Login</h1>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, password);
        }}
      >
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className={`login-error ${showError ? "visible" : ""}`}>
        {errorText}
      </div>
    </div>
  );
};

export default Login;
