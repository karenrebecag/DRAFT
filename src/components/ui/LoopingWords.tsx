'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './LoopingWords.module.scss';

interface LoopingWordsProps {
  words: string[];
  className?: string;
}

export const LoopingWords: React.FC<LoopingWordsProps> = ({ words, className = '' }) => {
  const wordListRef = useRef<HTMLUListElement>(null);
  const edgeElementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentIndexRef = useRef(0);

  const totalWords = words.length;
  const wordHeight = 100 / totalWords;

  const updateEdgeWidth = useCallback(() => {
    const wordList = wordListRef.current;
    const edgeElement = edgeElementRef.current;
    if (!wordList || !edgeElement) return;

    const centerWordIndex = (currentIndexRef.current + 1) % totalWords;
    const centerWord = wordList.children[centerWordIndex] as HTMLLIElement;

    if (centerWord) {
      const centerWordWidth = centerWord.getBoundingClientRect().width;
      const listWidth = wordList.getBoundingClientRect().width;
      const percentageWidth = (centerWordWidth / listWidth) * 100;

      gsap.to(edgeElement, {
        width: `${percentageWidth}%`,
        duration: 0.5,
        ease: 'expo.out',
      });
    }
  }, [totalWords]);

  const moveWords = useCallback(() => {
    const wordList = wordListRef.current;
    if (!wordList) return;

    currentIndexRef.current++;

    gsap.to(wordList, {
      yPercent: -wordHeight * currentIndexRef.current,
      duration: 1.2,
      ease: 'elastic.out(1, 0.85)',
      onStart: updateEdgeWidth,
      onComplete: function() {
        if (currentIndexRef.current >= totalWords - 3) {
          wordList.appendChild(wordList.children[0]);
          currentIndexRef.current--;
          gsap.set(wordList, { yPercent: -wordHeight * currentIndexRef.current });
        }
      },
    });
  }, [wordHeight, updateEdgeWidth, totalWords]);

  useEffect(() => {
    updateEdgeWidth();

    timelineRef.current = gsap.timeline({ repeat: -1, delay: 1.5 });
    timelineRef.current
      .call(moveWords)
      .to({}, { duration: 2.5 });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [moveWords, updateEdgeWidth]);

  return (
    <span className={`${styles.loopingWords} ${className}`}>
      <span className={styles.container}>
        <ul ref={wordListRef} className={styles.list}>
          {words.map((word, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.word}>{word}</span>
            </li>
          ))}
        </ul>
      </span>
      <span className={styles.fade}></span>
      {/* Hidden ref for width calculations */}
      <span ref={edgeElementRef} className={styles.hiddenRef}></span>
    </span>
  );
};

export default LoopingWords;
