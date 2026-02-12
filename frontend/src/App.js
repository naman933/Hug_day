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

/* ── cute boy character SVG ───────────────────────────── */
const BoyCharacter = ({ className = "" }) => (
  <svg viewBox="0 0 200 280" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Hair */}
    <ellipse cx="100" cy="68" rx="58" ry="55" fill="#4A3728" />
    <rect x="42" y="50" width="116" height="30" rx="8" fill="#4A3728" />
    {/* Face */}
    <ellipse cx="100" cy="85" rx="50" ry="48" fill="#FDDCB5" />
    {/* Hair fringe */}
    <path d="M50 68 Q70 40 100 45 Q130 40 150 68 Q145 52 120 48 Q100 35 80 48 Q55 52 50 68Z" fill="#4A3728" />
    {/* Eyes */}
    <ellipse cx="80" cy="88" rx="6" ry="7" fill="#2D1B0E" />
    <ellipse cx="120" cy="88" rx="6" ry="7" fill="#2D1B0E" />
    <circle cx="82" cy="86" r="2.5" fill="white" />
    <circle cx="122" cy="86" r="2.5" fill="white" />
    {/* Blush */}
    <ellipse cx="68" cy="100" rx="10" ry="6" fill="#F9A8B8" opacity="0.5" />
    <ellipse cx="132" cy="100" rx="10" ry="6" fill="#F9A8B8" opacity="0.5" />
    {/* Smile */}
    <path d="M88 106 Q100 118 112 106" stroke="#C47A5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Body / T-shirt */}
    <path d="M60 130 Q60 140 55 170 L55 220 Q55 235 100 235 Q145 235 145 220 L145 170 Q140 140 140 130 Q130 125 100 125 Q70 125 60 130Z" fill="#5B8DBE" />
    {/* Collar */}
    <path d="M80 128 L100 145 L120 128" stroke="#4A7DAD" strokeWidth="2" fill="none" />
    {/* Arms reaching out (right side) */}
    <path d="M140 150 Q160 148 178 140 Q185 138 182 145 Q175 158 155 165 Q145 168 140 170" fill="#FDDCB5" stroke="#F0C9A0" strokeWidth="1" />
    {/* Left arm relaxed */}
    <path d="M60 150 Q45 160 35 180 Q32 188 38 186 Q50 178 55 168 Q58 162 60 170" fill="#FDDCB5" stroke="#F0C9A0" strokeWidth="1" />
    {/* Hands */}
    <circle cx="182" cy="142" r="8" fill="#FDDCB5" />
    <circle cx="35" cy="183" r="8" fill="#FDDCB5" />
    {/* Legs */}
    <rect x="72" y="232" width="22" height="35" rx="8" fill="#3D5A80" />
    <rect x="106" y="232" width="22" height="35" rx="8" fill="#3D5A80" />
    {/* Shoes */}
    <ellipse cx="83" cy="270" rx="16" ry="8" fill="#2D1B0E" />
    <ellipse cx="117" cy="270" rx="16" ry="8" fill="#2D1B0E" />
  </svg>
);

