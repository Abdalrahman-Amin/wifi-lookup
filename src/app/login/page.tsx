"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use "next/router" for Pages Router
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState<string | null>(null);

   const handleLogin = async () => {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });

      if (error) {
         setError("Invalid credentials. Try again.");
      } else {
         router.push("/dashboard"); // Redirect to dashboard on success
      }
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <Card className="p-6 w-full max-w-md shadow-lg">
            <CardContent>
               <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
               <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
               />
               <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4"
               />
               <Button onClick={handleLogin} className="w-full">
                  Login
               </Button>
               {error && <p className="text-red-500 mt-4">{error}</p>}
            </CardContent>
         </Card>
      </div>
   );
}
