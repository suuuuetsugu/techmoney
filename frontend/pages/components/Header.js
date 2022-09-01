import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function Header() {
  return (
    <>
      <h1 className="text-center mt-2 mb-2">おてつだい</h1>
      <Nav className={styles.Header}>
        <Nav.Item>
          <Nav.Link style={{ color: "black" }} href="/">
            カレンダー
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: "black" }} href="/new">
            今日のおてつだい
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: "black" }} href="/login">
            管理
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
