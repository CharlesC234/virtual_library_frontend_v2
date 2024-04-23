"use sever";
import "../globals.css";
import Login from "../login/page";
import Upload from "./upload";



export default async function UploadPage({}) {
  return (
    <div>
        <Login>
      <Upload />
      </Login>
    </div>
  );
}