import './BotaoAtualizar.css';

interface BotaoAtualizarProps {
    onClick: () => void;
  }

  export default function BotaoAtualizar({ onClick }: BotaoAtualizarProps) {
    return (
        <button onClick={onClick} className="botao-atualizar">
            Atualizar
        </button>
    );
}
