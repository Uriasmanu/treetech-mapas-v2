import logo from '@/app/logo.png';
import BotaoNavegar from '@/components/BotaoNavegar/BotaoNavegar';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="flex flex-col items-center w-full h-screen bg-green-500 pb-96 justify-between">
      <header className="flex items-center gap-8 bg-white px-4 py-4 shadow-lg w-full justify-center">
        <h1 className="text-6xl font-bold text-#333333">Treetech Dev Mapeamentos</h1>
        <Image src={logo} width={90} height={90} alt='logo da empresa' />
      </header>

      <BotaoNavegar />

    </div>
  );
}
