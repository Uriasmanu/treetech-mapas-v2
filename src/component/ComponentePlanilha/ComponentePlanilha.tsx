import Image from 'next/image';
import planilhaIcon from '@/image/planilha.png';

interface ComponentePlanilhaProps {
    texto: string;
    id: string;
}

export default function ComponentePlanilha({ texto, id, }: ComponentePlanilhaProps)  {
    return (
        <div id={id}>
           <input
                type="file"
                className="hidden"
                accept=".csv"
            />
            <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer w-[40rem] text-center mx-auto gap-4 p-28 border-4 border-dashed border-green-900"
            >
                <Image
                    src={planilhaIcon}
                    alt="Ícone de planilha"
                    className="w-[30px] h-[30px]"
                />
                <h2 className="text-base font-bold">{texto}</h2>
            </label>
        </div>
    );
}
