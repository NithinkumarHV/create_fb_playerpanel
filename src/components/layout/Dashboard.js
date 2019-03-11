import React from "react";
import Players from "../Players/Players";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <Players />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}
