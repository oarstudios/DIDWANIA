import React, { useEffect, useState } from 'react';

function Typing() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const texts = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, dolore?",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    
    // Add more texts here if needed
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < texts[currentIndex].length) {
        setText((prev) => prev + texts[currentIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } 
    }, 100);

    return () => clearTimeout(timeout);
  }, [charIndex, currentIndex]);

  const handleType = (index)=>{
    setCurrentIndex(index)
    setText('')
    setCharIndex(0)
  }

  return (
    <div>
      {text}|
      <button onClick={()=>handleType(0)}>1</button>
      <button onClick={()=>handleType(1)}>2</button>
      <button onClick={()=>handleType(2)}>3</button>
      <button onClick={()=>handleType(3)}>4</button>
    </div>
  );
}

export default Typing;
