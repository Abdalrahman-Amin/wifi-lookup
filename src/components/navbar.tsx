import Image from "next/image";

export default function Navbar() {
   return (
      <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
         <div className="flex items-center space-x-4">
            <Image src="/logo1.png" alt="Logo 1" width={50} height={50} />
            <Image src="/logo2.png" alt="Logo 2" width={50} height={50} />
            <Image src="/logo3.png" alt="Logo 3" width={50} height={50} />
         </div>
         <h1 className="text-lg font-bold">My Application</h1>
      </nav>
   );
}
