'use client';
import Image from 'next/image';
import planilhaIcon from '@/image/planilha.png';
import { ChangeEvent, useState } from 'react';
import ComponenteFile from '../ComponenteFile/ComponenteFile';

import './_ComponentePlanilha.scss'
interface ComponentePlanilhaProps {
    texto: string;
    id: string;
    onFileSelect: (file: File | null) => void;
}

export default function ComponentePlanilha({ texto, id, onFileSelect }: ComponentePlanilhaProps) {

    const [nomeArquivo, setNomeArquivo] = useState<string>('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0] || null;
        if (file) {
            setNomeArquivo(file.name);
            onFileSelect(file);
        } else {
            setNomeArquivo('');
        }
    }

    return (
        <div id={id} className="input-planilha">
            <input
                type="file"
                onChange={handleFileChange}
                accept='.csv'
                id={`file-upload-${id}`}
            />
            <label
                htmlFor={`file-upload-${id}`}
            >
                <ComponenteFile nomeArquivo={nomeArquivo} />

                <div className='contain-imagem'>
                    <Image
                        src={planilhaIcon}
                        alt="Ícone de planilha"
                        className="img"
                    />
                    <h2 className="text-base">{texto}</h2>
                </div>
            </label>


        </div>

    );
}
