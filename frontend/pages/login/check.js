import axios from 'axios';
import React, { useState } from "react";

/* このページで残りやること
１　承認が必要なお手伝い一覧の表示
２　承認ボタンクリック後、口座間振替のAPIを動作させる　＆　自作APIのcheckをfalseからtrueに変更
*/

export async function getServerSideProps(context) {

  // 自作API
  let noCheck = {};
  await axios
  .get('http://express:3000/helped/false')
  .then(function (response) {
    if(response.data) {
      noCheck = response.data
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
  .get('https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances', {
      headers: { 
          'Accept': 'application/json;charset=UTF-8', 
          'Content-Type': 'application/json;charset=UTF-8', 
          'x-access-token': 'YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl'
        }
  })
  .then(function (response) {
      if(response.data) {
          balance = response.data
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
    }
  }
}

export default function New(props) {
  // console.log(props)
  // console.log(props.noCheck)
  // const [check, setcheck] = useState();

  const approveHelped = async(e) => {
    e.preventDefault(); // TODO:後で検証

    // ボタンクリックでsunabarAPIで口座間振替依頼をする
    await axios.post(`http://localhost:3001/sunabar`, {
      // headers: { 
      //   "Accept": "application/json;charset=UTF-8", 
      //   "Content-Type": "application/json;charset=UTF-8", 
      //   "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl",
      // },
      // body: {
        "depositSpAccountId":"SP50220278928",
        "debitSpAccountId":"SP30210005043",
        "currencyCode":"JPY",
        "paymentAmount":"4000", // クリックしたボタンに紐づく金額を取得する
      // },
      // json: true,
    });


    // ボタンクリックで承認状況をfalseからtrueに変更する(post)
    // TODO:クリックしたボタンのid情報はどこから引っ張る？
    // await axios
    // .patch(`http://localhost:3001/helped/${id}`, {
    //   check: true
    // })
    // .then(function (response) {
    //   if(response.data) {
    //     console.log(JSON.stringify(response.data));
    //   }
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  // 金額表示のための変数
  const allZandaka = props.balance.balances[0].balance;
  const oyaZandaka = props.balance.spAccountBalances[0].odBalance;
  const koZandaka = props.balance.spAccountBalances[1].odBalance

  // 日付処理 => 途中
  const changeDatetime = (datetime) => {
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();

    return year + '年' + month + '月' + day + '日'
  }

  // カテゴリIDをリスト一覧と凸合して変換させる必要がある

  // TODO:承認必要な一覧をmapで全部表示させる
  return (
    <>
      <p>お手伝い承認待ち</p>
      <div>
          {props.noCheck.map((check) => {
            return (
              <div key={check.id}>
                <div>{check.day}</div>
                <div>{check.helpList.name}</div>
                <div>{check.helpList.money}円</div>
                <button onClick={approveHelped}>承認</button>
              </div>
            )
          })}
      </div>
      <p>口座残高:{allZandaka}円</p>
      <p>親口座:{oyaZandaka}円</p>
      <p>子口座（子どものおこづかい口座）:{koZandaka}円</p>
    </>
  )
}