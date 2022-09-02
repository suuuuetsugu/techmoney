import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link.js";
import Header from "../components/Header.js";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

/* このページで実装すること

1 現在のお手伝いリストを全件取得（自作APIから取得）
=> 削除、追加、編集ができるようにする（DELETE,PUT,PATCH）
※編集PUTで代用するイメージ？

2 承認ページへの遷移（リンク）

3 ログインページ　もしくは　TOP ページへの遷移（リンク）

*/

export default function Signin(props) {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");

  const router = useRouter();

  function handleClick() {
    const data = {
      name,
      money,
    };
    axios.post(`http://localhost:3001/helps`, data).then((res) => {
      console.log(res);
      console.log("ok");
    });
  }

  function deleteTask(id) {
    console.log(id);
    axios.delete(`http://localhost:3000/helps/${id}`).then((res) => {
      console.log("del ok");
      console.log(res);
    });
  }

  return (
    <>
      {user ? (
        <>
          {console.log(props)}
          <Header />
          <h3>管理画面</h3>
          <div>
            <form>
              <label>新規お手伝い：</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label>
                金額：
                <input
                  type="text"
                  onChange={(e) => setMoney(e.target.value)}
                ></input>
                円
              </label>
              <div>
                <Button variant="outline-secondary" onClick={handleClick}>
                  作成
                </Button>
              </div>
            </form>
            <label>今月のお手伝い：</label>
            <ul>
              {props.helpList.map((help, i) => {
                return (
                  <div key={i}>
                    {help.name}
                    <a>{help.money}円</a>
                    {/* <Link href={`/${task.id}`}>👀詳細</Link>
                      <Link href={`/${task.id}/edit`}>📝編集</Link> */}
                    <Button onClick={() => deleteTask(help.id)}>削除</Button>
                  </div>
                );
              })}
            </ul>
          </div>
          <Button variant="outline-secondary">
            <Link href="/login/check">承認</Link>
          </Button>

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

// GET：TODO一覧の表示
export async function getServerSideProps(cxt) {
  // 自作API
  let helpList = {};
  await axios
    .get("http://express:3000/helps")
    .then(function (response) {
      if (response.data) {
        helpList = response.data;
        console.log(JSON.stringify(response.data));
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      helpList,
    },
  };
}
