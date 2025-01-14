// import React, { useEffect, useState, useRef } from 'react';
// import './Audio.css';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const spotifyIcon = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg';
// const alexaIcon = '/amazon-alexa.svg';

// const AudioControl = () => {
//     const images = Array.from({ length: 60 }, (_, i) => `/imgseq/speaker/numi_speaker_${String(i + 1).padStart(4, '0')}.png`);
//     const [currentFrame, setCurrentFrame] = useState(0);
//     const totalFrames = images.length;
//     const fps = 5; // Frames per second for the "video" playback
//     const frameInterval = useRef(null);
//     const isPlaying = useRef(false);
//     const textAnimationPlayed = useRef(false); // Flag to track text animation status

//     // GSAP text animation
//     const playTextAnimations = () => {
//         if (!textAnimationPlayed.current) {
//             gsap.timeline()
//                 .to('.titless', {
//                     opacity: 1,
//                     y: 0,
//                     duration: 1,
//                 })
//                 .to('.feature-lists', {
//                     opacity: 1,
//                     x: 0,
//                     duration: 1,
//                 }, "-=0.5")
//                 .to('.icon-containers', {
//                     opacity: 1,
//                     duration: 1,
//                 }, "-=0.5");

//             textAnimationPlayed.current = true; // Mark that the animations have been played
//         }
//     };

//     // Image sequence playback logic
//     useEffect(() => {
//         // Preload images
//         images.forEach((src) => {
//             const img = new Image();
//             img.src = src;
//         });

//         const playSequence = () => {
//            // if (isPlaying.current) return;
//             isPlaying.current = true;

//             frameInterval.current = setInterval(() => {
//                 setCurrentFrame((prevFrame) => {
//                     if (prevFrame < totalFrames - 1) {
//                         return prevFrame + 1;
//                     } else {
//                         clearInterval(frameInterval.current);
//                         isPlaying.current = false;
//                         playTextAnimations();  // Trigger text animation once video finishes
//                         return prevFrame;
//                     }
//                 });
//             }, 1000 / fps);
//         };

//         const stopSequence = () => {
//             if (frameInterval.current) {
//                 clearInterval(frameInterval.current);
//                 isPlaying.current = false;
//             }
//         };

//         const resetPlayback = () => {
//             stopSequence();
//             setCurrentFrame(0); // Reset image sequence
//             textAnimationPlayed.current = false; // Reset text animations
//         };

//         // ScrollTrigger for image sequence and text animations
//         ScrollTrigger.create({
//             trigger: '.ten-section',
//             start: 'top center',
//             end: 'bottom center',
//             onEnter: () => {
//                 if (!isPlaying.current && currentFrame < totalFrames - 1) {
//                     playSequence();
//                 }
//             },
//             onLeave: stopSequence,
//             onEnterBack: () => {
//                 resetPlayback(); // Reset both the video and text animation on re-entry
//                 playSequence();
//             },
//             onLeaveBack: stopSequence,
//             id: 'audioScroll',
//         });

//         // Additional ScrollTrigger to reset the text animation when scrolling
//         ScrollTrigger.create({
//             trigger: '.ten-section',
//             start: 'top center',
//             onUpdate: () => {
//                 // Play text animation only when the video reaches the last frame
//                 if (currentFrame === totalFrames - 1 && !textAnimationPlayed.current) {
//                     playTextAnimations();
//                 }
//             },
//             id: 'textAnimationTrigger',
//         });

//         // Cleanup interval and ScrollTrigger on unmount
//         return () => {
//             stopSequence();
//             ScrollTrigger.getById('audioScroll')?.kill();
//             ScrollTrigger.getById('textAnimationTrigger')?.kill();
//         };
//     }, [images, currentFrame, totalFrames]);

//     return (
//         <section className='ten-section overflow-hidden'>
//             <div className="containerrss">
//                 <div className="text-contenttis">
//                     <h1 className="titless">Audio Control</h1>
//                     <ul className="feature-lists">
//                         <img
//                             className="absolute top-[18%] left-[4px] w-3 h-3"
//                             src="./kArrow.svg"
//                             alt="arrow"
//                         />
//                         <img
//                             className="absolute top-[52%] left-[4px] w-3 h-3"
//                             src="./kArrow.svg"
//                             alt="arrow"
//                         />
//                         <li className="feature-items">Voice Control</li>
//                         <li className="feature-items">Music Playback</li>
//                         <div className="icon-containers">
//                             <img src={spotifyIcon} alt="Spotify" className="icon" />
//                             <img src={alexaIcon} alt="Alexa" className="icon-alexa" />
//                         </div>
//                     </ul>
//                 </div>

