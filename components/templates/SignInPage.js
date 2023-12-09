import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {status} = useSession();

  useEffect(()=>{
    if(status === "authenticated"){
        router.replace("/")
    }
  },[status])

  const signinHandler =  async () => {
    const res = await signIn("credentials" , {
        email , password , redirect:false
    })
    if(!res.error){
        router.push("/")
    }
  };
  return (
    <div className="signin-form">
      <h3>Sign In Form</h3>
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
      <button onClick={signinHandler}>Sign in</button>
      <div>
        <p>Create an account?</p>
        <Link href="/SignUp"> Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInPage;
