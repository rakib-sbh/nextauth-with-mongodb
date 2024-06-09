"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";

const VerifyEmailPage = () => {
  //! using nextjs router
  //   const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    setToken(urlToken || "");

    //! using nextjs router
    // const { query } = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500">{token ? token : "no token"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
