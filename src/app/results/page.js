"use sever";
import "../globals.css";
import Login from "../login/page";
import Results from "./results";



export default async function ResultsPage({}) {
  return (
    <div>
        <Login>
      <Results />
      </Login>
    </div>
  );
}