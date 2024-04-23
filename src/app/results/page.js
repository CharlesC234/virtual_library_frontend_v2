"use client";
import "../globals.css";
import Login from "../login/login";
import Results from "./results";



export default function ResultsPage({}) {
  return (
    <div>
        <Login>
      <Results />
      </Login>
    </div>
  );
}