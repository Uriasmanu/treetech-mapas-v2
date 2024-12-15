import Image from 'next/image';
import planilhaIcon from '@/image/planilha.png';

export default function ComponentePlanilha() {
    return (
        <div>
           <input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".csv" // Restringe a seleção a arquivos de planilha
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
                <h2 className="text-base font-bold"></h2>
            </label>
        </div>
    );
}
