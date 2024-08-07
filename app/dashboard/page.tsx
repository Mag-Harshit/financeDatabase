"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

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
          <div className="mt-10">
            <div className="text-3xl">DashBoard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
