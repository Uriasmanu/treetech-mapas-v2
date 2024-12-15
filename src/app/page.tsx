'use client';

import Image from 'next/image';
import logo from './logo.png';
import BotaoAtualizar from '@/component/BotaoAtualizar/BotaoAtualizar';
import Loader from '@/component/Loader/Loader';
import { useState } from 'react';
import ComponentePlanilha from '@/component/ComponentePlanilha/ComponentePlanilha';




export default function Home() {


  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

  }

  return (
    <div className='flex-col flex items-center w-[100vw] h-[100vh] py-8'>
      <header className='w-full flex flex-col items-center gap-3 py-4'>
        <div className='flex items-center justify-center gap-4'>
          <h1 className='text-6xl font-bold'>Treetech Mapas</h1>
          <Image src={logo} alt="Logo da Empresa" className='w-[80px] h-[80px]' />
        </div>
      </header>

      <main className="w-full h-screen bg-green-500 p-4 flex flex-col items-center justify-center gap-16">

        <section className='flex gap-16 justify-center w-[90rem]'>
          <ComponentePlanilha />

          <ComponentePlanilha />
        </section>


        <section className='flex gap-10 justify-center'>
          <BotaoAtualizar onClick={handleClick} />

        </section>

        {loading && (
          <div className='flex fixed w-screen h-screen bg-green-700 bg-opacity-90  items-center justify-center top-0'>
            <Loader />
          </div>
        )}

      </main>

    </div>
  );
}
