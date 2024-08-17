'use client'
import React, { useState } from 'react';

export default function TextToSpeech() {
  const [text, setText] = useState('');

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
    <form>
      <input type="text" placeholder='done' value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSpeak}>Speak</button>
    </form>
    </div>
  );
}