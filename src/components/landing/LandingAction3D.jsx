import { Suspense, useRef, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { transition } from "../settings";
import LandingExplodeScene from "./LandingExplodeScene";

export default function LandingAction3D({ onClick }) {
  const buttonRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const onPointerMove = (event) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <MotionConfig transition={transition}>
      <motion.button
        ref={buttonRef}
        type="button"
        className="landing-action-3d"
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.08 },
          press: { scale: 0.98 },
        }}
        onClick={onClick}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={onPointerMove}
      >
        <motion.div
          className="landing-action-shapes"
          variants={{
            rest: { opacity: 0.45 },
            hover: { opacity: 1 },
          }}
        >
          <div className="landing-blush landing-blush-pink" />
          <div className="landing-blush landing-blush-blue" />
          <div className="landing-shape-canvas">
            <Suspense fallback={null}>
              <LandingExplodeScene isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </div>
        </motion.div>
        <motion.span className="landing-action-label" variants={{ hover: { scale: 0.94 }, press: { scale: 1.03 } }}>
          Know More
          <FiArrowRight />
        </motion.span>
      </motion.button>
    </MotionConfig>
  );
}
