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

    location.reload();
  }

  // setTimeout(function () {
  //   location.reload();
  // }, 5000);

  // function deleteTask(id) {
  //   console.log(id);
  //   axios.delete(`http://localhost:3000/helps/${id}`).then((res) => {
  //     console.log("del ok");
  //     console.log(res);
  //   });
  // }

  return (
    <>
      {user ? (
        <>
          {console.log(props)}
          <Header />
          <div
            div
            class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"
          >
            <h1 class="display-6">お手伝いリスト編集</h1>
          </div>
          <div class="container">
            <div class="card-deck mb-3 text-center">
              <div class="card mb-4 shadow-sm">
                <div class="card-header">
                  <h4 class="my-0 font-weight-normal">新規作成</h4>
                </div>
                <div class="card-body">
                  <form>
                    <label class="card-title pricing-card-title">
                      お手伝い：
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </label>
                    <label class="card-title pricing-card-title m-2">
                      金額：
                      <input
                        type="text"
                        onChange={(e) => setMoney(e.target.value)}
                      ></input>
                      円
                    </label>

                    <Button
                      class="btn btn-lg btn-block btn-primary "
                      onClick={handleClick}
                    >
                      作成
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="card-deck mb-3 text-center">
              <div class="card mb-4 shadow-sm">
                <div class="card-header">
                  <h4 class="my-0 font-weight-normal">現在のお手伝いリスト</h4>
                </div>
                <div class="card-body">
                  <ul>
                    {props.helpList.map((help, i) => {
                      return (
                        <div key={i}>
                          {help.name}
                          <a>{help.money}円</a>
                          {/* <Link href={`/${task.id}`}>👀詳細</Link>
                      <Link href={`/${task.id}/edit`}>📝編集</Link> */}
                          {/* <Button onClick={() => deleteTask(help.id)}>削除</Button> */}
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login}>
            <Button class="btn btn-lg btn-block btn-primary ">
              <Link href="/login/check">承認ページへ行く</Link>
            </Button>
          </div>

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
        <h1 class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          サインインする
        </h1>
        <form className={styles.login}>
          <label>email:</label>
          <input name="email" type="email" ref={emailRef} />
          <label class="sr-only">password:</label>
          <input name="password" type="password" ref={emailPassword} />
          <div className={styles.login}>
            <Button
              class="btn btn-lg btn-block btn-primary"
              onClick={handleSubmit}
            >
              サインイン
            </Button>
          </div>
        </form>
        <div className={styles.login}>
          <Button class="btn btn-lg btn-block btn-primary">
            <Link href="/">キャンセル</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function SignOutButton() {
  return (
    <div className={styles.login}>
      <Button
        class="btn btn-lg btn-block btn-secondary"
        onClick={() => auth.signOut()}
      >
        <Link href="/login">サインアウト</Link>
      </Button>
    </div>
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
