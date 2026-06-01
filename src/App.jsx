import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroScene, LoadingScene, MiniOrb } from './Scene'
import { questions, toolDatabase, personas } from './data'

const fade = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
  exit:    { opacity: 0, y: -18, transition: { duration: 0.25 } }
}

function TiltCard({ children, style, onClick }) {
  const ref = useRef()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.025)`
  }
  const onLeave = () => { ref.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)' }
  return (
    <div ref={ref} style={{ transition: 'transform 0.18s ease', ...style }} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </div>
  )
}

function Toast({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          style={{ position: 'fixed', bottom: 28, left: '50%', background: '#0f1629', border: '1px solid rgba(99,102,241,0.45)', borderRadius: 100, padding: '11px 24px', fontSize: 14, color: '#f1f5f9', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(99,102,241,0.2)' }}
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [qIndex, setQIndex]   = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [toast, setToast]     = useState('')

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000) }

  const select = (label) => {
    const q = questions[qIndex]
    if (q.multi) {
      const cur = answers[qIndex] || []
      setAnswers(p => ({ ...p, [qIndex]: cur.includes(label) ? cur.filter(x => x !== label) : [...cur, label] }))
    } else {
      setAnswers(p => ({ ...p, [qIndex]: label }))
    }
  }

  const picked = (label) => {
    const a = answers[qIndex]
    if (!a) return false
    return Array.isArray(a) ? a.includes(label) : a === label
  }

  const hasAnswer = () => {
    const a = answers[qIndex]
    return a && (Array.isArray(a) ? a.length > 0 : true)
  }

  const next = () => {
    if (!hasAnswer()) return
    if (qIndex < questions.length - 1) { setQIndex(i => i + 1); return }
    setScreen('loading')
    const role    = answers[0] || 'Content Creator'
    const persona = personas[role] || personas['Content Creator']
    const seen    = new Set()
    const tools   = []
    persona.categories.forEach(cat => {
      ;(toolDatabase[cat] || []).forEach(t => { if (!seen.has(t.name)) { seen.add(t.name); tools.push(t) } })
    })
    setTimeout(() => { setResults({ persona, tools: tools.slice(0, 8), role }); setScreen('results') }, 2800)
  }

  const prev   = () => { if (qIndex > 0) setQIndex(i => i - 1) }
  const retake = () => { setAnswers({}); setQIndex(0); setResults(null); setScreen('landing') }

  const share = () => {
    if (!results) return
    const chips = results.tools.slice(0, 5).map(t => t.name).join(', ')
    const txt = `🌌 My AI Stack — ${results.persona.emoji} ${results.persona.title}\n\nTools: ${chips}\n\nFind YOUR perfect AI toolkit in 60 seconds:\nanantkit.in\n\nby Anant Cosmos 🚀`
    navigator.clipboard.writeText(txt).catch(() => {})
    showToast('✅ Copied! Share it everywhere.')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === 'landing'  && <Landing  key="l" onStart={() => setScreen('quiz')} />}
        {screen === 'quiz'     && <Quiz     key="q" qIndex={qIndex} answers={answers} onSelect={select} picked={picked} hasAnswer={hasAnswer} onNext={next} onPrev={prev} />}
        {screen === 'loading'  && <Loading  key="ld" />}
        {screen === 'results'  && results && <Results key="r" results={results} onShare={share} onRetake={retake} />}
      </AnimatePresence>
      <Toast msg={toast} />
    </>
  )
}

/* ─────────────────── LANDING ─────────────────── */
function Landing({ onStart }) {
  return (
    <motion.div {...fade} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}><HeroScene /></div>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at center, transparent 25%, rgba(3,7,18,0.75) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 680 }}>
        {/* Logo pill */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 48, background: 'rgba(10,15,30,0.85)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 100, padding: '8px 22px', backdropFilter: 'blur(20px)' }}>
          <span style={{ fontSize: 20 }}>🌌</span>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, background: 'linear-gradient(90deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AnantKit</span>
          <span style={{ fontSize: 11, color: '#475569', letterSpacing: 2, textTransform: 'uppercase' }}>by Anant Cosmos</span>
        </motion.div>

        {/* Hero */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.2rem, 7vw, 4rem)', lineHeight: 1.06, marginBottom: 22, letterSpacing: '-0.02em' }}>
          Find Your Perfect<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Toolkit</span>
          <br />in 60 Seconds
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 38px', lineHeight: 1.75, fontWeight: 300 }}>
          Answer 5 quick questions. Get a personalized AI toolkit built exactly for your role, goals, and workflow.
        </motion.p>

        {/* Badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 38 }}>
          {['⚡ 5 Questions', '🎯 Personalized', '📤 Shareable Card', '🆓 100% Free'].map(b => (
            <span key={b} style={{ background: 'rgba(10,15,30,0.85)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#94a3b8', backdropFilter: 'blur(20px)' }}>{b}</span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(99,102,241,0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: '#fff', border: 'none', padding: '17px 46px', borderRadius: 100, fontSize: '1rem', fontWeight: 700, fontFamily: 'Outfit', boxShadow: '0 0 40px rgba(99,102,241,0.32)' }}>
          Find My AI Stack →
        </motion.button>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          style={{ display: 'flex', gap: 44, justifyContent: 'center', marginTop: 52, flexWrap: 'wrap' }}>
          {[['50+', 'AI Tools'], ['12', 'Categories'], ['∞', 'Combos']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.9rem', background: 'linear-gradient(90deg,#06b6d4,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 2, letterSpacing: 1.2, textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─────────────────── QUIZ ─────────────────── */
const orbColors = ['#06b6d4', '#a855f7', '#f59e0b', '#6366f1', '#f43f5e']

function Quiz({ qIndex, answers, onSelect, picked, hasAnswer, onNext, onPrev }) {
  const q     = questions[qIndex]
  const color = orbColors[qIndex]
  const pct   = (qIndex / questions.length) * 100

  return (
    <motion.div {...fade} style={{ minHeight: '100vh', padding: '36px 20px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* subtle orb top-right */}
      <div style={{ position: 'fixed', top: -80, right: -80, width: 320, height: 320, opacity: 0.22, pointerEvents: 'none', zIndex: 0 }}>
        <MiniOrb color={color} />
      </div>
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 80% 10%, ${color}0d 0%, transparent 55%)`, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 17, background: 'linear-gradient(90deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🌌 AnantKit</span>
          <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{qIndex + 1} / {questions.length}</span>
        </div>

        {/* progress */}
        <div style={{ background: 'rgba(99,102,241,0.1)', borderRadius: 100, height: 5, marginBottom: 44, overflow: 'hidden' }}>
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg,#6366f1,#a855f7)', borderRadius: 100 }} />
        </div>

        {/* question */}
        <AnimatePresence mode="wait">
          <motion.div key={qIndex} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
            <div style={{ fontSize: 11, color: '#6366f1', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>Question {qIndex + 1}</div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.1rem)', marginBottom: 8, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{q.title}</h2>
            <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.92rem', fontWeight: 400 }}>{q.desc}</p>

            {/* options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(188px,1fr))', gap: 11, marginBottom: 36 }}>
              {q.options.map(opt => {
                const sel = picked(opt.label)
                return (
                  <TiltCard key={opt.label} onClick={() => onSelect(opt.label)} style={{
                    background: sel ? 'rgba(99,102,241,0.14)' : 'rgba(10,15,30,0.82)',
                    border: `1.5px solid ${sel ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.1)'}`,
                    borderRadius: 15, padding: '17px 15px', cursor: 'pointer',
                    boxShadow: sel ? '0 0 22px rgba(99,102,241,0.18)' : 'none',
                    backdropFilter: 'blur(18px)',
                  }}>
                    <div style={{ fontSize: 25, marginBottom: 9 }}>{opt.icon}</div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.93rem', marginBottom: 4, color: sel ? '#c7d2fe' : '#f1f5f9' }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>{opt.hint}</div>
                  </TiltCard>
                )
              })}
            </div>

            {/* nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={onPrev}
                style={{ background: 'transparent', border: '1px solid rgba(99,102,241,0.18)', color: '#475569', padding: '11px 22px', borderRadius: 100, fontSize: '0.88rem', visibility: qIndex === 0 ? 'hidden' : 'visible' }}>
                ← Back
              </button>
              <motion.button whileHover={hasAnswer() ? { scale: 1.04 } : {}} whileTap={hasAnswer() ? { scale: 0.97 } : {}} onClick={onNext}
                style={{ background: hasAnswer() ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'rgba(99,102,241,0.09)', color: hasAnswer() ? '#fff' : '#475569', border: 'none', padding: '13px 34px', borderRadius: 100, fontSize: '0.93rem', fontWeight: 700, fontFamily: 'Outfit', cursor: hasAnswer() ? 'pointer' : 'not-allowed', boxShadow: hasAnswer() ? '0 0 20px rgba(99,102,241,0.25)' : 'none', transition: 'all 0.3s' }}>
                {qIndex === questions.length - 1 ? 'Get My Kit 🚀' : 'Next →'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─────────────────── LOADING ─────────────────── */
function Loading() {
  const steps = ['Analyzing your role & goals...', 'Matching tools to your workflow...', 'Building your personalized stack...']
  return (
    <motion.div {...fade} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}><LoadingScene /></div>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3,7,18,0.8) 100%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          style={{ width: 60, height: 60, border: '2px solid rgba(99,102,241,0.2)', borderTop: '2px solid #6366f1', borderRadius: '50%', margin: '0 auto 28px' }} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', marginBottom: 22 }}>Building Your AnantKit...</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center' }}>
          {steps.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.7 }}
              style={{ color: '#475569', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#6366f1' }}>✦</span> {s}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────── RESULTS ─────────────────── */
function Results({ results, onShare, onRetake }) {
  const { persona, tools } = results
  return (
    <motion.div {...fade} style={{ minHeight: '100vh', padding: '36px 20px 80px', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 20% 20%, ${persona.color}09 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44 }}>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 17, background: 'linear-gradient(90deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🌌 AnantKit</span>
          <button onClick={onRetake} style={{ background: 'transparent', border: '1px solid rgba(99,102,241,0.18)', color: '#64748b', padding: '7px 17px', borderRadius: 100, fontSize: 13 }}>Retake Quiz</button>
        </div>

        {/* result heading */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-block', background: `${persona.color}18`, border: `1px solid ${persona.color}40`, borderRadius: 100, padding: '5px 18px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: persona.color, marginBottom: 14, fontWeight: 600 }}>✦ Your AnantKit is Ready</div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.7rem,5vw,2.6rem)', marginBottom: 9, letterSpacing: '-0.02em' }}>{persona.emoji} {persona.title}</h1>
          <p style={{ color: '#64748b', fontSize: '0.97rem', fontWeight: 300 }}>{persona.subtitle}</p>
        </motion.div>

        {/* share card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <TiltCard style={{
            background: 'linear-gradient(135deg,rgba(10,15,30,0.96),rgba(18,22,44,0.96))',
            border: '1px solid rgba(99,102,241,0.22)', borderRadius: 22, padding: 28, marginBottom: 28,
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 0 55px ${persona.color}12, 0 20px 55px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)`
          }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, background: `radial-gradient(circle,${persona.color}1a 0%,transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>My AI Stack</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', background: `linear-gradient(90deg,#fff,${persona.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{persona.emoji} {persona.title}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15 }}>🌌</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>AnantKit</div>
                <div style={{ fontSize: 10, color: '#334155' }}>by Anant Cosmos</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
              {tools.slice(0, 6).map(t => (
                <span key={t.name} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 100, padding: '4px 13px', fontSize: 12, fontWeight: 500, color: '#c7d2fe' }}>{t.emoji} {t.name}</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#334155' }}>
              <span style={{ color: '#06b6d4' }}>anantkit.in</span> · Find your AI stack in 60 seconds
            </div>
          </TiltCard>
        </motion.div>

        {/* tools list */}
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.05rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>🛠️ Your Recommended Tools</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 36 }}>
          {tools.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 + i * 0.055 }}>
              <TiltCard style={{ background: 'rgba(10,15,30,0.82)', border: '1px solid rgba(99,102,241,0.09)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 14, backdropFilter: 'blur(18px)' }}>
                <div style={{ width: 46, height: 46, flexShrink: 0, background: 'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(168,85,247,0.18))', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21 }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.92rem' }}>{t.name}</span>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 600, background: t.free ? 'rgba(16,185,129,0.13)' : 'rgba(245,158,11,0.13)', border: `1px solid ${t.free ? 'rgba(16,185,129,0.28)' : 'rgba(245,158,11,0.28)'}`, color: t.free ? '#34d399' : '#fbbf24' }}>{t.tag}</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 5 }}>{t.desc}</div>
                  <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 500 }}>{t.use}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* action buttons */}
        <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(99,102,241,0.45)' }} whileTap={{ scale: 0.97 }} onClick={onShare}
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: '#fff', border: 'none', padding: '13px 30px', borderRadius: 100, fontSize: '0.93rem', fontWeight: 700, fontFamily: 'Outfit', cursor: 'pointer', boxShadow: '0 0 22px rgba(99,102,241,0.28)', display: 'flex', alignItems: 'center', gap: 7 }}>
            📤 Share My Kit
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onRetake}
            style={{ background: 'transparent', border: '1px solid rgba(99,102,241,0.18)', color: '#64748b', padding: '13px 30px', borderRadius: 100, fontSize: '0.93rem', fontFamily: 'Outfit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
            🔄 Retake Quiz
          </motion.button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 44, fontSize: 12, color: '#1e293b' }}>
          Made with 🌌 by <span style={{ color: '#6366f1' }}>Anant Cosmos</span> · AnantKit v1.0
        </div>
      </div>
    </motion.div>
  )
}
