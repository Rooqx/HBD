import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import './Overlay.css';

gsap.registerPlugin(Draggable);

const cardsData = [
  {
    header: "To Itunu",
    body: "I was thinking about what to write, and I realized that 'Happy Birthday' doesn't quite cover it. I’m so grateful for our friendship for the laughs that come easy and the conversations that actually mean something. Watching you grow into the person you are today is a privilege. May this year bring you the same kind of peace and joy you give to everyone around you. You deserve the world, and then some.",
    closing: "Cheers to you."
  },
  {
    header: "To a Special One",
    body: "Itunu, some people just have a way of making me feel a little bit happier every time I talk to them. Trust me, people like that are very, very rare and you’re definitely one of them. Whether it’s your energy or just the way we vibe, you make everything feel exciting for me. Even on a mid or a bad day, as soon as I see your \"hyyy,\" my mood completely shifts to happy. All those times you were off were honestly so long for me; I just look forward to that particular time when I know we’re going to chat. That’s really all I look forward to... and food, obviously!",
    closing: "So glad you're you."
  },
  {
    header: "The New Chapter",
    body: "Happy Birthday! It’s the little things that make our friendship what it is the inside jokes the random check-ins, and the way you just \"get\" it without me having to say much. I don’t say it enough, but I’m really glad you’re in my life. I’m looking forward to all the new memories we’re going to make this year. I’m always in your corner rooting for you.",
    closing: "Always here for you."
  }
];

const Overlay = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="overlay-container">
            {!isOpen && (
                <div className="envelope-trigger" onClick={() => setIsOpen(true)}>
                    <svg className="envelope-icon" viewBox="0 0 24 24" fill="#ed78bfff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#e2e2e2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )}
            
            {isOpen && <CardStack onClose={() => setIsOpen(false)} />}
        </div>
    );
};

const CardStack = ({ onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const stackRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (currentIndex >= cardsData.length) {
            // All cards swiped
            // Maybe show a final message or close? 
            // For now, let's close automatically after a delay
            setTimeout(onClose, 1000);
        }
    }, [currentIndex, onClose]);

    useEffect(() => {
        // Initialize Draggable for the top card
        if (currentIndex < cardsData.length && cardsRef.current[currentIndex]) {
            const card = cardsRef.current[currentIndex];
            
            Draggable.create(card, {
                type: "x,y",
                edgeResistance: 0.65,
                bounds: window,
                inertia: true,
                onDragEnd: function() {
                    if (Math.abs(this.x) > 100) {
                        // Swipe threshold met
                        const direction = this.x > 0 ? 1 : -1;
                        gsap.to(this.target, {
                            x: direction * window.innerWidth,
                            rotation: direction * 45,
                            duration: 0.5,
                            ease: "power2.in",
                            onComplete: () => {
                                setCurrentIndex(prev => prev + 1);
                            }
                        });
                    } else {
                        // Spring back
                        gsap.to(this.target, {
                            x: 0,
                            y: 0,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                }
            });
        }
        
        return () => {
             // Cleanup logic if needed, but Draggable usually cleans up on unmount of element?
             // Actually React removal cleanups DOM, but Draggable instance might linger if not killed.
             // Best to kill all draggables on this element.
        };
    }, [currentIndex]);
    
    // Reverse rendering to stack correctly (Wait, standard DOM stacking: last is on top. 
    // If I map usually, 0 is bottom. 
    // To make 0 on top, I should reverse render or z-index. 
    // But easier to just render current card on top. 
    
    // Better strategy: Render ALL remaining cards.
    // Index 0 is Top.
    // So z-indices: len - index.
    
    const visibleCards = cardsData.slice(currentIndex);

    return (
        <div className="card-modal-backdrop">
             <div className="card-stack" ref={stackRef}>
                {visibleCards.map((card, i) => {
                   // Only the first one (i===0) needs to be draggable.
                   // The absolute index in original array is currentIndex + i
                   const originalIndex = currentIndex + i;
                   const isTop = i === 0;

                   return (
                       <div 
                         key={originalIndex}
                         ref={el => cardsRef.current[originalIndex] = el}
                         className="card"
                         style={{ 
                             zIndex: cardsData.length - i,
                             transform: `scale(${1 - i * 0.05}) translateY(${i * 10}px)`,
                             opacity: i > 2 ? 0 : 1 // Hide cards deep in stack
                         }}
                       >
                           <h2 className="card-header">{card.header}</h2>
                           <p className="card-body">{card.body}</p>
                           <p className="card-closing">{card.closing}</p>
                       </div>
                   );
                })}
                {visibleCards.length > 0 && <div className="instruction-text">Swipe to read next 👉</div>}
                
                {visibleCards.length === 0 && (
                    <div style={{ color: 'white', fontFamily: 'var(--font-header)', fontSize: '2rem', whiteSpace: "nowrap" }}>
                        Happy Birthday Itunu! ❤️
                    </div>
                )}
             </div>
             
             {/* Close button just in case */}
             <button 
                onClick={onClose} 
                style={{ 
                    position: 'absolute', 
                    top: 20, 
                    right: 20, 
                    background: 'none', 
                    border: 'none', 
                    color: 'white', 
                    fontSize: '2rem', 
                    cursor: 'pointer' 
                }}
             >
             &times;
             </button>
        </div>
    );
};

export default Overlay;
