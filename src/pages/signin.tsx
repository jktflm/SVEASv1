import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        
        <input
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder = "Username"
        />
      </label>
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
  );
}