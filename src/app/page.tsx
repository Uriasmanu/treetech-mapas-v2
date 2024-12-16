'use client';

import Image from 'next/image';
import logo from './logo.png';
import BotaoAtualizar from '@/component/BotaoAtualizar/BotaoAtualizar';
import Loader from '@/component/Loader/Loader';
import { useEffect, useState } from 'react';
import ComponentePlanilha from '@/component/ComponentePlanilha/ComponentePlanilha';
import MensagemErro from '@/component/MensagemErro/MensagemErro';


export default function Home() {
  const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
  const [planilhaCompleta, setPlanilhaCompleta] = useState<File | null>(null);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleErrorClose = () => {
    setErro('');
  };

  useEffect(() => {
    if (erro) {
      // Fecha o erro após 4 segundos
      const timer = setTimeout(handleErrorClose, 4000);

      // Limpa o timer se o componente for desmontado ou se a mensagem de erro for removida
      return () => clearTimeout(timer);
    }
  }, [erro]);

  const handleClick = () => {
    if (!novaPlanilha || !planilhaCompleta) {
      setErro('Ambas as planilhas precisam ser selecionadas para que o sistema possa funcionar corretamente.');
      return;
    }

    setLoading(true);
    console.log('Nova Planilha:', novaPlanilha);
    console.log('Planilha Completa:', planilhaCompleta);
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
        {erro && (
          <div className='fixed'>
            <MensagemErro mensagemErro={erro} /> {/* Só exibe se houver erro */}
          </div>
        )}

        <section className='flex gap-16 justify-center w-[90rem]'>
          <ComponentePlanilha
            id="nova-planilha"
            texto="Clique aqui para selecionar o mapeamento que precisa ser atualizado"
            onFileSelect={setNovaPlanilha}
          />

          <ComponentePlanilha
            id="planilha-completa"
            texto="Clique aqui para selecionar o mapeamento que tem os Mnemônicos corretos"
            onFileSelect={setPlanilhaCompleta}
          />
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
