"use client";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const { data, error } = await login(email, password);

        if (error) {
          setError(error.message);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, password]
  );

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <h1>Login</h1>
      <div>
        <p>Email</p>
        <input
          type="text"
          name="email"
          aria-label="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          name="password"
          aria-label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      <button type="submit" className="w-20">
        Login
      </button>
    </form>
  );
}
