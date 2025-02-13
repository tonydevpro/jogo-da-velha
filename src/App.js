import{useState} from 'react';
import './App.css';

function App() {

  const [jogada, setJogada]=useState(true);
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(''));
  const [vencedor, setVencedor] = useState(null);

  function verificarVencedor (novoTabuleiro){
    const combinacoesVencedoras = [
      [0,1,2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let combinacao of combinacoesVencedoras){
      const [a,b,c] = combinacao;
      if(novoTabuleiro[a] && novoTabuleiro[a] === novoTabuleiro[b] && novoTabuleiro[a] === novoTabuleiro[c]){
        return novoTabuleiro[a];
      }
      
    }
    return null;
  }

  function quemJoga(i){
        if (tabuleiro[i] !== '' || vencedor) return;
        
        const novoTabuleiro = [...tabuleiro];
        novoTabuleiro[i] = jogada ? 'x' : 'o';
        setTabuleiro(novoTabuleiro);
        setJogada(!jogada);

        const ganhador = verificarVencedor(novoTabuleiro);
        if(ganhador){
          setVencedor(ganhador);
        }
      }

  function Quadrado({i}){   
    return(
      <button onClick={()=> quemJoga(i)}>{tabuleiro[i]}</button>
    );
  }



  return (
    <div className="geral">
      <h1>Jogo da Velha</h1>
      {vencedor ? <h2>Vencedor: {vencedor}</h2> : <h2>Vez de: {jogada ? "X" : "O"}</h2>}
      <div className='jogo'>
        <div className="jogoQuadrados">
            <Quadrado i={0} />
            <Quadrado i={1} />
            <Quadrado i={2} />
          </div>
          <div className="jogoQuadrados">
            <Quadrado i={3} />
            <Quadrado i={4} />
            <Quadrado i={5} />
          </div>
          <div className="jogoQuadrados">
            <Quadrado i={6} />
            <Quadrado i={7} />
            <Quadrado i={8} />
          </div>
      </div>
      {vencedor && (
  <button 
    className="reiniciar" 
    onClick={() => {
      setTabuleiro(Array(9).fill('')); // Reseta o tabuleiro
      setVencedor(null); // Remove o vencedor
      setJogada(true); // Volta para o jogador "X"
    }}
  >
    Reiniciar Jogo
  </button>
)}
    </div>
  );
}

export default App;
