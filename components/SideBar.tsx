import React from "react";
import { auth } from "../app/firebase/config";
import { signOut } from "firebase/auth";

const SideBar = () => {
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="h-full border-blue-900 border-2 sidebar bg-blue-200 flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <a
          href="/dashboard"
          className="overflow-hidden hover:bg-white transition-all"
        >
          <button className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <span className="ml-2 text-2xl">Home</span>
          </button>
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="currentColor"
          className="bi bi-coin"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
        </svg>
      </div>
      <div>
        <div className="overflow-hidden hover:bg-white transition-all">
          <button
            className="flex flex-row items-center"
            onClick={handleSignOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              className="bi bi-power"
              viewBox="0 0 16 16"
            >
              <path d="M7.5 1v7h1V1z" />
              <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
            </svg>
            <span className="ml-2 text-2xl">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
