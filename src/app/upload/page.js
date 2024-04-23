"use client";
import "../globals.css";
import Login from "../login/login";
import Upload from "./upload";



export default function UploadPage({}) {
  return (
    <div>
        <Login>
      <Upload />
      </Login>
    </div>
  );
}