//                 <div className="image-containerrss">
//                     <img
//                         src={images[currentFrame]}
//                         alt={`Speaker ${currentFrame + 1}`}
//                         className="image"
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default AudioControl;



import React, { useEffect, useState, useRef } from 'react';
import './Audio.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const spotifyIcon = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg';
const alexaIcon = '/amazon-alexa.svg';

const AudioControl = () => {
    const images = Array.from({ length: 60 }, (_, i) => `/imgseq/speaker/numi_speaker_${String(i + 1).padStart(4, '0')}.png`);
    const [currentFrame, setCurrentFrame] = useState(0);
    const totalFrames = images.length;
    const fps = 5; // Frames per second for the "video" playback
    const frameInterval = useRef(null);
    const isPlaying = useRef(false);
    const textAnimationPlayed = useRef(false); // Flag to track text animation status

    // GSAP text animation
    const playTextAnimations = () => {
        if (!textAnimationPlayed.current) {
            gsap.timeline()
                .to('.titless', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                })
                .to('.feature-lists', {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                }, "-=0.5")
                .to('.icon-containers', {
                    opacity: 1,
                    duration: 1,
                }, "-=0.5");

            textAnimationPlayed.current = true; // Mark that the animations have been played
        }
    };

    // Reset text elements to their initial state
    const resetTextStyles = () => {
        gsap.set('.titless', { opacity: 0, y: 20 });
        gsap.set('.feature-lists', { opacity: 0, x: -20 });
        gsap.set('.icon-containers', { opacity: 0 });
    };

    // Image sequence playback logic
    useEffect(() => {
        // Preload images
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        const playSequence = () => {
            isPlaying.current = true;

            frameInterval.current = setInterval(() => {
                setCurrentFrame((prevFrame) => {
                    if (prevFrame < totalFrames - 1) {
                        return prevFrame + 1;
                    } else {
                        clearInterval(frameInterval.current);
                        isPlaying.current = false;
                        playTextAnimations();  // Trigger text animation once video finishes
                        return prevFrame;
                    }
                });
            }, 1000 / fps);
        };

        const stopSequence = () => {
            if (frameInterval.current) {
                clearInterval(frameInterval.current);
                isPlaying.current = false;
            }
        };

        const resetPlayback = () => {
            stopSequence();
            setCurrentFrame(0); // Reset image sequence
            resetTextStyles(); // Reset text styles
            textAnimationPlayed.current = false; // Reset text animations
        };

        // ScrollTrigger for image sequence and text animations
        ScrollTrigger.create({
            trigger: '.ten-section',
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                if (!isPlaying.current && currentFrame < totalFrames - 1) {
                    playSequence();
                }
            },
            onLeave: stopSequence,
            onEnterBack: () => {
                resetPlayback(); // Reset both the video and text animation on re-entry
                playSequence();
            },
            onLeaveBack: () => {
                stopSequence();
                resetPlayback(); // Reset everything when leaving back to ensure replay on re-entry
            },
            id: 'audioScroll',
        });

        // Additional ScrollTrigger to reset the text animation when scrolling
        ScrollTrigger.create({
            trigger: '.ten-section',
            start: 'top center',
            onUpdate: () => {
                // Play text animation only when the video reaches the last frame
                if (currentFrame === totalFrames - 1 && !textAnimationPlayed.current) {
                    playTextAnimations();
                }
            },
            id: 'textAnimationTrigger',
        });

        // Cleanup interval and ScrollTrigger on unmount
        return () => {
            stopSequence();
            ScrollTrigger.getById('audioScroll')?.kill();
            ScrollTrigger.getById('textAnimationTrigger')?.kill();
        };
    }, [images, currentFrame, totalFrames]);

    return (
        <section className='ten-section overflow-hidden'>
            <div className="containerrss">
                <div className="text-contenttis">
                    <h1 className="titless">Audio Control</h1>
                    <ul className="feature-lists">
                        <img
                            className="absolute top-[18%] left-[4px] w-3 h-3"
                            src="./kArrow.svg"
                            alt="arrow"
                        />
                        <img
                            className="absolute top-[52%] left-[4px] w-3 h-3"
                            src="./kArrow.svg"
                            alt="arrow"
                        />
                        <li className="feature-items">Voice Control</li>
                        <li className="feature-items">Music Playback</li>
                        <div className="icon-containers">
                            <img src={spotifyIcon} alt="Spotify" className="icon" />
                            <img src={alexaIcon} alt="Alexa" className="icon-alexa" />
                        </div>
                    </ul>
                </div>

                <div className="image-containerrss">
                    <img
                        src={images[currentFrame]}
                        alt={`Speaker ${currentFrame + 1}`}
                        className="image"
                    />
                </div>
            </div>
        </section>
    );
};

export default AudioControl;
