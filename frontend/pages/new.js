import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Header from "./components/Header";

export default function List(props) {
  const [value, setValue] = useState("申請");

  const postHelped = async (id, e) => {
    console.log(id);
    const data = {
      listId: id,
      check: false,
      profileId: 1,
    };
    await axios
      .post("http://localhost:3001/helped", data)
      .then((res) => {
        console.log(res);
        console.log("ok");
        alert("えらいね！はなまる");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {console.log(props)}
      <Header />
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"></div>
      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">じぶんのお金</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                ￥{props.Zandaka.spAccountBalances[1].odBalance}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"></div>
      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">今日のお手伝い</h4>
            </div>
            <div class="card-body">
              {props.posts.map((item, i) => {
                return (
                  <div key={i}>
                    <ul>
                      <div>
                        <Button
                          id={item.id}
                          class="btn btn-lg btn-block btn-primary"
                          onClick={(e) => postHelped(item.id, e)}
                        >
                          {value}
                        </Button>
                        {item.name}
                        <a>{item.money}円</a>
                      </div>
                    </ul>
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const config = {
  method: "get",
  url: "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances",
  headers: {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8",
    "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl",
  },
};

export async function getServerSideProps() {
  let Zandaka;
  await axios(config)
    .then(function (response) {
      Zandaka = response.data;
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  const res = await axios.get("http://express:3000/helps");
  const posts = await res.data;
  return {
    props: {
      posts,
      Zandaka,
    },
  };
}
