import { ChangeEvent } from 'react';
import Image from 'next/image';
import planilhaIcon from '@/image/planilha.png';

interface ComponentePlanilhaProps {
    texto: string;
    id: string;
    onFileSelect: (file: File | null) => void;
}

export default function ComponentePlanilha({ texto, id, onFileSelect }: ComponentePlanilhaProps) {
    const handleFileChange = (event: ChangeEvent <HTMLInputElement>) => {
        const file = event.target.files![0] || null;
        onFileSelect(file);
    }


    return (
        <div id={id}>
            <input 
                type="file" 
                className="hidden" 
                id={`file-upload-${id}`} 
                onChange={handleFileChange} 
                accept='.csv'
            />
            <label 
                htmlFor={`file-upload-${id}`} 
                className="flex flex-col items-center cursor-pointer w-[70%] text-center mx-auto gap-4 p-28 border-4 border-dashed border-green-900"
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
