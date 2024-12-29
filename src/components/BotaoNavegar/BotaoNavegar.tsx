'use client';
import { useRouter } from 'next/navigation';

// Função para navegar para Mapeamento
export default function BotaoNavegar() {
    const router = useRouter();

    // Função para navegar para Mapeamento
    const handleNavigateToMapeamento = () => {
        router.push('/mapeamento');
    }

    // Função para navegar para Remapeamento
    const handleNavigateToRemapeamento = () => {
        router.push('/remapeamento');
    }

    return (
        <>
            <div className="grid grid-cols-2 w-[50%] gap-24 max-[500px]:grid-cols-1 px-3">
                <div
                    onClick={handleNavigateToMapeamento}
                    className="group w-full rounded-lg bg-[#00597a] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                >
                    <p className="text-white text-2xl">Novo Mapeamento</p>
                    <p className="text-white text-sm">novos mapas</p>
                    <svg className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="-4 0 34 34">
                        <g fill="none" fill-rule="evenodd">
                            <g>
                                <path d="M1 1.993c0-.55.45-.993.995-.993h17.01c.55 0 1.34.275 1.776.625l3.44 2.75c.43.345.78 1.065.78 1.622v26.006c0 .55-.447.997-1 .997H2c-.552 0-1-.452-1-.993V1.993z" stroke="#ffffff" stroke-width="2" />
                                <path fill="#ffffff" d="M18 2h1v6h-1z" />
                                <path fill="#ffffff" d="M18 7h6v1h-6z" />
                                <g fill="#ffffff">
                                    <path d="M6 12h14v1H6z" />
                                    <path d="M6 21h14v1H6z" />
                                    <path d="M6 12h1v10H6z" />
                                    <path d="M19 12h1v10h-1z" />
                                    <g>
                                        <path d="M6 15h14v1H6z" />
                                        <path d="M6 18h14v1H6z" />
                                    </g>
                                    <path d="M9 13h1v8H9z" />
                                </g>
                            </g>

                        </g>

                    </svg>
                </div>
                <div
                    onClick={handleNavigateToRemapeamento}
                    className="group w-full rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#e2e2e2]"
                >
                    <p className="text-white text-2xl">Remapeamento</p>
                    <p className="text-white text-sm">Atualização de mapas</p>

                    <svg className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="36px" height="36px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve">
                        <g>
                            <polygon fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" points="20,9 47,9 47,63 8,63 8,21  " />
                            <polyline fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" points="24,6 29,1 56,1 56,55 49,55  " />
                            <polyline fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" points="8,21 20,21 20,9  " />
                        </g>
                    </svg>
                </div>
            </div >

        </>
    )
}
