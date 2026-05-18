import { useEffect, useRef } from 'react'
import './App.css'

const PETAL_COLORS = [
  '#f7c5d5', '#f9d4e0', '#f4b0c8', '#fce4ec',
  '#f8bbd0', '#e8a0b4', '#fddde6', '#f48fb1',
]

function PetalField() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const count = 28
    const petals = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'petal'

      const size = 10 + Math.random() * 12
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size * 1.3}px;
        background: ${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]};
        animation-duration: ${6 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 12}s;
        border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
        opacity: 0;
        transform: rotate(${Math.random() * 360}deg);
      `
      container.appendChild(el)
      petals.push(el)
    }

    return () => petals.forEach(p => p.remove())
  }, [])

  return <div className="petal-field" ref={ref} aria-hidden="true" />
}

function spawnHeart(x, y) {
  const el = document.createElement('div')
  el.className = 'pop-heart'
  el.textContent = ['❤️','💕','💗','💖','🌸','💝'][Math.floor(Math.random() * 6)]
  el.style.left = `${x - 14}px`
  el.style.top  = `${y - 14}px`
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove())
}

function App() {
  useEffect(() => {
    function onClick(e) { spawnHeart(e.clientX, e.clientY) }
    function onTouch(e) {
      const t = e.changedTouches[0]
      spawnHeart(t.clientX, t.clientY)
    }
    window.addEventListener('click', onClick)
    window.addEventListener('touchend', onTouch, { passive: true })
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchend', onTouch)
    }
  }, [])

  return (
    <>
      <PetalField />

      {/* ── Hero ── */}
      <section id="hero">
        <div className="crown" aria-hidden="true">🌸</div>
        <p className="eyebrow">A love letter</p>
        <h1>
          You are my <em>everything,</em><br />
          my heart&apos;s home
        </h1>
        <p className="tagline">
          Every moment with you is a gift I never want to stop unwrapping.
        </p>

        <div className="heart-wrap">
          <span className="big-heart" role="img" aria-label="love">❤️</span>
        </div>

        <div className="divider" aria-hidden="true"><span>🌷</span></div>
      </section>

      {/* ── Reason cards ── */}
      <section id="cards" aria-label="Reasons I love you">
        {[
          { icon: '🌹', title: 'Your smile',    text: 'It lights up every room and every corner of my heart without even trying.' },
          { icon: '🦋', title: 'Your laughter', text: 'The sound I want to fall asleep to and wake up to for the rest of my life.' },
          { icon: '🌿', title: 'Your kindness', text: 'The gentle way you care for everyone around you leaves me in constant awe.' },
          { icon: '✨', title: 'Your mind',     text: 'Every conversation with you opens a new world I never knew existed.' },
          { icon: '🌺', title: 'Your courage',  text: 'You face every challenge with a grace that inspires me daily.' },
          { icon: '💫', title: 'Just… you',     text: 'All of it — every quirk, every dream, every quiet Tuesday evening.' },
        ].map(({ icon, title, text }) => (
          <div className="card" key={title}>
            <span className="card-icon" aria-hidden="true">{icon}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>

      {/* ── Letter ── */}
      <section id="letter" aria-label="Love letter">
        <div className="letter-card">
          <p>
            From the very first moment I saw you, something shifted — like the world
            quietly rearranged itself to make room for what was about to begin.
          </p>
          <p>
            You are not just the person I love. You are the reason I want to be
            better, braver, and more present every single day.
          </p>
          <p>
            Thank you for choosing me, again and again, in all the small ways that matter most.
          </p>
          <div className="letter-sig">Forever yours 💕</div>
        </div>
      </section>

      <footer>
        <p>Tap anywhere to send a little love ✨ · Made with all my heart</p>
      </footer>
    </>
  )
}

export default App