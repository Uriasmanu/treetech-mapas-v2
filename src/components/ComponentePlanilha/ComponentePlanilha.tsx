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

interface FileDetails {
    nome: string;
    tamanho: number; 
  }

export default function ComponentePlanilha({ texto, id, onFileSelect }: ComponentePlanilhaProps) {

    const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0] || null;
        if (file) {
            setFileDetails({
                nome: file.name,
                tamanho: file.size,
            });
            onFileSelect(file);
        } else {
            setFileDetails(null);
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
            <label htmlFor={`file-upload-${id}`}>
                {/* Renderiza ComponenteFile apenas se houver um arquivo selecionado */}
                {fileDetails && (
                    <ComponenteFile
                        nomeArquivo={fileDetails.nome}
                        tamanhoArquivo={fileDetails.tamanho}
                    />
                )}

                {/* Renderiza contain-imagem apenas se NÃO houver um arquivo selecionado */}
                {!fileDetails && (
                    <div className="contain-imagem">
                        <Image
                            src={planilhaIcon}
                            alt="Ícone de planilha"
                            className="img"
                        />
                        <h2 className="text-base">{texto}</h2>
                    </div>
                )}
            </label>

        </div>

    );
}