/* ── cute girl character SVG ──────────────────────────── */
const GirlCharacter = ({ className = "" }) => (
  <svg viewBox="0 0 200 280" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Hair (long) */}
    <ellipse cx="100" cy="72" rx="62" ry="58" fill="#5C2D0E" />
    {/* Hair sides (long flowing) */}
    <path d="M40 70 Q35 120 38 180 Q40 190 48 185 Q50 130 48 80Z" fill="#5C2D0E" />
    <path d="M160 70 Q165 120 162 180 Q160 190 152 185 Q150 130 152 80Z" fill="#5C2D0E" />
    {/* Face */}
    <ellipse cx="100" cy="88" rx="48" ry="46" fill="#FDE5C8" />
    {/* Hair fringe with bangs */}
    <path d="M52 72 Q60 42 80 38 Q100 32 120 38 Q140 42 148 72 Q140 55 125 50 Q115 42 100 44 Q85 42 75 50 Q60 55 52 72Z" fill="#5C2D0E" />
    {/* Small hair clips */}
    <circle cx="55" cy="68" r="5" fill="#F43F5E" />
    <circle cx="145" cy="68" r="5" fill="#F43F5E" />
    {/* Eyes */}
    <ellipse cx="80" cy="90" rx="6" ry="8" fill="#2D1B0E" />
    <ellipse cx="120" cy="90" rx="6" ry="8" fill="#2D1B0E" />
    <circle cx="82" cy="87" r="2.5" fill="white" />
    <circle cx="122" cy="87" r="2.5" fill="white" />
    {/* Eyelashes */}
    <path d="M74 84 L70 80" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M126 84 L130 80" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="68" cy="102" rx="10" ry="6" fill="#F9A8B8" opacity="0.6" />
    <ellipse cx="132" cy="102" rx="10" ry="6" fill="#F9A8B8" opacity="0.6" />
    {/* Smile */}
    <path d="M88 108 Q100 120 112 108" stroke="#C47A5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Dress */}
    <path d="M60 132 Q55 145 45 210 Q44 230 100 235 Q156 230 155 210 L140 132 Q130 126 100 126 Q70 126 60 132Z" fill="#E11D48" />
    {/* Collar/neckline */}
    <path d="M78 130 Q100 142 122 130" stroke="#C41640" strokeWidth="1.5" fill="none" />
    {/* Arms reaching out (left side) */}
    <path d="M60 152 Q40 150 22 142 Q15 140 18 147 Q25 160 45 167 Q55 170 60 172" fill="#FDE5C8" stroke="#F0C9A0" strokeWidth="1" />
    {/* Right arm relaxed */}
    <path d="M140 152 Q155 162 165 182 Q168 190 162 188 Q150 180 145 170 Q142 164 140 172" fill="#FDE5C8" stroke="#F0C9A0" strokeWidth="1" />
    {/* Hands */}
    <circle cx="18" cy="144" r="8" fill="#FDE5C8" />
    <circle cx="165" cy="185" r="8" fill="#FDE5C8" />
    {/* Legs */}
    <rect x="75" y="230" width="18" height="30" rx="8" fill="#FDE5C8" />
    <rect x="107" y="230" width="18" height="30" rx="8" fill="#FDE5C8" />
    {/* Shoes */}
    <ellipse cx="84" cy="264" rx="14" ry="7" fill="#E11D48" />
    <ellipse cx="116" cy="264" rx="14" ry="7" fill="#E11D48" />
  </svg>
);

