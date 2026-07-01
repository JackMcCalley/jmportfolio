import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback, memo } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
]

const EXPERIENCE = [
  {
    period: 'Dec 2022 — Present',
    role: 'Front End Web Developer',
    company: 'Runningfish',
    bullets: [
      'Shipped 50+ WordPress websites end to end — custom theme and template development in PHP, HTML, and CSS/SCSS through QA and launch.',
      'Manage and maintain 30+ ecommerce sites on WooCommerce/WordPress and Shopify, handling platform configuration, performance, and ongoing support.',
      'Designed and built a custom one-time password (OTP) system tied to completed WooCommerce orders, with single-use expiry and passwordless magic-link login.',
      'Configure secure database and platform setups; manage MySQL databases through cPanel.',
      'Optimize page load speeds, cross-browser and cross-device compatibility. Implement Google Analytics, GTM, and Looker Studio tracking via code-level integrations.',
    ],
    tags: ['PHP', 'WordPress', 'WooCommerce', 'MySQL', 'CSS/SCSS', 'Google Analytics'],
  },
  {
    period: 'May 2018 — Dec 2022',
    role: 'Full Stack Developer',
    company: 'Freelance',
    bullets: [
      'Built client websites using React and Ruby on Rails across a range of industries.',
      'Worked across front end, back end, and platform-level work — React, TypeScript, Ruby on Rails, AWS, Shopify, Contentful, GraphQL.',
    ],
    tags: ['React', 'TypeScript', 'Ruby on Rails', 'GraphQL', 'AWS', 'Shopify'],
  },
  {
    period: 'Apr 2018 — May 2018',
    role: 'Mobile Application Developer',
    company: '7CTOs',
    bullets: [
      'Paired on adding instant messaging, push notifications, and MMS to a React Native app for iOS and Android using JWT authentication.',
    ],
    tags: ['React Native', 'JWT', 'iOS', 'Android'],
  },
]

const SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'PHP', 'Ruby on Rails',
  'HTML5', 'CSS/SCSS', 'Next.js', 'Tailwind', 'WordPress',
  'WooCommerce', 'Shopify', 'PostgreSQL', 'MySQL', 'GraphQL',
  'AWS', 'Docker', 'Contentful', 'Figma', 'Google Analytics',
]

const SMALL_PROJECTS = [
  {
    name: 'P3D Guides',
    desc: 'Dental service platform built with React on Rails. RESTful Rails API for user data and file management, Shopify for payments, AWS S3 for file storage.',
    tags: ['React', 'Ruby on Rails', 'AWS', 'Shopify'],
  },
  {
    name: 'ICT Coffee',
    desc: 'Intercontinental coffee distribution website built with PHP and SCSS, integrated with Quickbase for backend data management.',
    tags: ['PHP', 'SCSS', 'Quickbase'],
  },
  {
    name: 'Games User Research — IGDA',
    desc: 'Directory website for the GamesUR division of IGDA, created using WordPress and SCSS.',
    tags: ['WordPress', 'SCSS'],
  },
]

function GlowBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 20% 100%, rgba(28,94,66,0.165) 0%, transparent 70%),
            radial-gradient(ellipse 45% 60% at 20% 88%,  rgba(50,160,90,0.084) 0%, transparent 65%),
            radial-gradient(ellipse 30% 55% at 20% 75%,  rgba(79,232,168,0.054) 0%, transparent 60%),
            radial-gradient(ellipse 18% 45% at 20% 62%,  rgba(140,255,200,0.036) 0%, transparent 55%),
            radial-gradient(ellipse 10% 35% at 20% 48%,  rgba(182,255,226,0.024) 0%, transparent 50%)
          `,
          animation: 'morgul-pulse 6s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `repeating-conic-gradient(
            from 270deg at 20% 105%,
            rgba(79,232,168,0.017) 0deg, transparent 3deg,
            transparent 8deg, rgba(79,232,168,0.009) 11deg,
            transparent 14deg, transparent 20deg
          )`,
          animation: 'morgul-rays 8s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, rgba(100,200,140,0.07) 0%, transparent 40%)' }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(7,11,9,0.75) 100%)' }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 8% at 20% 72%, rgba(79,232,168,0.018) 0%, transparent 100%),
            radial-gradient(ellipse 40% 5% at 18% 60%, rgba(79,232,168,0.012) 0%, transparent 100%)
          `,
          animation: 'morgul-mist 12s ease-in-out infinite',
        }}
      />
    </>
  )
}

