import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import "@/App.css";

/* ── tiny SVG heart used for particles ────────────────── */
const HeartIcon = ({ size = 20, color = "#E11D48" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

/* ── ambient background hearts ────────────────────────── */
const AmbientHearts = () => {
  const hearts = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 14 + Math.random() * 18,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
    })), []
  );

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="ambient-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <Heart size={h.size} fill="#FECDD3" strokeWidth={0} />
        </div>
      ))}
    </>
  );
};

/* ── heart particle explosion ─────────────────────────── */
const HeartParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 60,
          rotate: Math.random() * 360,
          size: 12 + Math.random() * 16,
          color: ["#E11D48", "#FB7185", "#F43F5E", "#FDA4AF", "#FECDD3"][
            Math.floor(Math.random() * 5)
          ],
          delay: Math.random() * 0.4,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="heart-particle"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.3, 0.8],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: 1.6,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          <HeartIcon size={p.size} color={p.color} />
        </motion.div>
      ))}
    </div>
  );
};

/* ── tiny sparkle dots after hug ──────────────────────── */
const Sparkles = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        delay: 1 + Math.random() * 2,
      })),
    []
  );

  return (
    <>
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-rose-300"
          style={{ width: 6, height: 6, left: "50%", top: "50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x: d.x, y: d.y }}
          transition={{ duration: 2, delay: d.delay, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
    </>
  );
};

/* ── main page ────────────────────────────────────────── */
export default function App() {
  const [isHugged, setIsHugged] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleHug = useCallback(() => {
    if (isHugged) return;
    setIsHugged(true);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000);
  }, [isHugged]);

  /* spring config */
  const spring = { type: "spring", stiffness: 120, damping: 15 };

  return (
    <div className="warm-bg" data-testid="hug-day-page">
      {/* texture */}
      <div className="paper-texture" />

      {/* ambient hearts */}
      <AmbientHearts />

      {/* centred content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 select-none">

        {/* ── pre-hug heading ──────────────────── */}
        <AnimatePresence>
          {!isHugged && (
            <motion.h1
              data-testid="pre-hug-heading"
              className="font-signature text-5xl md:text-7xl text-rose-700 mb-2 text-center leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              Happy Hug Day
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isHugged && (
            <motion.p
              data-testid="pre-hug-subtitle"
              className="font-body text-base md:text-lg text-rose-400 mb-14 tracking-wide text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Sumedha, someone has a hug waiting for you...
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── avatars row ──────────────────────── */}
        <div className="relative flex items-center justify-center gap-8 md:gap-16 mb-14">
          {/* Naman */}
          <motion.div
            data-testid="avatar-naman"
            className={`avatar-bubble ${!isHugged ? "float-left" : "hug-glow"}`}
            animate={
              isHugged
                ? { x: 40, scale: 1.05 }
                : { x: 0, scale: 1 }
            }
            transition={spring}
          >
            <span className="initial">N</span>
            <AnimatePresence>
              {!isHugged && (
                <motion.span
                  className="name-label"
                  exit={{ opacity: 0 }}
                >
                  Naman
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sumedha */}
          <motion.div
            data-testid="avatar-sumedha"
            className={`avatar-bubble ${!isHugged ? "float-right" : "hug-glow"}`}
            animate={
              isHugged
                ? { x: -40, scale: 1.05 }
                : { x: 0, scale: 1 }
            }
            transition={spring}
          >
            <span className="initial">S</span>
            <AnimatePresence>
              {!isHugged && (
                <motion.span
                  className="name-label"
                  exit={{ opacity: 0 }}
                >
                  Sumedha
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* particles */}
          {showParticles && <HeartParticles />}

          {/* sparkles after hug */}
          {isHugged && !showParticles && <Sparkles />}
        </div>

        {/* ── CTA button (pre-hug) ─────────────── */}
        <AnimatePresence>
          {!isHugged && (
            <motion.button
              data-testid="send-hug-button"
              aria-label="Send virtual hug"
              onClick={handleHug}
              className="font-body font-bold text-lg md:text-xl px-10 py-4 rounded-full bg-rose-600 text-white shadow-lg cta-pulse hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              Send a Hug
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── tap hint ─────────────────────────── */}
        <AnimatePresence>
          {!isHugged && (
            <motion.p
              data-testid="tap-hint"
              className="font-body text-sm text-rose-300 mt-6 tap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              tap the button above
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── post-hug message ─────────────────── */}
        <AnimatePresence>
          {isHugged && (
            <motion.div
              data-testid="post-hug-message"
              className="flex flex-col items-center mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <h1 className="font-signature text-5xl md:text-7xl text-rose-700 mb-4 text-center leading-tight">
                Happy Hug Day, Sumedha!
              </h1>

              <motion.p
                className="font-body text-base md:text-lg text-rose-500 max-w-md text-center mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                No distance is too far for a hug from the heart.
                <br />
                Consider yourself hugged — tight and warm.
              </motion.p>

              <motion.p
                data-testid="signature"
                className="font-signature text-4xl md:text-5xl text-rose-800 -rotate-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
              >
                — Naman
              </motion.p>

              <motion.div
                className="flex items-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 3, duration: 0.5 }}
              >
                <Heart size={14} fill="#FB7185" strokeWidth={0} />
                <span className="font-body text-xs text-rose-300 tracking-widest uppercase">
                  Made with love
                </span>
                <Heart size={14} fill="#FB7185" strokeWidth={0} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