/* ── hugging couple SVG (post-hug) ────────────────────── */
const HuggingCouple = ({ className = "" }) => (
  <svg viewBox="0 0 280 300" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* ─── Boy (left, turned right) ─── */}
    {/* Boy hair */}
    <ellipse cx="105" cy="68" rx="52" ry="50" fill="#4A3728" />
    <rect x="53" y="50" width="104" height="26" rx="8" fill="#4A3728" />
    {/* Boy face */}
    <ellipse cx="105" cy="82" rx="44" ry="42" fill="#FDDCB5" />
    {/* Boy hair fringe */}
    <path d="M63 68 Q78 42 105 46 Q132 42 147 68 Q142 54 125 50 Q105 38 85 50 Q68 54 63 68Z" fill="#4A3728" />
    {/* Boy eyes (closed happy) */}
    <path d="M85 84 Q90 90 95 84" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M115 84 Q120 90 125 84" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Boy blush */}
    <ellipse cx="78" cy="95" rx="9" ry="5" fill="#F9A8B8" opacity="0.6" />
    <ellipse cx="132" cy="95" rx="9" ry="5" fill="#F9A8B8" opacity="0.6" />
    {/* Boy smile */}
    <path d="M92 100 Q105 112 118 100" stroke="#C47A5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Boy body */}
    <path d="M68 120 Q65 132 60 165 L60 215 Q60 228 105 228 Q150 228 150 215 L150 165 Q145 132 142 120 Q130 115 105 115 Q80 115 68 120Z" fill="#5B8DBE" />
    {/* Boy arm wrapping around girl */}
    <path d="M148 145 Q168 140 195 145 Q215 150 220 165 Q222 175 210 178 Q200 175 195 168 Q188 160 180 165 L175 210" fill="#FDDCB5" stroke="#F0C9A0" strokeWidth="1.5" />
    {/* Boy left arm behind */}
    <path d="M68 145 Q55 155 48 170 Q45 178 50 176 Q58 170 62 162" fill="#FDDCB5" stroke="#F0C9A0" strokeWidth="1" />

    {/* ─── Girl (right, turned left) ─── */}
    {/* Girl hair */}
    <ellipse cx="178" cy="72" rx="52" ry="52" fill="#5C2D0E" />
    {/* Long hair sides */}
    <path d="M228 72 Q232 120 230 178 Q228 188 222 183 Q220 130 222 82Z" fill="#5C2D0E" />
    {/* Girl face */}
    <ellipse cx="178" cy="86" rx="42" ry="42" fill="#FDE5C8" />
    {/* Girl hair fringe */}
    <path d="M138 74 Q148 46 168 42 Q185 36 198 42 Q218 46 228 74 Q220 58 205 52 Q192 44 178 46 Q164 44 151 52 Q140 58 138 74Z" fill="#5C2D0E" />
    {/* Hair clips */}
    <circle cx="140" cy="70" r="4.5" fill="#F43F5E" />
    <circle cx="220" cy="66" r="4.5" fill="#F43F5E" />
    {/* Girl eyes (closed happy) */}
    <path d="M162 88 Q167 94 172 88" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M188 88 Q193 94 198 88" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Girl blush */}
    <ellipse cx="155" cy="100" rx="9" ry="5" fill="#F9A8B8" opacity="0.7" />
    <ellipse cx="201" cy="100" rx="9" ry="5" fill="#F9A8B8" opacity="0.7" />
    {/* Girl smile */}
    <path d="M165 104 Q178 116 191 104" stroke="#C47A5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Girl dress */}
    <path d="M142 126 Q135 142 128 210 Q127 228 178 232 Q229 228 228 210 L215 126 Q205 120 178 120 Q151 120 142 126Z" fill="#E11D48" />
    {/* Girl arm wrapping around boy */}
    <path d="M142 148 Q122 143 98 148 Q78 153 72 168 Q70 178 80 176 Q88 172 95 165 Q102 158 108 162 L110 208" fill="#FDE5C8" stroke="#F0C9A0" strokeWidth="1.5" />

    {/* ─── Small heart between them ─── */}
    <g transform="translate(140, 60) scale(0.6)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E11D48" />
    </g>

    {/* Boy legs */}
    <rect x="80" y="224" width="20" height="32" rx="8" fill="#3D5A80" />
    <rect x="110" y="224" width="20" height="32" rx="8" fill="#3D5A80" />
    <ellipse cx="90" cy="260" rx="14" ry="7" fill="#2D1B0E" />
    <ellipse cx="120" cy="260" rx="14" ry="7" fill="#2D1B0E" />

    {/* Girl legs */}
    <rect x="155" y="226" width="16" height="28" rx="8" fill="#FDE5C8" />
    <rect x="185" y="226" width="16" height="28" rx="8" fill="#FDE5C8" />
    <ellipse cx="163" cy="258" rx="12" ry="6" fill="#E11D48" />
    <ellipse cx="193" cy="258" rx="12" ry="6" fill="#E11D48" />
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
                  <BoyCharacter className="w-28 h-36 md:w-36 md:h-48 drop-shadow-lg" />
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
                  <DuduBear className="w-28 h-36 md:w-36 md:h-48 drop-shadow-lg" />
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
                  <HuggingCouple className="w-44 h-48 md:w-56 md:h-60 drop-shadow-xl" />
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
