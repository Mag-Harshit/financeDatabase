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
        console.log(user);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex" style={{ height: "100vh", width: "100vh" }}>
        <div className="h-full">
          <SideBar />
        </div>
        <div style={{ marginLeft: "12%" }}>YO</div>
      </div>
    </div>
  );
};

export default Dashboard;
