import './CardTile.css'

export default function CardTile({card, handleSelection, flipped, disabled}){

    const clickHandler = () =>{
        disabled ? console.log("card is disabled"):handleSelection(card)
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ""}>
              <img className='front' src={card.src} />
              <img className='rear' src='/images/cover.jpg' onClick={clickHandler}/>
            </div>
          </div>
    );    
}