type TrailPoint = { x: number; y: number; born: number }

const MouseTrail = memo(function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<TrailPoint[]>([])
  const mouse = useRef<{ x: number; y: number } | null>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const last = mouse.current
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 10) return
      mouse.current = { x: e.clientX, y: e.clientY }
      points.current.push({ x: e.clientX, y: e.clientY, born: performance.now() })
      if (points.current.length > 16) points.current.shift()
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const LIFETIME = 275
    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      points.current = points.current.filter(p => now - p.born < LIFETIME)
      const pts = points.current
      for (let i = 0; i < pts.length; i++) {
        const t = i / Math.max(pts.length - 1, 1)
        const age = (now - pts[i].born) / LIFETIME
        const opacity = (1 - age) * t * 0.28
        const radius = 2 + t * 5
        const grad = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, radius * 2)
        grad.addColorStop(0, `rgba(79,232,168,${opacity})`)
        grad.addColorStop(1, `rgba(79,232,168,0)`)
        ctx.beginPath()
        ctx.arc(pts[i].x, pts[i].y, radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
      raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[2]" />
})

function NavItem({ section, active }: { section: { id: string; label: string }; active: boolean }) {
  const [hovered, setHovered] = useState(false)
  const lit = active || hovered

  return (
    <a
      href={`#${section.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="no-underline block relative rounded overflow-hidden"
      style={{ padding: '10px 18px' }}
    >
      {/* growing background sweep */}
      <span
        className="absolute inset-0 rounded pointer-events-none"
        style={{
          width: lit ? '100%' : '0%',
          background: 'linear-gradient(90deg, rgba(79,232,168,0.13) 0%, rgba(28,94,66,0.06) 60%, transparent 100%)',
          transition: 'width 0.35s ease',
        }}
      />
      {/* left accent bar */}
      <span
        className="absolute left-0 rounded-sm"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          width: lit ? 3 : 0,
          height: lit ? '70%' : '30%',
          background: 'var(--color-mako-glow)',
          boxShadow: lit ? '0 0 8px var(--color-mako-glow), 0 0 18px rgba(79,232,168,0.4)' : 'none',
          transition: 'width 0.2s ease, height 0.25s ease, box-shadow 0.25s ease',
        }}
      />
      <span
        className="relative z-[1] uppercase tracking-[0.08em] transition-colors duration-200"
        style={{
          fontSize: '0.82rem',
          fontWeight: active ? 700 : 500,
          color: active ? 'var(--color-mako-pale)' : hovered ? 'var(--color-foreground)' : 'var(--color-muted)',
          textShadow: active ? '0 0 12px rgba(79,232,168,0.5)' : 'none',
        }}
      >
        {section.label}
      </span>
    </a>
  )
}

function SocialLinks() {
  const links = [
    {
      label: 'GitHub',
      href: 'https://github.com/jackmccalley',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jackmccalley',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:jackmccalley@gmail.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'Website',
      href: 'https://jackmccalley.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex gap-5 items-center">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="social-link">
          {l.icon}
        </a>
      ))}
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about">
      <p className="text-muted text-[0.925rem] leading-[1.8] mb-5 mt-0">
        Full stack developer with 6+ years shipping production websites — from custom WordPress themes to complex
        ecommerce storefronts on WooCommerce and Shopify. I own the full lifecycle: scoping, building, launching, and keeping things running.
      </p>
      <p className="text-muted text-[0.925rem] leading-[1.8] mb-5">
        At <span className="text-foreground font-medium">Runningfish</span> I've shipped 50+ WordPress sites and maintain a portfolio
        of 30+ ecommerce stores. My most recent deep-dive was a custom authentication system — single-use OTP codes tied to WooCommerce
        orders plus passwordless magic-link login, built from scratch in PHP with no external auth dependencies.
      </p>
      <p className="text-muted text-[0.925rem] leading-[1.8] mb-9">
        My freelance years gave me range across{' '}
        <span className="text-foreground font-medium">React, TypeScript, Ruby on Rails, AWS, GraphQL, and Shopify</span>.
        I move comfortably between front end, back end, and platform-level work depending on what a project needs.
      </p>
      <div>
        <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-3.5 mt-0">
          Tech I Work With
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SKILLS.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="pt-20">
      <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-8 mt-0">
        Experience
      </p>
      <div className="flex flex-col gap-1 group">
        {EXPERIENCE.map((job) => (
          <div
            key={job.company}
            className="py-5 px-4 rounded-lg transition-all duration-200 group-hover:opacity-55 hover:!opacity-100 hover:bg-mako-deep/20"
          >
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div className="min-w-[140px] shrink-0">
                <span className="text-[0.72rem] text-muted font-medium whitespace-nowrap tracking-[0.02em]">
                  {job.period}
                </span>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="mb-2">
                  <span className="font-semibold text-foreground text-[0.95rem]">{job.role}</span>
                  <span className="text-mako-glow font-medium text-[0.95rem]"> · {job.company}</span>
                </div>
                <ul className="mb-3.5 p-0 list-none flex flex-col gap-1.5">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="text-muted text-sm leading-[1.65] pl-3.5 relative">
                      <span className="absolute left-0 text-mako-deep font-bold">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="pt-20">
      <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted mb-8 mt-0">
        Projects
      </p>

      <div className="project-featured p-7 mb-8">
        <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-mako-glow opacity-80 mb-2 mt-0">
          Featured Project
        </p>
        <h3 className="mt-0 mb-3 text-foreground text-[1.05rem] font-bold">
          WooCommerce OTP + Magic-Link Auth System
        </h3>
        <p className="text-muted text-sm leading-[1.7] mb-4 mt-0">
          Custom authentication layer on top of WooCommerce — single-use OTP codes tied to completed orders that expire
          on first use, paired with a passwordless magic-link login flow. Keeps customer accounts frictionless while
          eliminating shared or reused credentials in high-volume ecommerce.
        </p>
        <ul className="mb-[18px] p-0 list-none flex flex-col gap-1.5">
          {[
            'One Time Password and Magic Link provides access, invalidated after ecommerce order completion',
            'Usable unlimited times until order is completed',
            'Custom PHP plugin',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-mako-glow text-[0.8rem] mt-[3px] shrink-0">▸</span>
              <span className="text-muted text-[0.85rem] leading-[1.65]">{point}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {['PHP', 'WordPress', 'WooCommerce', 'MySQL', 'Custom Plugin'].map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div>
        {SMALL_PROJECTS.map((p) => (
          <div key={p.name} className="project-small group">
            <div className="font-semibold text-[0.95rem] text-foreground mb-1.5 transition-colors duration-200 group-hover:text-mako-glow">
              {p.name}
            </div>
            <p className="text-muted text-[0.85rem] leading-[1.65] mb-2.5 mt-0">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Home() {
  const [activeSection, setActiveSection] = useState('about')

  const onScroll = useCallback(() => {
    const offsets = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      return { id, top: el ? el.getBoundingClientRect().top : Infinity }
    })
    const current = offsets.filter((s) => s.top <= 140).at(-1)
    if (current) setActiveSection(current.id)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <div className="relative min-h-screen">
      <GlowBackground />
      <MouseTrail />

      <div className="relative z-[1] max-w-[90vw] mx-auto flex flex-col md:flex-row">

        {/* Top nav (mobile) / Left Rail (desktop) */}
        <aside className="
          md:w-80 md:shrink-0 md:sticky md:top-0 md:h-screen
          md:flex md:flex-col md:justify-between
          md:pt-24 md:pb-[60px] md:pr-10
          flex flex-col
          px-6 pt-10 pb-6 md:px-0
        ">
          <div>
            <h1 className="text-[2.2rem] font-extrabold text-foreground m-0 mb-[10px] tracking-tight leading-[1.1]">
              John<br />McCalley
            </h1>
            <p className="text-[0.9rem] font-semibold text-mako-glow mt-0 mb-2 tracking-[0.04em]">
              Full Stack Developer
            </p>
            <p className="text-[0.82rem] text-muted mt-0 mb-6 md:mb-[52px] leading-relaxed md:max-w-[220px]">
              Building fast, reliable web experiences from WordPress to React.
            </p>
            <nav className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-4">
              {NAV_SECTIONS.map((s) => (
                <NavItem key={s.id} section={s} active={activeSection === s.id} />
              ))}
            </nav>
          </div>
          <div className="mt-8 md:mt-0">
            <SocialLinks />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 pt-8 md:pt-24 pb-[120px] px-6 md:pl-12 md:pr-12 bg-void/60">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />

          <footer className="mt-20 pt-8 border-t border-mako-deep/20">
            <p className="text-muted text-[0.78rem] leading-[1.7] m-0">
              Built with{' '}
              <span className="text-mako-glow">TanStack Start</span>,{' '}
              <span className="text-mako-glow">React</span>, and{' '}
              <span className="text-mako-glow">TypeScript</span>.
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
