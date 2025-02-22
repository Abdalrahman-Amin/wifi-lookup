"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use "next/router" for Pages Router
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
export default function Dashboard() {
   const router = useRouter();
   const [user, setUser] = useState<User | null>(null);
   const [nationalId, setNationalId] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState<string | null>(null);

   // ✅ Check if the user is logged in
   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { user },
         } = await supabase.auth.getUser();
         if (!user) {
            router.push("/login"); // Redirect if not logged in
         } else {
            setUser(user);
         }
      };

      fetchUser();
   }, [router]);

   // ✅ Function to insert WiFi credentials into Supabase
   const handleAddData = async () => {
      setMessage(null);

      if (!nationalId || !username || !password) {
         setMessage("All fields are required!");
         return;
      }

      const { error } = await supabase
         .from("wifi_credentials")
         .insert([{ national_id: nationalId, username, password }]);

      if (error) {
         setMessage("Error adding data: " + error.message);
      } else {
         setMessage("WiFi credentials added successfully!");
         setNationalId("");
         setUsername("");
         setPassword("");
      }
   };

   const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/login");
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <Card className="p-6 w-full max-w-md shadow-lg">
            <CardContent>
               <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
               {user && <p className="mb-4">Logged in as: {user.email}</p>}

               {/* WiFi Data Entry Form */}
               <h3 className="text-lg font-medium mb-2">
                  Add WiFi Credentials
               </h3>
               <Input
                  type="text"
                  placeholder="National ID"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="mb-2"
               />
               <Input
                  type="text"
                  placeholder="WiFi Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mb-2"
               />
               <Input
                  type="password"
                  placeholder="WiFi Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4"
               />
               <Button onClick={handleAddData} className="w-full">
                  Add Data
               </Button>
               {message && <p className="mt-2 text-center">{message}</p>}

               <Button onClick={handleLogout} className="mt-4 w-full">
                  Logout
               </Button>
            </CardContent>
         </Card>
      </div>
   );
}
