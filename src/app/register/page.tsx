"use client";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const { data, error } = await signUp(email, password);

        if (error) {
          setError(error.message);
        } else {
          router.push("/login");
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
    <form onSubmit={handleSignUp} className="flex flex-col">
      <h1>Sign up</h1>
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button type="submit" className="w-20">Sign up</button>
    </form>
  );
}
