import React, { useEffect, useRef } from "react";

export function AuvBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const propellerRef = useRef<HTMLDivElement>(null);
  const bubblesContainerRef = useRef<HTMLDivElement>(null);

  // Target coordinates and velocity vectors
  const targetX = useRef(0);
  const targetY = useRef(0);
  const targetBeamRot = useRef(0);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentRot = useRef(0);
  const currentBeamRot = useRef(0);

  const velocityX = useRef(0);
  const velocityY = useRef(0);

  // Smooth fake 3D turn progress: 1.0 (facing right) to -1.0 (facing left)
  const facingProgress = useRef(1.0);
  const isFacingRight = useRef(true);

  // Banking (momentum roll) and depth scale
  const currentBank = useRef(0);
  const currentDepth = useRef(1.0);

  const currentBubbleOpacity = useRef(0.1);
  const currentBubbleDur = useRef(2.8);

  const lastMouseMoveTime = useRef(Date.now());

  useEffect(() => {
    // Initialize default position (bottom-right area of screen)
    targetX.current = window.innerWidth * 0.82;
    targetY.current = window.innerHeight * 0.65;
    currentX.current = window.innerWidth * 0.82;
    currentY.current = window.innerHeight * 0.65;

    const isTouch = 
      window.matchMedia("(any-hover: none)").matches || 
      ("ontouchstart" in window) || 
      (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const clampCoordinates = (x: number, y: number) => {
      const paddingX = 80;
      const paddingY = 80;
      const subWidth = 250;
      const subHeight = 120;

      const minX = paddingX + subWidth / 2;
      const maxX = window.innerWidth - paddingX - subWidth / 2;
      const minY = paddingY + subHeight / 2;
      const maxY = window.innerHeight - paddingY - subHeight / 2;

      return {
        x: Math.max(minX, Math.min(maxX, x)),
        y: Math.max(minY, Math.min(maxY, y)),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime.current = Date.now();

      // 1. Flip check based on cursor relative to current submarine center position
      const deadZone = 45; // 45px hysteresis
      if (e.clientX > currentX.current + deadZone) {
        isFacingRight.current = true;
      } else if (e.clientX < currentX.current - deadZone) {
        isFacingRight.current = false;
      }

      // 2. Set coordinates behind the cursor (beacons)
      const offset = isFacingRight.current ? -130 : 130;
      const rawTargetX = e.clientX + offset;
      const rawTargetY = e.clientY;

      const clamped = clampCoordinates(rawTargetX, rawTargetY);
      targetX.current = clamped.x;
      targetY.current = clamped.y;

      // 3. Dynamic searchlight aim angle targeting the exact cursor location
      if (glowRef.current) {
        const rect = glowRef.current.getBoundingClientRect();
        const emitterX = rect.left + rect.width / 2;
        const emitterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - emitterX;
        const deltaY = e.clientY - emitterY;
        const angleRad = Math.atan2(deltaY, deltaX);
        let angleDeg = angleRad * (180 / Math.PI);

        if (angleDeg > 180) angleDeg -= 360;
        if (angleDeg < -180) angleDeg += 360;

        let relativeAngle = 0;
        if (isFacingRight.current) {
          relativeAngle = angleDeg;
        } else {
          if (angleDeg > 0) {
            relativeAngle = 180 - angleDeg;
          } else {
            relativeAngle = -180 - angleDeg;
          }
        }
        targetBeamRot.current = Math.max(-25, Math.min(25, relativeAngle));
      }
    };

    const handleMouseLeave = () => {
      const neutral = clampCoordinates(window.innerWidth * 0.82, window.innerHeight * 0.65);
      targetX.current = neutral.x;
      targetY.current = neutral.y;
      targetBeamRot.current = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let rafId: number;
    const update = () => {
      // Calculate travel vectors
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 1. Calculate desired velocity based on distance (accelerate far, decelerate near)
      // Cruise speed: 7px/frame. Boost speed: 12px/frame. Hover deceleration speed: 3px/frame.
      let maxSpeed = 7;
      if (distance > 300) {
        maxSpeed = 12; // Boost
      } else if (distance < 140) {
        maxSpeed = Math.max(0.5, (distance / 140) * 3); // Hover deceleration
      }

      let targetVx = 0;
      let targetVy = 0;

      // Only approach if outside target radius (to keep distance from cursor)
      if (distance > 15) {
        const moveAngle = Math.atan2(dy, dx);
        targetVx = Math.cos(moveAngle) * maxSpeed;
        targetVy = Math.sin(moveAngle) * maxSpeed;
      }

      // 2. Smoothly steer current velocity toward desired velocity (underwater inertia / curved pathing)
      const steeringStrength = 0.07; // responsiveness vs sliding curves
      velocityX.current += (targetVx - velocityX.current) * steeringStrength;
      velocityY.current += (targetVy - velocityY.current) * steeringStrength;

      // Apply velocity to position coordinates
      currentX.current += velocityX.current;
      currentY.current += velocityY.current;

      const currentSpeed = Math.sqrt(velocityX.current * velocityX.current + velocityY.current * velocityY.current);

      // 3. True 8-directional Pitch calculation: Nose pitches toward actual travel vector
      // Upward climbs climb steeper (up to ±30deg), diagonal transits use mild angles (up to ±16deg)
      let travelAngle = Math.atan2(velocityY.current, Math.abs(velocityX.current));
      let angleDeg = travelAngle * (180 / Math.PI);

      // Mirror the pitch angle locally depending on horizontal direction
      let pitchTarget = isFacingRight.current ? angleDeg : -angleDeg;
      let maxPitch = Math.abs(velocityY.current) > Math.abs(velocityX.current) * 1.8 ? 30 : 16;
      pitchTarget = Math.max(-maxPitch, Math.min(maxPitch, pitchTarget));

      // LERP Pitch rotation
      currentRot.current += (pitchTarget - currentRot.current) * 0.08;
      currentBeamRot.current += (targetBeamRot.current - currentBeamRot.current) * 0.06;

      // 4. Momentum banking (rotateZ roll on direction changes)
      // Change in horizontal velocity (acceleration force) dictates the banking angle
      const targetBank = Math.max(-3.5, Math.min(3.5, (targetVx - velocityX.current) * 0.4));
      currentBank.current += (targetBank - currentBank.current) * 0.05;

      // 5. Depth response (Z scale): Smaller when descending (diving deep), larger when ascending
      const targetDepthScale = Math.max(0.94, Math.min(1.04, 1.0 + (velocityY.current * 0.005)));
      currentDepth.current += (targetDepthScale - currentDepth.current) * 0.05;

      // 6. Fake 3D Turn progress: LERP scale progress smoothly over 550ms
      const targetFacing = isFacingRight.current ? 1.0 : -1.0;
      facingProgress.current += (targetFacing - facingProgress.current) * 0.075;

      const scaleVal = facingProgress.current;
      // Mirror horizontal scale factor, clamp min size to 0.22 to keep sub visible during turning profile
      const displayScaleX = Math.sign(scaleVal) * Math.max(0.22, Math.abs(scaleVal));
      // Turn Y-rotation: max 72deg when mid-way through facing progress
      const rotY = (1.0 - Math.abs(scaleVal)) * 72;

      // 7. Dynamic Propeller speed updates (shorter duration = faster rotation)
      let targetPropDur = 2.8;
      if (currentSpeed > 0.5) {
        targetPropDur = Math.max(0.7, 2.8 - currentSpeed * 0.2);
      }
      if (propellerRef.current) {
        propellerRef.current.style.setProperty("--propeller-speed", `${targetPropDur}s`);
      }

      // 8. Dynamic Propulsion bubbles (opacity & frequency trails)
      let targetBubbleOpacity = 0.1;
      let targetBubbleDur = 2.8;
      if (currentSpeed > 0.5) {
        targetBubbleOpacity = Math.min(0.85, 0.1 + currentSpeed * 0.08);
        targetBubbleDur = Math.max(0.9, 2.8 - currentSpeed * 0.2);
      }
      currentBubbleOpacity.current += (targetBubbleOpacity - currentBubbleOpacity.current) * 0.08;
      currentBubbleDur.current += (targetBubbleDur - currentBubbleDur.current) * 0.08;

      if (bubblesContainerRef.current) {
        bubblesContainerRef.current.style.setProperty("--bubble-opacity", `${currentBubbleOpacity.current}`);
        bubblesContainerRef.current.style.setProperty("--bubble-duration", `${currentBubbleDur.current}s`);
      }

      // 9. Apply calculated transforms onto structured isolation wrappers
      if (wrapperRef.current) {
        // PositionWrapper: translate3d
        wrapperRef.current.style.transform = `translate3d(${currentX.current - 125}px, ${currentY.current - 60}px, 0)`;
      }

      if (pitchRef.current) {
        // HeadingWrapper: rotateZ (pitch tilt)
        pitchRef.current.style.transform = `rotate(${currentRot.current}deg)`;
      }

      if (perspectiveRef.current) {
        // PerspectiveWrapper: Y-rotation turn + Z-rotation bank
        perspectiveRef.current.style.transform = `rotateY(${rotY}deg) rotateZ(${currentBank.current}deg)`;
      }

      if (directionRef.current) {
        // DirectionWrapper: scaleX direction flip (includes minor acceleration stretch: max +0.015)
        const stretch = 1.0 + Math.min(0.015, currentSpeed * 0.001);
        directionRef.current.style.transform = `scaleX(${displayScaleX * stretch})`;
      }

      if (depthRef.current) {
        // DepthWrapper: scale(depth)
        depthRef.current.style.transform = `scale(${currentDepth.current})`;
      }

      if (lightRef.current) {
        // Keeps translateY(-50%) to preserve perfect horizontal centerline alignment while rotating
        lightRef.current.style.transform = `translateY(-50%) rotate(${currentBeamRot.current}deg)`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Scoped styles for AuvBackground component */
        .auv-wrapper {
          position: fixed;
          left: 0;
          top: 0;
          width: 250px;
          height: 120px;
          pointer-events: none;
          user-select: none;
          z-index: 2;
          opacity: 0.82;
          filter: saturate(0.55) contrast(0.85) blur(0.3px);
          will-change: transform;
        }

        /* Responsive tablet scaling */
        @media (max-width: 1024px) {
          .auv-wrapper {
            transform: scale(0.72) !important;
            transform-origin: center center;
          }
        }

        /* Responsive mobile hiding for cleaner layout */
        @media (max-width: 640px) {
          .auv-wrapper {
            display: none !important;
          }
        }

        /* 1. Inner Buoyancy & Wobble */
        .auv-buoyancy-container {
          width: 100%;
          height: 100%;
          animation: auv-buoyancy-float 22s ease-in-out infinite;
          will-change: transform;
          position: relative;
        }

        /* 2. HeadingWrapper: handles pitch tilts (rotateZ) */
        .auv-pitch-wrapper {
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        /* 3. PerspectiveWrapper: handles 3D Y-turns and Z-rotation bank momentum */
        .auv-perspective-wrapper {
          width: 100%;
          height: 100%;
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* 4. DirectionWrapper: handles smooth scaleX direction flip transition */
        .auv-direction-wrapper {
          width: 100%;
          height: 100%;
          will-change: transform;
          transform-origin: center center;
        }

        /* 5. DepthWrapper: handles Z-axis scaling */
        .auv-depth-wrapper {
          width: 100%;
          height: 100%;
          will-change: transform;
          transform-origin: center center;
        }

        /* Submarine element stylings */
        .auv-sub {
          position: absolute;
          width: 250px;
          height: 120px;
          left: 0;
          top: 0;
        }

        .auv-sub-body {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 190px;
          height: 64px;
          background: linear-gradient(135deg, #2d3748, #1e293b);
          border: 1.5px solid rgba(148, 163, 184, 0.22);
          border-radius: 40px;
          transform: translate(-50%, -50%);
          box-shadow: inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.45), 0 4px 12px rgba(2,6,23,0.35);
          z-index: 10;
        }

        .auv-sub-sail {
          position: absolute;
          top: 38%;
          left: 52%;
          width: 65px;
          height: 38px;
          transform: translate(-50%, -100%);
          background: linear-gradient(to bottom, #232b35, #161c22);
          border: 1px solid rgba(148, 163, 184, 0.15);
          clip-path: polygon(10% 0%, 75% 0%, 100% 100%, 0% 100%);
          z-index: 8;
        }

        .auv-sub-sail-shadow {
          position: absolute;
          width: 160%;
          height: 12%;
          background: #0f172a;
          border-radius: 5px;
        }

        .auv-dark1 {
          left: 0%;
          top: 0%;
          transform: translate(0%, -33%);
        }

        .auv-dark2 {
          left: 0%;
          top: 50%;
        }

        .auv-light1 {
          left: 20%;
          top: 20%;
          width: 45%;
          background: rgba(255, 255, 255, 0.08);
        }

        .auv-sub-window {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-image: linear-gradient(45deg, #06b6d4, #e0f7fa);
          border: 4px solid #0f172a;
          z-index: 12;
          box-shadow: 0 0 6px rgba(6, 182, 212, 0.4);
        }

        .auv-win-one {
          position: absolute;
          top: 50%;
          left: 36%;
          transform: translate(-50%, -50%);
        }

        .auv-win-two {
          position: absolute;
          top: 50%;
          left: 54%;
          transform: translate(-50%, -50%);
        }

        .auv-sub-shadow-dark {
          position: absolute;
          left: 74%;
          top: 50%;
          width: 45px;
          height: 8px;
          border-radius: 4px;
          transform: translate(-50%, -50%);
          background: #0f172a;
          opacity: 0.6;
          z-index: 11;
        }

        .auv-sub-shadow-light {
          position: absolute;
          left: 35%;
          top: 15%;
          width: 80px;
          height: 4px;
          border-radius: 2px;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.12);
          z-index: 11;
        }

        .auv-sub-shadow-arcLight {
          position: absolute;
          top: 65%;
          left: 80%;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.2);
          filter: blur(2px);
          z-index: 11;
        }

        .auv-sub-periscope {
          position: absolute;
          top: 8%;
          left: 45%;
          width: 15px;
          height: 40px;
          border-right: 6px solid #232b35;
          border-top: 6px solid #0f172a;
          border-top-right-radius: 8px;
          z-index: 8;
        }

        .auv-sub-periscope-glass {
          position: absolute;
          left: 45%;
          top: 6%;
          width: 4px;
          height: 10px;
          background: #22d3ee;
          transform: translate(-50%, -15%);
          box-shadow: 0 0 5px rgba(34, 211, 238, 0.8);
          z-index: 9;
        }

        /* Searchlight beam: Origines from center-right nose and matches vertical center */
        .auv-searchlight-beam {
          position: absolute;
          top: 50%;
          left: 215px; /* attached slightly inside the 220px nose coordinate for no gap */
          width: 380px;
          height: 100px;
          /* Volumetric underwater illumination effect */
          background: linear-gradient(to right, rgba(34, 211, 238, 0.22) 0%, rgba(34, 211, 238, 0.08) 35%, rgba(34, 211, 238, 0.02) 65%, transparent 100%);
          clip-path: polygon(0% 45%, 100% 12%, 100% 88%, 0% 55%);
          filter: blur(15px);
          pointer-events: none;
          transform-origin: left center;
          transform: translateY(-50%) rotate(0deg);
          will-change: transform;
          z-index: 5;
        }

        /* Emitter glow aligned with the vertical centerline */
        .auv-searchlight-glow {
          position: absolute;
          top: 50%;
          left: 216px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e0f7fa;
          transform: translate(-50%, -50%);
          filter: blur(2px);
          opacity: 0.85;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.9);
          z-index: 12;
          pointer-events: none;
        }

        /* Propeller styling */
        .auv-sub-propeller {
          position: absolute;
          left: 2%;
          top: 50%;
          width: 18px;
          height: 42px;
          transform: translate(0%, -50%);
          perspective: 600px;
          z-index: 9;
        }

        .auv-propeller-perspective {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: auv-propeller-spin var(--propeller-speed, 2.6s) linear infinite;
        }

        .auv-sub-propeller-parts {
          position: absolute;
          left: 0%;
          width: 100%;
          height: 100%;
          top: 0%;
          transform-style: preserve-3d;
        }

        .auv-prop-dark {
          top: 0%;
          background: #0e7490;
          transform: rotateY(180deg) rotateX(225deg);
        }

        .auv-prop-light {
          top: 0%;
          background: #22d3ee;
          transform: rotateX(45deg);
        }

        /* Propeller Bubble Emitter container */
        .auv-bubbles-container {
          position: absolute;
          top: 50%;
          left: -40px;
          width: 80px;
          height: 40px;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 8;
          opacity: var(--bubble-opacity, 0.1);
          transition: opacity 0.3s ease;
        }

        .auv-bubble-emit {
          position: absolute;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: inset 1px 1px 1.5px rgba(255, 255, 255, 0.45);
          opacity: 0;
          left: 80%;
          top: 50%;
          animation: auv-bubbles-flow var(--bubble-duration, 2.4s) infinite linear;
        }

        /* Irregular bubble sizes & trails */
        .auv-bubble-1 { width: 3px; height: 3px; animation-delay: 0.0s; }
        .auv-bubble-2 { width: 4.5px; height: 4.5px; animation-delay: 0.4s; top: 30%; }
        .auv-bubble-3 { width: 2.5px; height: 2.5px; animation-delay: 0.8s; top: 65%; }
        .auv-bubble-4 { width: 3.5px; height: 3.5px; animation-delay: 1.2s; top: 40%; }
        .auv-bubble-5 { width: 5px; height: 5px; animation-delay: 1.6s; top: 55%; }
        .auv-bubble-6 { width: 2px; height: 2px; animation-delay: 2.0s; top: 48%; }

        /* Animation Keyframes */

        /* 1. Buoyancy & Wobble */
        @keyframes auv-buoyancy-float {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(6px, -4px) rotate(1.0deg);
          }
          50% {
            transform: translate(-5px, 5px) rotate(-0.5deg);
          }
          75% {
            transform: translate(4px, -3px) rotate(-1.2deg);
          }
        }

        /* 2. Propeller rotation */
        @keyframes auv-propeller-spin {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(360deg);
          }
        }

        /* 3. Turbine bubbles flow: propulsion exhaust drifts back then floats up due to buoyancy */
        @keyframes auv-bubbles-flow {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.2);
          }
          12% {
            opacity: 0.75;
          }
          45% {
            opacity: 0.45;
            transform: translate3d(-35px, -8px, 0) scale(0.85);
          }
          90% {
            opacity: 0;
            transform: translate3d(-75px, -24px, 0) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate3d(-75px, -24px, 0) scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .auv-wrapper {
            animation: none !important;
            display: none !important;
          }
          .auv-buoyancy-container,
          .auv-pitch-wrapper,
          .auv-perspective-wrapper,
          .auv-direction-wrapper,
          .auv-depth-wrapper,
          .auv-propeller-perspective,
          .auv-bubble-emit {
            animation: none !important;
          }
        }
      `}</style>

      <div ref={wrapperRef} className="auv-wrapper">
        <div className="auv-buoyancy-container">
          <div ref={pitchRef} className="auv-pitch-wrapper">
            <div ref={perspectiveRef} className="auv-perspective-wrapper">
              <div ref={directionRef} className="auv-direction-wrapper">
                <div ref={depthRef} className="auv-depth-wrapper">

                  {/* Submarine Structure */}
                  <div ref={subRef} className="auv-sub">
                    {/* Soft, volumetric, scattering searchlight beam (center-aligned on the nose tip) */}
                    <div ref={lightRef} className="auv-searchlight-beam" />
                    <div ref={glowRef} className="auv-searchlight-glow" />

                    {/* Propeller (back/left) */}
                    <div className="auv-sub-propeller">
                      <div className="auv-propeller-perspective" ref={propellerRef}>
                        <div className="auv-sub-propeller-parts auv-prop-dark" />
                        <div className="auv-sub-propeller-parts auv-prop-light" />
                      </div>
                    </div>

                    {/* Periscope (front-middle top) */}
                    <div className="auv-sub-periscope" />
                    <div className="auv-sub-periscope-glass" />

                    {/* Sail (middle top) */}
                    <div className="auv-sub-sail">
                      <div className="auv-sub-sail-shadow auv-dark1" />
                      <div className="auv-sub-sail-shadow auv-light1" />
                      <div className="auv-sub-sail-shadow auv-dark2" />
                    </div>

                    {/* Main Body */}
                    <div className="auv-sub-body">
                      {/* Windows */}
                      <div className="auv-sub-window auv-win-one" />
                      <div className="auv-sub-window auv-win-two" />
                      
                      {/* Hull Shadows & Highlights */}
                      <div className="auv-sub-shadow-dark" />
                      <div className="auv-sub-shadow-light" />
                      <div className="auv-sub-shadow-arcLight" />
                    </div>

                    {/* Propulsion Bubble Emitters directly behind propeller */}
                    <div ref={bubblesContainerRef} className="auv-bubbles-container">
                      <span className="auv-bubble-emit auv-bubble-1" />
                      <span className="auv-bubble-emit auv-bubble-2" />
                      <span className="auv-bubble-emit auv-bubble-3" />
                      <span className="auv-bubble-emit auv-bubble-4" />
                      <span className="auv-bubble-emit auv-bubble-5" />
                      <span className="auv-bubble-emit auv-bubble-6" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
