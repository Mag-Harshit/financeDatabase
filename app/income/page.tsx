"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import axios from "axios";

const Income = () => {
  const [income, setIncome] = useState();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/income?uid=" + user.uid);
            const data = response.data;
            setIncome(data.incomeUser.rows[0].income);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  function handleIncomeSubmit() {}
  return (
    <div>
      <div className="h-16 text-center flex items-center justify-center text-5xl font-semibold">
        {" "}
        Finance Tracker
      </div>
      <hr />
      <div className="flex">
        <div className="h-full">
          <SideBar />
        </div>
        <div className="w-full flex justify-center">
          <div className="mt-10 flex items-center flex-col gap-3">
            <div className="text-3xl">Income Tracker</div>
            <div>
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="text-xl mt-10 p-4 rounded-3xl bg-blue-600"
              >
                Add your Income
              </button>
              <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Add an Income
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                      <label htmlFor="Source">Source : </label>
                      <input type="text" name="" id="Source" />
                      <label className="ml-4" htmlFor="incomeNum">
                        Income :{" "}
                      </label>
                      <input type="number" name="" id="incomeNum" />
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        data-modal-hide="default-modal"
                        onClick={handleIncomeSubmit}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Done
                      </button>
                      <button
                        data-modal-hide="default-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
