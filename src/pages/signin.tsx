import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../styles/rescue.png"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        // handle sign-in error
      } else {
        // handle successful sign-in
        router.push("/");
      }
    });
  };

  return (
    <div className = "bg">
    <div className = "margin">
      <div className = "logo-container title-container">
        <div>
      <Image src= {logo} width={128} height={128} alt="logo"></Image>
      </div>
      <div>
      <h1 className = "title"> Small Vessel</h1>
      <h1 className = "title"> Emergency </h1>
      <h1 className = "title"> Alert System</h1>
      </div>
      </div>
    <form onSubmit={handleSubmit} className = "form">
      <h1>Authorized Personnel</h1>
      <div className = "form-input">
      <label>
        
        <input
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder = "Username"
        />
      </label>
      </div>

      <label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder = "Password"
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
    </div>
    </div>
    
  );
}