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

/* ── Bubu the Panda (Naman) — separated pose ─────────── */
const BubuPanda = ({ className = "" }) => (
  <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <ellipse cx="60" cy="42" rx="26" ry="24" fill="#2D2D2D" />
    <ellipse cx="140" cy="42" rx="26" ry="24" fill="#2D2D2D" />
    <ellipse cx="60" cy="42" rx="16" ry="14" fill="#404040" />
    <ellipse cx="140" cy="42" rx="16" ry="14" fill="#404040" />
    {/* Head */}
    <ellipse cx="100" cy="90" rx="68" ry="62" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    {/* Eye patches */}
    <ellipse cx="74" cy="88" rx="18" ry="16" fill="#2D2D2D" transform="rotate(-8 74 88)" />
    <ellipse cx="126" cy="88" rx="18" ry="16" fill="#2D2D2D" transform="rotate(8 126 88)" />
    {/* Eyes */}
    <ellipse cx="74" cy="88" rx="8" ry="9" fill="#1A1A1A" />
    <ellipse cx="126" cy="88" rx="8" ry="9" fill="#1A1A1A" />
    <circle cx="78" cy="84" r="3.5" fill="white" />
    <circle cx="130" cy="84" r="3.5" fill="white" />
    {/* Blush */}
    <ellipse cx="52" cy="106" rx="14" ry="9" fill="#FFB5C5" opacity="0.7" />
    <ellipse cx="148" cy="106" rx="14" ry="9" fill="#FFB5C5" opacity="0.7" />
    {/* Nose */}
    <ellipse cx="100" cy="102" rx="5" ry="3.5" fill="#2D2D2D" />
    {/* Mouth — happy open with tongue */}
    <path d="M90 108 Q100 120 110 108" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M96 112 Q100 118 104 112" fill="#FF8B9A" />
    {/* Body */}
    <ellipse cx="100" cy="185" rx="55" ry="52" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    {/* Belly circle */}
    <ellipse cx="100" cy="188" rx="32" ry="30" fill="#F5F5F5" />
    {/* Left arm — waving out */}
    <path d="M48 170 Q25 155 15 140" stroke="white" strokeWidth="24" strokeLinecap="round" fill="none" />
    <path d="M48 170 Q25 155 15 140" stroke="#E8E8E8" strokeWidth="1" fill="none" />
    <circle cx="15" cy="138" r="12" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    {/* Right arm — waving out */}
    <path d="M152 170 Q175 155 185 140" stroke="white" strokeWidth="24" strokeLinecap="round" fill="none" />
    <path d="M152 170 Q175 155 185 140" stroke="#E8E8E8" strokeWidth="1" fill="none" />
    <circle cx="185" cy="138" r="12" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    {/* Feet */}
    <ellipse cx="72" cy="232" rx="20" ry="10" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    <ellipse cx="128" cy="232" rx="20" ry="10" fill="white" stroke="#E8E8E8" strokeWidth="1" />
  </svg>
);

