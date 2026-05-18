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
    // passive: true lets the browser scroll freely; touchend avoids scroll interference
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
        <p className="eyebrow">Een liefdesbrief</p>
        <h1>
          Jij bent mijn <em>alles,</em><br />
          thuis in mijn hart
        </h1>
        <p className="tagline">
          Elk moment met jou is een cadeau dat ik nooit wil ophouden uit te pakken.
        </p>

        <div className="heart-wrap">
          <span className="big-heart" role="img" aria-label="liefde">❤️</span>
        </div>

        <div className="divider" aria-hidden="true"><span>🌷</span></div>
      </section>

      {/* ── Reason cards ── */}
      <section id="cards" aria-label="Redenen waarom ik van je hou">
        {[
          { icon: '🌹', title: 'Jouw glimlach',    text: 'Hij verlicht elke kamer en elke hoek van mijn hart, zonder ook maar iets te hoeven doen.' },
          { icon: '🦋', title: 'Jouw lach',        text: 'Het geluid waar ik in wil slapen en wakker mee wil worden voor de rest van mijn leven.' },
          { icon: '🌿', title: 'Jouw vriendheid',  text: 'De zachte manier waarop jij voor iedereen zorgt vervult me keer op keer met bewondering.' },
          { icon: '✨', title: 'Jouw geest',       text: 'Elk gesprek met jou opent een nieuwe wereld die ik nog niet kende.' },
          { icon: '🌺', title: 'Jouw moed',        text: 'Je gaat elke uitdaging aan met een gratie die me dagelijks inspireert.' },
          { icon: '💫', title: 'Gewoon… jij',      text: 'Alles — elk eigenaardigheidje, elke droom, elke stille dinsdagavond samen.' },
        ].map(({ icon, title, text }) => (
          <div className="card" key={title}>
            <span className="card-icon" aria-hidden="true">{icon}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>

      {/* ── Letter ── */}
      <section id="letter" aria-label="Liefdesbrief">
        <div className="letter-card">
          <p>
            Vanaf het allereerste moment dat ik je zag, verschoof er iets — alsof de wereld
            zich stilletjes herschikt had om ruimte te maken voor wat er ging beginnen.
          </p>
          <p>
            Jij bent niet zomaar degene van wie ik hou. Jij bent de reden dat ik elke dag
            beter, moediger en aanweziger wil zijn.
          </p>
          <p>
            Dank je wel dat je steeds opnieuw voor mij kiest, in al die kleine dingen die er het meest toe doen.
          </p>
          <div className="letter-sig">Voor altijd de jouwe 💕</div>
        </div>
      </section>

      <footer>
        <p>Klik overal om wat liefde te sturen ✨ · Gemaakt met heel mijn hart</p>
      </footer>
    </>
  )
}

export default App