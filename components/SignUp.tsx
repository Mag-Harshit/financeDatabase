"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../app/firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<User | null>(null);

  // Handle user authentication and data fetching
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
        const fetchData = async () => {
          try {
            await axios.post("/api/users", {
              uid: user.uid,
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
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
    setCredentials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      console.log(user);

      // Set the user state to trigger the useEffect hook
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <div className="flex flex-row-reverse z-10 mb-10">
        <a href="/">
          <button className="text-black mr-4 p-2 w-28 transition-all rounded-xl hover:bg-black border-black border-2 hover:text-white z-10">
            Go Back
          </button>
        </a>
      </div>
      <div className="flex flex-row-reverse z-10 mb-10"></div>

      <div className="flex justify-center text-center h-full">
        <div className="flex flex-col">
          <h1 className="z-20 text-black text-6xl md:text-8xl">Sign Up</h1>
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

export default SignUp;