/* ── Dudu the Brown Bear (Sumedha) — separated pose ──── */
const DuduBear = ({ className = "" }) => (
  <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <ellipse cx="60" cy="44" rx="22" ry="20" fill="#6B4226" />
    <ellipse cx="140" cy="44" rx="22" ry="20" fill="#6B4226" />
    <ellipse cx="60" cy="44" rx="13" ry="11" fill="#C8956C" />
    <ellipse cx="140" cy="44" rx="13" ry="11" fill="#C8956C" />
    {/* Head */}
    <ellipse cx="100" cy="90" rx="65" ry="60" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    {/* Muzzle area */}
    <ellipse cx="100" cy="104" rx="28" ry="20" fill="#DEBB9A" />
    {/* Eyes */}
    <ellipse cx="76" cy="86" rx="7" ry="8" fill="#3D2B1F" />
    <circle cx="79" cy="83" r="3" fill="white" />
    {/* Right eye — winking */}
    <path d="M118 86 Q126 80 134 86" stroke="#3D2B1F" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="56" cy="102" rx="13" ry="9" fill="#F0C27A" opacity="0.7" />
    <ellipse cx="144" cy="102" rx="13" ry="9" fill="#F0C27A" opacity="0.7" />
    {/* Nose */}
    <ellipse cx="100" cy="98" rx="6" ry="4.5" fill="#3D2B1F" />
    {/* Mouth — gentle smile */}
    <path d="M92 108 Q100 116 108 108" stroke="#3D2B1F" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="100" cy="185" rx="52" ry="50" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    {/* Belly */}
    <ellipse cx="100" cy="188" rx="30" ry="28" fill="#DEBB9A" />
    {/* Left arm — reaching out */}
    <path d="M50 170 Q28 158 18 145" stroke="#C8956C" strokeWidth="22" strokeLinecap="round" fill="none" />
    <path d="M50 170 Q28 158 18 145" stroke="#B8855C" strokeWidth="1" fill="none" />
    <circle cx="18" cy="143" r="11" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    {/* Right arm — reaching out */}
    <path d="M150 170 Q172 158 182 145" stroke="#C8956C" strokeWidth="22" strokeLinecap="round" fill="none" />
    <path d="M150 170 Q172 158 182 145" stroke="#B8855C" strokeWidth="1" fill="none" />
    <circle cx="182" cy="143" r="11" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    {/* Feet */}
    <ellipse cx="74" cy="230" rx="18" ry="10" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    <ellipse cx="126" cy="230" rx="18" ry="10" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
  </svg>
);

