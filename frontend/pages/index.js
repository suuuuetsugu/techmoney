import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
// import interactionPlugin from "@fullcalendar/interaction";
// import dynamic from "next/dynamic";

function event() {
  const array = [];
  const todayObj = {};

  const titleArray = [
    { title: "よくできました", start: "2022-09-01" },
    { title: "えらいね", start: "2022-09-02" },
  ];
  // const random = Math.floor(Math.random() * titleArray.length);
  // console.log(titleArray[random]);

  // const dayArray = ["2022-08-31", "2022-09-01", "2022-09-02"];

  // todayObj["title"] = titleArray[random];
  // console.log(todayObj);

  // for (const item of dayArray) {
  //   console.log(item);
  //   todayObj["start"] = item;
  //   array.push(todayObj);
  //   console.log(todayObj);
  // }
  return titleArray;
}
console.log(event());

export default function Home(props) {


  // 金額表示のための変数
  const koZandaka = props.spAccountBalances[1].odBalance;
  const henkanKo = Number(koZandaka).toLocaleString();

  return (
    <>
      {console.log(props)}
      <Header />

      <div>
        {" "}
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"></div>
        <div class="container">
          <div class="card-deck mb-3 text-center">
            <div class="card mb-4 shadow-sm">
              <div class="card-header">
                <h4 class="my-0 font-weight-normal">じぶんのお金</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">
                  ￥{henkanKo}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={jaLocale}
            events={event()}
          />
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

export async function getServerSideProps(cxt) {
  let data;
  await axios(config)
    .then(function (response) {
      data = response.data;
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return {
    props: data,
  };
}
