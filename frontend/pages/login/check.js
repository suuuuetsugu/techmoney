import axios from "axios";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Link from "next/link";

export async function getServerSideProps(context) {
  // 自作API
  let noCheck = {};
  await axios
    .get("http://express:3000/helped/false")
    .then(function (response) {
      if (response.data) {
        noCheck = response.data;
        console.log(JSON.stringify(response.data));
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  // sunabarAPI
  // TODO:sunabarAPIのトークンはenvファイルに記載
  let balance = {};
  await axios
    .get("https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances", {
      headers: {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl",
      },
    })
    .then(function (response) {
      if (response.data) {
        balance = response.data;
        console.log(JSON.stringify(response.data));
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      balance,
      noCheck,
    },
  };
}

// ページリロード
setTimeout(function () {
  location.reload();
}, 10000);

export default function New(props) {
  const approveHelped = async (id, money) => {
    window.alert(
      "お手伝いを承認して、つかいわけ口座間振込依頼を行いました \n 振込後の金額を確認する場合はページを更新してください"
    );

    // 承認状況をfalseからtrueへ変更
    await axios
      .patch(`http://localhost:3001/helped/${id}`, {
        check: true,
      })
      .then(function (response) {
        if (response.data) {
          console.log(JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // ページリロード
    location.reload();

    // sunabarAPIで口座間振替
    await axios.post(`http://localhost:3001/sunabar`, {
      depositSpAccountId: "SP50220278928",
      debitSpAccountId: "SP30210005043",
      currencyCode: "JPY",
      paymentAmount: money,
    });
  };

  // 金額表示のための変数
  const allZandaka = props.balance.balances[0].balance;
  const oyaZandaka = props.balance.spAccountBalances[0].odBalance;
  const koZandaka = props.balance.spAccountBalances[1].odBalance;

  const henkanOya = Number(oyaZandaka).toLocaleString();
  const henkanKo = Number(koZandaka).toLocaleString();

  // 日付処理 => 途中
  const changeDatetime = (datetime) => {
    // console.log(datetime)
    const ts = Date.parse(datetime.day);
    const dt = new Date(ts);
    return dt;
  };

  return (
    <>
      <Header />
      {console.log(typeof oyaZandaka)}
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-6">口座残高</h1>
      </div>
      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">あなたの口座（親口座）</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">￥{henkanOya}</h1>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">お子さんの口座（子口座）</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">￥{henkanKo}</h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>お小遣いやお年玉を分けて管理したい場合は</li>
                <li>つかいわけ口座を増やすことができます</li>
              </ul>
              <a
                href="https://portal.sunabar.gmo-aozora.com/login"
                class="btn btn-lg btn-block btn-primary"
                role="button"
              >
                sunabarへ行く
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-6">承認待ちお手伝い</h1>
      </div>
      {/* <div class="row"> */}
      <a class="m-5">日付</a>
      <a class="m-5">お手伝い</a>
      <a class="m-5">金額</a>
      {/* </div> */}
      <div class="row">
        {props.noCheck.map((check) => {
          return (
            <ul class="list-unstyled mt-3 mb-4" key={check.id}>
              <div class="col-4 m-2">
                <a class="m-4">{check.day}</a>
                {check.helpList.name}
                <a class="m-2">{check.helpList.money}円</a>
                <Button
                  class="btn btn-lg btn-block btn-primary "
                  onClick={() => approveHelped(check.id, check.helpList.money)}
                >
                  承認
                </Button>
              </div>
            </ul>
          );
        })}
      </div>
      {/* <Table hover striped bordered>
      <thead>
            <tr>
                <th>日付</th>
                <th>お手伝い</th>
                <th>金額</th>
                <th>確認</th>
            </tr>
        </thead>
      <tbody>
          {props.noCheck.map((check) => {
            return (
              <tr key={check.id}>
                <td>{check.day}</td>
                <td>{check.helpList.name}</td>
                <td>{check.helpList.money}円</td>
                <Button variant="outline-danger" onClick={() => approveHelped(check.id, check.helpList.money) }>承認</Button>
              </tr>
            )
          })}
      </tbody>
      </Table> */}
    </>
  );
}
