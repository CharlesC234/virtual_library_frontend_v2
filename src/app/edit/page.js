"use client";
import "../globals.css";
import Login from "../login/login";
import Edit from "./edit";



export default function UploadPage({}) {
  return (
    <div>
        <Login>
      <Edit />
      </Login>
    </div>
  );
}