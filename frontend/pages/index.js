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

  const titleArray = ["よくできました", "えらいね", "いつもありがとう"];
  const random = Math.floor(Math.random() * titleArray.length);
  console.log(titleArray[random]);

  todayObj["title"] = titleArray[random];
  console.log(todayObj);

  todayObj["start"] = "2022-09-02";
  console.log(todayObj);

  array.push(todayObj);
  return array;
}
console.log(event());

export default function Home(props) {
  // const [date, setDate] = useState(new Date());

  // const onChange = (date) => {
  //   setDate(date);
  // };

  return (
    <>
      {console.log(props)}
      <Header />

      <div>
        {" "}
        <div>じぶんのお金：{props.spAccountBalances[1].odBalance}円</div>
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
    "x-access-token": "MGRhOWJkOGRhNmFjYTc3ZjU2M2RjNWJh",
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
