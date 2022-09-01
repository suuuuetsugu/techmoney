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
      day: "2022-08-31T06:54:56.612Z",
      check: false,
      profileId: 1,
    };
    await axios
      .post("http://localhost:3001/helped", data)
      .then((res) => {
        console.log(res);
        console.log("ok");
        alert("えらいね！はなまる");
        setValue("申請中");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {console.log(props)}
      <Header />
      <div>おてつだいリスト</div>
      {props.posts.map((item, i) => {
        return (
          <div key={i}>
            <ul>
              <div>
                <Button
                  id={item.id}
                  variant="secondary"
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
      })}
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("http://express:3000/helps");
  const posts = await res.data;
  return {
    props: {
      posts,
    },
  };
}
