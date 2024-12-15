'use client';

import Image from 'next/image';
import logo from './logo.png';
import planilhaIcon from '../image/planilha.png';
import BotaoAtualizar from '@/component/BotaoAtualizar/BotaoAtualizar';
import Loader from '@/component/Loader/Loader';
import { useState } from 'react';


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

        <section className='flex gap-16 justify-center'>

          <div className="">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-[40rem] text-center mx-auto gap-4 p-28 border-4 border-dashed border-green-900">
              <Image src={planilhaIcon} alt="Ícone de planilha" className='w-[30px] h-[30px]' />
              <h2 className="text-base font-bold ">Clique aqui para selecionar o mapeamento que precisa ser atualizado</h2>
            </label>
          </div>

          <div className="">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-[40rem] text-center mx-auto gap-4 p-28 border-4 border-dashed border-green-900">
              <Image src={planilhaIcon} alt="Ícone de planilha" className='w-[30px] h-[30px]' />
              <h2 className="text-base font-bold ">Clique aqui para selecionar o mapeamento que tem os Mnemônicos corretos</h2>
            </label>
          </div>


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