/* ── Bubu & Dudu hugging together (post-hug) ─────────── */
const HuggingCouple = ({ className = "" }) => (
  <svg viewBox="0 0 320 260" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* ── Bubu (Panda, left) ── */}
    {/* Panda ears */}
    <ellipse cx="80" cy="38" rx="22" ry="20" fill="#2D2D2D" />
    <ellipse cx="156" cy="38" rx="22" ry="20" fill="#2D2D2D" />
    <ellipse cx="80" cy="38" rx="13" ry="11" fill="#404040" />
    <ellipse cx="156" cy="38" rx="13" ry="11" fill="#404040" />
    {/* Panda head */}
    <ellipse cx="118" cy="82" rx="60" ry="55" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    {/* Eye patches */}
    <ellipse cx="96" cy="78" rx="15" ry="14" fill="#2D2D2D" transform="rotate(-8 96 78)" />
    <ellipse cx="140" cy="78" rx="15" ry="14" fill="#2D2D2D" transform="rotate(8 140 78)" />
    {/* Eyes — closed happy */}
    <path d="M88 78 Q96 72 104 78" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M132 78 Q140 72 148 78" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="78" cy="94" rx="12" ry="8" fill="#FFB5C5" opacity="0.7" />
    <ellipse cx="158" cy="94" rx="12" ry="8" fill="#FFB5C5" opacity="0.7" />
    {/* Nose */}
    <ellipse cx="118" cy="90" rx="4.5" ry="3" fill="#2D2D2D" />
    {/* Smile */}
    <path d="M110 96 Q118 106 126 96" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Panda body */}
    <ellipse cx="118" cy="172" rx="48" ry="46" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    <ellipse cx="118" cy="175" rx="28" ry="26" fill="#F5F5F5" />
    {/* Panda right arm — wrapping around Dudu */}
    <path d="M164 158 Q190 150 210 155 Q230 162 235 178" stroke="white" strokeWidth="22" strokeLinecap="round" fill="none" />
    <path d="M164 158 Q190 150 210 155 Q230 162 235 178" stroke="#E8E8E8" strokeWidth="1" fill="none" />
    {/* Panda left arm — behind */}
    <path d="M72 162 Q55 172 48 185" stroke="white" strokeWidth="20" strokeLinecap="round" fill="none" />
    <path d="M72 162 Q55 172 48 185" stroke="#E8E8E8" strokeWidth="1" fill="none" />
    {/* Panda feet */}
    <ellipse cx="92" cy="215" rx="16" ry="9" fill="white" stroke="#E8E8E8" strokeWidth="1" />
    <ellipse cx="140" cy="215" rx="16" ry="9" fill="white" stroke="#E8E8E8" strokeWidth="1" />

    {/* ── Dudu (Brown Bear, right) ── */}
    {/* Bear ears */}
    <ellipse cx="172" cy="40" rx="20" ry="18" fill="#6B4226" />
    <ellipse cx="244" cy="40" rx="20" ry="18" fill="#6B4226" />
    <ellipse cx="172" cy="40" rx="12" ry="10" fill="#C8956C" />
    <ellipse cx="244" cy="40" rx="12" ry="10" fill="#C8956C" />
    {/* Bear head */}
    <ellipse cx="208" cy="82" rx="56" ry="52" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    {/* Muzzle */}
    <ellipse cx="208" cy="94" rx="24" ry="17" fill="#DEBB9A" />
    {/* Eyes — closed happy */}
    <path d="M186 78 Q194 72 202 78" stroke="#3D2B1F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M218 78 Q226 72 234 78" stroke="#3D2B1F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="174" cy="94" rx="11" ry="8" fill="#F0C27A" opacity="0.7" />
    <ellipse cx="242" cy="94" rx="11" ry="8" fill="#F0C27A" opacity="0.7" />
    {/* Nose */}
    <ellipse cx="208" cy="88" rx="5" ry="3.5" fill="#3D2B1F" />
    {/* Smile */}
    <path d="M200 100 Q208 110 216 100" stroke="#3D2B1F" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Bear body */}
    <ellipse cx="208" cy="172" rx="46" ry="44" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    <ellipse cx="208" cy="175" rx="27" ry="25" fill="#DEBB9A" />
    {/* Bear left arm — wrapping around Bubu */}
    <path d="M164" cy="158" d="M164 160 Q138 152 118 156 Q98 162 90 178" stroke="#C8956C" strokeWidth="20" strokeLinecap="round" fill="none" />
    <path d="M164 160 Q138 152 118 156 Q98 162 90 178" stroke="#B8855C" strokeWidth="1" fill="none" />
    {/* Bear right arm — behind */}
    <path d="M252 162 Q268 172 275 185" stroke="#C8956C" strokeWidth="18" strokeLinecap="round" fill="none" />
    <path d="M252 162 Q268 172 275 185" stroke="#B8855C" strokeWidth="1" fill="none" />
    {/* Bear feet */}
    <ellipse cx="184" cy="213" rx="16" ry="9" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />
    <ellipse cx="230" cy="213" rx="16" ry="9" fill="#C8956C" stroke="#B8855C" strokeWidth="1" />

    {/* ── Heart between them ── */}
    <g transform="translate(152, 20)">
      <path d="M10 18l-1.2-1.1C4.5 12.8 2 10.5 2 7.5 2 5 4 3 6.5 3c1.4 0 2.8.7 3.5 1.7C10.7 3.7 12.1 3 13.5 3 16 3 18 5 18 7.5c0 3-2.5 5.3-6.8 9.4L10 18z" fill="#E11D48" />
    </g>
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

        {/* ── characters area ──────────────────── */}
        <div className="relative flex items-center justify-center mb-14" style={{ minHeight: 220 }}>
          <AnimatePresence mode="wait">
            {!isHugged ? (
              /* ── separated characters ──────── */
              <motion.div
                key="separated"
                className="flex items-end justify-center gap-4 md:gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Naman */}
                <motion.div
                  data-testid="avatar-naman"
                  className="flex flex-col items-center float-left"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, ...spring }}
                >
                  <BubuPanda className="w-32 h-36 md:w-40 md:h-48 drop-shadow-lg" />
                  <span className="font-body font-semibold text-sm text-rose-800 mt-1">Naman</span>
                </motion.div>

                {/* Sumedha */}
                <motion.div
                  data-testid="avatar-sumedha"
                  className="flex flex-col items-center float-right"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, ...spring }}
                >
                  <DuduBear className="w-32 h-36 md:w-40 md:h-48 drop-shadow-lg" />
                  <span className="font-body font-semibold text-sm text-rose-800 mt-1">Sumedha</span>
                </motion.div>
              </motion.div>
            ) : (
              /* ── hugging characters ────────── */
              <motion.div
                key="hugging"
                data-testid="hugging-couple"
                className="flex flex-col items-center"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 12 }}
              >
                <div className="relative">
                  <HuggingCouple className="w-52 h-48 md:w-64 md:h-56 drop-shadow-xl" />
                  {/* glow behind */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-rose-200/40 blur-3xl scale-110" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
