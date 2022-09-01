import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";

export default function Home(props) {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <>
      {console.log(props)}
      <Header />

      <div>
        {" "}
        <div>貯金：{props.spAccountBalances[1].odBalance}円</div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={jaLocale}
            events={[{ title: "よくできました", start: "2022-09-01" }]}
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
