'use client';
import Image from 'next/image';
import planilhaIcon from '@/image/planilha.png';
import { ChangeEvent } from 'react';
import ComponenteFile from '../ComponenteFile/ComponenteFile';

import './_ComponentePlanilha.scss'
interface ComponentePlanilhaProps {
    texto: string;
    id: string;
    onFileSelect: (file: File | null) => void;
}

export default function ComponentePlanilha({ texto, id, onFileSelect }: ComponentePlanilhaProps) {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0] || null;
        onFileSelect(file);


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
                <ComponenteFile/>
                <Image
                    src={planilhaIcon}
                    alt="Ícone de planilha"
                    className="img"
                />
                <h2 className="text-base">{texto}</h2>
            </label>


        </div>

    );
}
