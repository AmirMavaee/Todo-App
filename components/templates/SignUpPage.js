import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setTimeout(router.replace("/") , 2000)
    }
  }, [status]);

  const signupHandler = async () => {
    const res = await fetch("/api/auth/Signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.status === "success") {
      setTimeout(router.push("/SignIn") , 2000)
    }
  };

  return (
    <div className="signin-form">
      <h3>Sign Up Form</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={signupHandler}>Sign up</button>
      <div>
        <p>Have an account?</p>
        <Link href="/SignIn"> Sign in</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
