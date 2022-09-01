import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link.js";
import Header from "./components/Header.js";
import styles from "../styles/Home.module.css";

export default function Signin() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <>
          <h1>管理画面</h1>
          <div></div>

          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </>
  );
}

function SignInButton() {
  const emailRef = useRef(null);
  const emailPassword = useRef(null);
  const handleSubmit = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      emailPassword.current.value
    )
      .then((d) => {
        console.log("success > d", d);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      <Header />
      <div>
        <form className={styles.login}>
          <label>email:</label>
          <input name="email" type="email" ref={emailRef} />
          <label>password:</label>
          <input name="password" type="password" ref={emailPassword} />
          <Button
            className={styles.login}
            variant="outline-secondary"
            onClick={handleSubmit}
          >
            サインイン
          </Button>
        </form>
        <Button variant="outline-secondary" className={styles.login}>
          <Link href="/">キャンセル</Link>
        </Button>
      </div>
    </>
  );
}

function SignOutButton() {
  return (
    <Button
      className={styles.login}
      variant="outline-secondary"
      onClick={() => auth.signOut()}
    >
      <Link href="/login">サインアウト</Link>
    </Button>
  );
}
