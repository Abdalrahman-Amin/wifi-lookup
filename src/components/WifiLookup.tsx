"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Logo from "./Logo";

interface WifiData {
   username: string;
   password: string;
}

export default function WifiLookup() {
   const [nationalId, setNationalId] = useState("");
   const [wifiData, setWifiData] = useState<WifiData | null>(null);
   const [error, setError] = useState<string | null>(null);

   const fetchWifiCredentials = async () => {
      setError(null);
      setWifiData(null);

      const { data, error } = await supabase
         .from("wifi_credentials")
         .select("username, password")
         .eq("national_id", nationalId)
         .single();

      if (error || !data) {
         setError("No WiFi credentials found for this ID.");
      } else {
         setWifiData(data);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         {/* Logos Section - Bigger & Horizontally Aligned */}
         <div className="flex flex-row items-center space-x-6 mb-6">
            <Logo src="/logo2.png" alt="Logo 2" width={300} height={300} />
            <Logo src="/logo3.png" alt="Logo 3" width={300} height={300} />
         </div>

         {/* WiFi Credentials Form */}
         <Card className="p-6 w-full max-w-md shadow-lg">
            <CardContent>
               <h2 className="text-xl font-semibold mb-4">
                  Find Your WiFi Credentials
               </h2>
               <Input
                  type="text"
                  placeholder="Enter your National ID"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="mb-4"
               />
               <Button onClick={fetchWifiCredentials} className="w-full">
                  Get Credentials
               </Button>
               {error && <p className="text-red-500 mt-4">{error}</p>}
               {wifiData && (
                  <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mt-4 p-4 bg-gray-100 rounded-lg"
                  >
                     <p>
                        <strong>Username:</strong> {wifiData.username}
                     </p>
                     <p>
                        <strong>Password:</strong> {wifiData.password}
                     </p>
                  </motion.div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
