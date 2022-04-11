import './App.css';
import {useEffect, useState} from 'react';
import CardTile from './components/CardTile/CardTile';

const cardImages = [
  {"src": "/images/1.jpg", matched: false},
  {"src": "/images/2.jpg", matched: false},
  {"src": "/images/3.jpg", matched: false},
  {"src": "/images/4.jpg", matched: false},
  {"src": "/images/5.jpg", matched: false},
  {"src": "/images/6.jpg", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)
  const [disabled, setDisabled] = useState(false)



  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({ ...card, id: Math.random()})) 
    
    setChoice1(null)
    setChoice2(null)
    setTurns(0)
    setCards(shuffledCards)
  }
  console.log(cards, turns)

const handleSelection = (card)=>{
  choice1 ? setChoice2(card) : setChoice1(card)
  
}

useEffect(()=>{
  if (choice1&&choice2){
    setDisabled(true)
    if (choice1.src===choice2.src){
      setCards((prevCards)=>{
        return prevCards.map(card=>{
          if (card.src === choice1.src){
            return {...card, matched: true}
          }
          else {
            return card;
          }
        })
      })
      resetTurn();
    }
    else {
      setTimeout(()=>{resetTurn()}, 1000)
    }
    
  }
}, [choice1, choice2])

const resetTurn = () => {
  setChoice1(null)
  setChoice2(null)
  setTurns(initialTurns => initialTurns+1)
  setDisabled(false)
}

useEffect(()=>{
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>React Game</h1>
      <button onClick={shuffleCards}>Restart</button>

      <div className='card-grid'>
        {cards.map((card)=>(
          <CardTile key={card.id} 
          card={card} 
          handleSelection={handleSelection}
          flipped={card===choice1 || card ===choice2 || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
    
  );
}

export default App;
