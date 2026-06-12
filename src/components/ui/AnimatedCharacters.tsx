"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ====== Pupil (small eye dot) ======
interface PupilProps {
  size?: number;
  maxDistance?: number;
  forceLookX?: number;
  forceLookY?: number;
}

function Pupil({ size = 12, maxDistance = 5, forceLookX, forceLookY }: PupilProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const { x, y } = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    if (!ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  })();

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: "#2D2D2D",
        transform: `translate(${x}px, ${y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}

// ====== EyeBall (white eye with pupil) ======
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

function EyeBall({
  size = 18,
  pupilSize = 7,
  maxDistance = 5,
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) {
  return (
    <div
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <Pupil
          size={pupilSize}
          maxDistance={maxDistance}
          forceLookX={forceLookX}
          forceLookY={forceLookY}
        />
      )}
    </div>
  );
}

// ====== Main Animated Characters ======
interface AnimatedCharactersProps {
  isTyping?: boolean;
  showPassword?: boolean;
  passwordLength?: number;
}

export function AnimatedCharacters({
  isTyping = false,
  showPassword = false,
  passwordLength = 0,
}: AnimatedCharactersProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [purpleBlink, setPurpleBlink] = useState(false);
  const [blackBlink, setBlackBlink] = useState(false);
  const [lookingAtEachOther, setLookingAtEachOther] = useState(false);
  const [purplePeeking, setPurplePeeking] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Purple blink
  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setPurpleBlink(true);
        setTimeout(() => {
          setPurpleBlink(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  // Black blink
  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setBlackBlink(true);
        setTimeout(() => {
          setBlackBlink(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  // Look at each other when typing starts
  useEffect(() => {
    if (isTyping) {
      setLookingAtEachOther(true);
      const t = setTimeout(() => setLookingAtEachOther(false), 800);
      return () => clearTimeout(t);
    } else {
      setLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple peeks when password is typed and visible
  useEffect(() => {
    if (passwordLength > 0 && showPassword) {
      const schedule = () => {
        const t = setTimeout(() => {
          setPurplePeeking(true);
          setTimeout(() => {
            setPurplePeeking(false);
            schedule();
          }, 800);
        }, Math.random() * 3000 + 2000);
        return t;
      };
      const t = schedule();
      return () => clearTimeout(t);
    } else {
      setPurplePeeking(false);
    }
  }, [passwordLength, showPassword]);

  const calcPos = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return { faceX: 0, faceY: 0, skew: 0 };
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 3;
      return {
        faceX: Math.max(-15, Math.min(15, (mouse.x - cx) / 20)),
        faceY: Math.max(-10, Math.min(10, (mouse.y - cy) / 30)),
        skew: Math.max(-6, Math.min(6, -(mouse.x - cx) / 120)),
      };
    },
    [mouse]
  );

  const purple = calcPos(purpleRef);
  const black = calcPos(blackRef);
  const yellow = calcPos(yellowRef);
  const orange = calcPos(orangeRef);

  const isHidingPassword = passwordLength > 0 && !showPassword;

  return (
    <div className="relative" style={{ width: 440, height: 370 }}>
      {/* Purple tall rectangle — back layer */}
      <div
        ref={purpleRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: 40,
          width: 150,
          height: isTyping || isHidingPassword ? 400 : 350,
          backgroundColor: "#7c3aed",
          borderRadius: "10px 10px 0 0",
          zIndex: 1,
          transform:
            passwordLength > 0 && showPassword
              ? "skewX(0deg)"
              : isTyping || isHidingPassword
                ? `skewX(${(purple.skew || 0) - 12}deg) translateX(35px)`
                : `skewX(${purple.skew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-7 transition-all duration-700 ease-in-out"
          style={{
            left:
              passwordLength > 0 && showPassword
                ? 18
                : lookingAtEachOther
                  ? 50
                  : 40 + purple.faceX,
            top:
              passwordLength > 0 && showPassword
                ? 32
                : lookingAtEachOther
                  ? 60
                  : 38 + purple.faceY,
          }}
        >
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            isBlinking={purpleBlink}
            forceLookX={
              passwordLength > 0 && showPassword
                ? purplePeeking ? 3 : -3
                : lookingAtEachOther ? 3 : undefined
            }
            forceLookY={
              passwordLength > 0 && showPassword
                ? purplePeeking ? 4 : -3
                : lookingAtEachOther ? 4 : undefined
            }
          />
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            isBlinking={purpleBlink}
            forceLookX={
              passwordLength > 0 && showPassword
                ? purplePeeking ? 3 : -3
                : lookingAtEachOther ? 3 : undefined
            }
            forceLookY={
              passwordLength > 0 && showPassword
                ? purplePeeking ? 4 : -3
                : lookingAtEachOther ? 4 : undefined
            }
          />
        </div>
      </div>

      {/* Black rectangle — middle layer */}
      <div
        ref={blackRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: 180,
          width: 100,
          height: 270,
          backgroundColor: "#1e293b",
          borderRadius: "8px 8px 0 0",
          zIndex: 2,
          transform:
            passwordLength > 0 && showPassword
              ? "skewX(0deg)"
              : lookingAtEachOther
                ? `skewX(${(black.skew || 0) * 1.5 + 10}deg) translateX(18px)`
                : isTyping || isHidingPassword
                  ? `skewX(${(black.skew || 0) * 1.5}deg)`
                  : `skewX(${black.skew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-5 transition-all duration-700 ease-in-out"
          style={{
            left:
              passwordLength > 0 && showPassword
                ? 10
                : lookingAtEachOther
                  ? 28
                  : 24 + black.faceX,
            top:
              passwordLength > 0 && showPassword
                ? 26
                : lookingAtEachOther
                  ? 12
                  : 30 + black.faceY,
          }}
        >
          <EyeBall
            size={14}
            pupilSize={5}
            maxDistance={3}
            isBlinking={blackBlink}
            forceLookX={passwordLength > 0 && showPassword ? -3 : lookingAtEachOther ? 0 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : lookingAtEachOther ? -3 : undefined}
          />
          <EyeBall
            size={14}
            pupilSize={5}
            maxDistance={3}
            isBlinking={blackBlink}
            forceLookX={passwordLength > 0 && showPassword ? -3 : lookingAtEachOther ? 0 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : lookingAtEachOther ? -3 : undefined}
          />
        </div>
      </div>

      {/* Orange semi-circle — front left */}
      <div
        ref={orangeRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: 0,
          width: 170,
          height: 160,
          zIndex: 3,
          backgroundColor: "#f97316",
          borderRadius: "100px 100px 0 0",
          transform:
            passwordLength > 0 && showPassword
              ? "skewX(0deg)"
              : `skewX(${orange.skew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{
            left: passwordLength > 0 && showPassword ? 36 : 60 + (orange.faceX || 0),
            top: passwordLength > 0 && showPassword ? 68 : 72 + (orange.faceY || 0),
          }}
        >
          <Pupil
            size={10}
            maxDistance={4}
            forceLookX={passwordLength > 0 && showPassword ? -4 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : undefined}
          />
          <Pupil
            size={10}
            maxDistance={4}
            forceLookX={passwordLength > 0 && showPassword ? -4 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : undefined}
          />
        </div>
      </div>

      {/* Yellow tall semi-circle — front right */}
      <div
        ref={yellowRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: 280,
          width: 120,
          height: 200,
          backgroundColor: "#eab308",
          borderRadius: "60px 60px 0 0",
          zIndex: 4,
          transform:
            passwordLength > 0 && showPassword
              ? "skewX(0deg)"
              : `skewX(${yellow.skew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-5 transition-all duration-200 ease-out"
          style={{
            left: passwordLength > 0 && showPassword ? 18 : 44 + (yellow.faceX || 0),
            top: passwordLength > 0 && showPassword ? 30 : 35 + (yellow.faceY || 0),
          }}
        >
          <Pupil
            size={10}
            maxDistance={4}
            forceLookX={passwordLength > 0 && showPassword ? -4 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : undefined}
          />
          <Pupil
            size={10}
            maxDistance={4}
            forceLookX={passwordLength > 0 && showPassword ? -4 : undefined}
            forceLookY={passwordLength > 0 && showPassword ? -3 : undefined}
          />
        </div>
        {/* Mouth line */}
        <div
          className="absolute w-16 h-[3px] bg-[#1e293b] rounded-full transition-all duration-200 ease-out"
          style={{
            left: passwordLength > 0 && showPassword ? 10 : 34 + (yellow.faceX || 0),
            top: passwordLength > 0 && showPassword ? 76 : 78 + (yellow.faceY || 0),
          }}
        />
      </div>
    </div>
  );
}
