'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef } from 'react';
import gsap from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function MyHome() {
    
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    let xPercent = 0;
    let direction = 1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(slider.current, {
            scrollTrigger: {
              trigger: document.documentElement,
              scrub: 0.5,
              start: 0,
              end: window.innerHeight,
              onUpdate: e => direction = e.direction * -1
            },
            x: "-300px",
          })
        requestAnimationFrame(animation);
    },[])

    const animation = () => {
        if(xPercent <= -100){
            xPercent = 0;
          }
        if(xPercent > 0){
          xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        requestAnimationFrame(animation);
        xPercent += 0.1 * direction;
      }

    

  return (
    <main className={styles.main}>
      <Image 
        src="/images/bg-image.jpg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Infinite Text Scroll -</p>
          <p ref={secondText}>Infinite Text Scroll -</p>
        </div>
      </div>
    </main>
  )
}