"use sever";
import "../globals.css";
import Books from "./books";
import Login from "../login/page";

export default async function BooksPage({}) {


  return (
    <div>
      <Login>
      <Books />
      </Login>
    </div>
  );
}