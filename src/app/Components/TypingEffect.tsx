//@ts-nocheck
'use client'
import { useState, useEffect } from 'react';

export default function TypingEffect({ text, speed = 150, className = "" }) {
    text= "Hi "+text+"...";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (index < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, index + 1));
        setIndex(index + 1);
      }, speed);
    }
    return () => clearTimeout(timeoutId);
  }, [index, text, speed]);

  return (
    <span className="text-4xl font-bold">
      {displayedText}
      {/* Show caret only while typing */}
      {index < text.length && <span className="caret">|</span>}
      <style jsx>{`
        .caret {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
