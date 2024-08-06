"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const signUp = () => {
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
    console.log("HELLO");
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

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
      <div className="flex flex-row-reverse z-10 mb-10">
        <a href="/">
          <button className="text-black mr-4 p-2 w-28 transition-all rounded-xl hover:bg-black border-black border-2 hover:text-white z-10">
            {" "}
            Go Back
          </button>
        </a>
      </div>
      <div className="flex flex-row-reverse z-10 mb-10"></div>

      <div className="flex justify-center text-center h-full ">
        <div className="flex flex-col">
          <h1 className="z-20 text-black  text-6xl md:text-8xl">Sign Up</h1>
          <form onSubmit={handleSignUp}>
            <div className="z-10 flex flex-col my-auto mb-96">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-white text-black h-12 w-96 z-10 rounded-lg p-4 mx-auto m-5 border-gray-400 border-2"
                onChange={handleCredentialsChange}
                value={credentials.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-white text-black h-12 w-96 z-10 rounded-lg p-4 mx-auto border-gray-400 border-2"
                onChange={handleCredentialsChange}
                value={credentials.password}
              />
              <div>
                <button
                  className="bg-blue-400 transition-all text-black rounded-xl hover:bg-black hover:text-white p-2 w-44 mt-5"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
