import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";

export default function Calendar(props) {
  return (
    <>
      {props}
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale={jaLocale}
          events={[
            { title: "event", start: "2022-09-01" },
            { title: "追加", start: "2022-09-02", end: "2022-09-03" },
          ]}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("http://express:3000/helped/true");
  const posts = await res.data;
  return {
    props: {
      posts,
    },
  };
}
