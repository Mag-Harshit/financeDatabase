"use client";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCredentials((prevCred) => {
      return {
        ...prevCred,
        [name]: value,
      };
    });
  };

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
    event.preventDefault();
  }
  return (
    <div className="loginPage">
      <div className="bg-image">
        <div className="flex flex-row-reverse z-10 mb-10">
          <a href="/signUp" className="z-20">
            <button className="text-black bg-white mr-4 p-2 w-28 transition-all rounded-xl hover:bg-black border-black border-2 hover:text-white z-10">
              Sign Up
            </button>
          </a>
        </div>

        <div className="flex justify-center text-center h-full ">
          <div className="flex flex-col">
            <h1 className="z-20 text-black bg-clip-text text-transparent bg-gradient-to-r h-full from-gray-800 to-white text-6xl md:text-8xl">
              Log into your finance Dashboard
            </h1>
            <form onSubmit={handleSignIn}>
              <div className="z-10 flex flex-col my-auto mb-96">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-white text-black h-12 w-96 z-10 rounded-lg p-4 mx-auto m-5 border-black border-2"
                  onChange={handleCredentialsChange}
                  value={credentials.email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-white text-black h-12 w-96 z-10 rounded-lg p-4 mx-auto border-black border-2"
                  onChange={handleCredentialsChange}
                  value={credentials.password}
                />
                <div className="z-20">
                  <button
                    type="submit"
                    className="bg-blue-400 transition-all text-black rounded-xl hover:bg-white hover:text-black p-2 w-44 mt-5"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
