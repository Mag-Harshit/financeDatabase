"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import axios from "axios";
import IncomeChart from "@/components/incomeChart";
interface IncomeData {
  id: number;
  source: string;
  income: number;
  month: number;
  date: number;
}
const Income = () => {
  const [income, setIncome] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [incomeSource, setIncomeSource] = useState({
    income: 0,
    source: "",
  });
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
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
            console.log(income);
            const tableData = await axios.get(
              "/api/incomeTable?uid=" + user.uid
            );
            const data2 = tableData.data.incomeUser.rows;
            setIncomeData(data2);
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
  useEffect(() => {
    console.log("Updated incomeData:", incomeData);
  }, [incomeData]);

  async function handleIncomeSubmit(event: React.FormEvent<HTMLFormElement>) {
    const date = new Date();
    event.preventDefault();
    try {
      const response = await axios.get(
        "/api/incomeAdd?uid=" +
          user?.uid +
          "&source=" +
          incomeSource.source +
          "&income=" +
          incomeSource.income +
          "&month=" +
          date.getMonth() +
          "&date=" +
          date.getDate()
      );
      router.push("/income");
      location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleIncome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIncomeSource((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    event.preventDefault();
  };

  return (
    <div>
      <div className="topBar"> Finance Tracker</div>
      <hr />
      <div className="flex">
        <div className="h-full" style={{ height: "100vh" }}>
          <SideBar />
        </div>
        <div className="w-full flex justify-center">
          <div className="mt-10 flex items-center flex-col gap-3">
            <div className="text-3xl">Income Tracker</div>
            <div className="text-lg mt-5">Your Income: {income} </div>
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
                {/*modal*/}
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <form onSubmit={handleIncomeSubmit}>
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
                        <input
                          type="text"
                          onChange={handleIncome}
                          value={incomeSource.source}
                          name="source"
                          placeholder="Source of income"
                          id="Source"
                        />
                        <label htmlFor="incomeNum" className="sm:ml-4">
                          Income :{" "}
                        </label>
                        <input
                          type="number"
                          value={incomeSource.income}
                          onChange={handleIncome}
                          name="income"
                          id="incomeNum"
                        />
                      </div>
                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*modal*/}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div>
                <IncomeChart data={incomeData} />
              </div>
              <div>
                <table className="table-auto">
                  <thead>
                    <tr className="border-black border-2 mx-auto">
                      <th className="border-black border-2 mx-auto p-2">
                        Source
                      </th>
                      <th className="border-black border-2 mx-auto p-2">
                        {" "}
                        Income
                      </th>
                      <th className="border-black border-2 mx-auto p-2">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((prevData) => {
                      return (
                        <tr key={prevData.id}>
                          <td className="border-black border-2 text-xl p-2 mx-auto">
                            {prevData.source}
                          </td>
                          <td className="border-black border-2 text-xl p-2 mx-auto">
                            {prevData.income}
                          </td>
                          <td className="border-black border-2 text-xl p-2 mx-auto">
                            {prevData.month + "/" + prevData.date}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
