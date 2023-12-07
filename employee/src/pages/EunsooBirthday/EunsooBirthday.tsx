import './EunsooBirthday.scss';
import Confetti from './confetti.tsx';
import { useState, useEffect } from "react";

const EunsooBirthday = () => {

    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Calculate the total delay before the first interval
        const initialDelay = 0.75 * 5000 + 4.15 * 1000 + 5.275 * 1000;
      
        // Function to handle each confetti appearance
        const showConfettiInterval = () => {
          setShowConfetti(true);
      
          // Reset the confetti state after a short delay (e.g., 0.1s)
          setTimeout(() => {
            setShowConfetti(false);
          }, 700); // Adjusted to match the animation duration
        };
      
        // Set a timeout to start the intervals after the initial delay
        const timeoutId = setTimeout(() => {
          // Trigger the first confetti immediately
          showConfettiInterval();
      
          // Set subsequent intervals using a loop
          let intervalCount = 1;
          const maxIntervals = 14;
          const intervalDelay = 1150;
      
          const intervalHandler = () => {
            if (intervalCount < maxIntervals) {
              showConfettiInterval();
              intervalCount++;
              setTimeout(intervalHandler, intervalDelay);
            } else {
              // Clear the timeout after the last interval
              clearInterval(intervalId);
            }
          };
      
          // Set an initial interval
          const intervalId = setInterval(intervalHandler, intervalDelay);
        }, initialDelay);
      
        // Clear the timeout when the component unmounts
        return () => {
          clearTimeout(timeoutId);
        };
      }, []); // Run this effect only once when the component mounts


    return (
        <div className='outer'>
            <div className="eunsoo__container">
                <div className='title'>
                    <span className='title-txt'>Hold On</span>
                </div>

                <div className='bday'>
                    <p className='bday-txt'><span>&#x1F973;</span>It's Eunsoo's Birthday!!<span>&#x1F973;</span></p>
                </div>

                <div className='main'>
                    <h1>Happy Birthday Eunsoo</h1>
                </div>

                <div className='message'>
                    <p>We wish you a fantastic day and a wonderful year.</p>
                    <p>-ur favs</p>
                </div>

                <div className='meme'>
                    <p>Obligatory Meme</p>
                    <img src="https://cdn.vox-cdn.com/thumbor/PzidjXAPw5kMOXygTMEuhb634MM=/11x17:1898x1056/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/72921759/vlcsnap_2023_12_01_10h37m31s394.0.jpg" alt="Meme" width={400}/>
                </div>

                <div className='party-popper left'>
                    &#127881;
                </div>
                <div className='party-popper right'>
                    &#127881;
                </div>
            </div>

            <div className='confetti'>
                {showConfetti && (
                <>
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                    <Confetti />
                </>
                )}
            </div>
        </div>
    );
};

export default EunsooBirthday;