import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const comp = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
             // Fade out overlay then call complete
             gsap.to(overlayRef.current, {
                 opacity: 0,
                 duration: 1,
                 onComplete: onComplete
             })
        }
      });

      const textConfig = { 
        opacity: 0, 
        filter: "blur(10px)", 
        y: 20,
        duration: 1,
        ease: "power2.out"
      };
      
      const textExit = {
        opacity: 0,
        filter: "blur(10px)",
        y: -20,
        duration: 0.8,
        ease: "power2.in",
        delay: 1
      };

      // Sequence
      tl.to(text1Ref.current, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 })
        .to(text1Ref.current, textExit)
        
        .to(text2Ref.current, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 })
        .to(text2Ref.current, textExit)
        
        .to(text3Ref.current, { opacity: 1, filter: "blur(0px)", y: 0, scale: 1.2, duration: 1.5 })
        .to(text3Ref.current, { opacity: 0, duration: 0.5, delay: 0.5 }); // Quick fade out for reveal

    }, comp);
    
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={comp}>
      <div className="loader-bg" ref={overlayRef}></div>
      <div className="loader-content">
        <h1 className="loader-text header-text" ref={text1Ref}>A New Chapter...</h1>
        <h1 className="loader-text header-text" ref={text2Ref}>For A Beautiful Soul...</h1>
        <h1 className="loader-text decorative" ref={text3Ref} style={{ fontSize: '4rem', color: 'var(--color-rose-gold)' }}>Your Day.</h1>
      </div>
    </div>
  );
};

export default Loader;
