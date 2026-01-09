"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delay?: number;
}

export default function Typewriter({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delay = 1500,
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const fullWord = words[currentWordIndex];

            if (isDeleting) {
                setCurrentText((prev) => prev.substring(0, prev.length - 1));
                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                setCurrentText((prev) => fullWord.substring(0, prev.length + 1));
                if (currentText === fullWord) {
                    timer = setTimeout(() => setIsDeleting(true), delay);
                    return;
                }
            }

            timer = setTimeout(
                handleTyping,
                isDeleting ? deletingSpeed : typingSpeed
            );
        };

        timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

    return (
        <span className="text-brand-bronze">
            {currentText}
            <span className="animate-cursor ml-1">|</span>
        </span>
    );
}
