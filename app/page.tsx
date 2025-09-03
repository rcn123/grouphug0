"use client";

import Image from "next/image";
import Link from 'next/link'
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Home() {

  const router = useRouter();
  const [statusText, setStatus] = useState<string | null>(null); 

  async function seed() 
  {
    setStatus("Seeding…");
    const res = await fetch("/api/seed", {method: "POST"});
    
    if(res.ok){
        const data = await res.json();
        setStatus(`Seed Success! Seeded ${data.count} products`);        
        router.refresh();
    }
    else{
      setStatus("Seed failed")
    }      
  }  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/products">Products</Link>
         
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
         <button onClick={seed} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blur-700">Seed the base</button>
         {
            statusText && (<p className="mt-4 text-sm text-gray-700">{statusText}</p>)
         }
      </footer>
    </div>
  );
}
