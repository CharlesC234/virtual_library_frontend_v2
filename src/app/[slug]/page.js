"use client";
import "../globals.css";
import Books from "./books";
import Login from "../login/login";

export default function BooksPage({}) {


  return (
    <div>
      <Login>
      <Books />
      </Login>
    </div>
  );
}