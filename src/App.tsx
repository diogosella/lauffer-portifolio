import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import projectsTitleBackground from './assets/projects-title-background.png'
import contactCameraImage from './assets/contact-camera-portrait.png'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Video = {
  title: string
  id: string
}

type ProjectGroup = {
  title: string
  description: string[]
  videos: Video[]
}

const email = 'joao.lauffer@gmail.com'
const linkedin = 'https://www.linkedin.com/in/jo%C3%A3o-lauffer-0987273aa/'

const projects: ProjectGroup[] = [
  {
    title: 'Bendita Elettrica - Filmes Publicitários',
    description: [
      'Série de 6 filmes desenvolvidos em produtora audiovisual.',
      'Atuação em captação, edição e assistência de edição, além de colaboração em roteiro. Projetos voltados para narrativa visual e identidade de marca.',
    ],
    videos: [
      { title: 'Bendita Elettrica - Crocante', id: 'z0u5VPZ8L7k' },
      { title: 'Bendita Elettrica - Eleonora', id: 'ZeHP7TFmH9A' },
      { title: 'Bendita Elettrica - Califa', id: '5CuwQUuyi1A' },
      { title: 'Bendita Elettrica - Super Trunfo Verde', id: 'Cwh1yPnEMjQ' },
      { title: 'Bendita Elettrica - BMX', id: 'nlbc-UVRe-M' },
      { title: 'Bendita Elettrica - Super Trunfo Azul', id: 'JV4UQeOUp4s' },
    ],
  },
  {
    title: 'Jornal Offline',
    description: [
      'Filmagem, edição, correção de cor e sound design, com estética dinâmica e linguagem próxima ao fashion.',
      'Captação, assistência de edição e sound design, incluindo registro de depoimentos de participantes e marcas apoiadoras.',
    ],
    videos: [
      { title: 'Jornal Offline - Distribuição Praias', id: 'VZiMSm1N5m0' },
      { title: 'Multirão Offline - Jornal Offline', id: 'TApeY2QoMuo' },
    ],
  },
  {
    title: 'Justin Gelband',
    description: [
      'Projeto de longa duração com atuação contínua na produção audiovisual. Responsável por captação, direção e edição de vídeos voltados para redes sociais, anúncios e plataforma de cursos.',
      'Justin Gelband é um treinador norte-americano reconhecido por trabalhar com celebridades e modelos da Victoria’s Secret, o que trouxe ao projeto uma demanda constante por linguagem visual alinhada a posicionamento internacional e público digital.',
    ],
    videos: [
      { title: 'JG - ADS CANDICE', id: 'JZw-YV5ctgQ' },
      { title: 'JG - JASMINE', id: '-lFDgV38RsQ' },
      { title: 'JG - ADS PLATFORM', id: 'zezHta9GsHY' },
      { title: 'CRACKING ABS DAY 1', id: 't0w81V8yNdA' },
    ],
  },
  {
    title: 'Instituto Ayrton Senna - Campanha Institucional',
    description: [
      'Atuação em campanha do Instituto Ayrton Senna voltada à apresentação de histórias reais e impactantes do contexto brasileiro, assumindo a edição dos vídeos produzidos para a iniciativa.',
    ],
    videos: [
      { title: 'Homenagem Camara - Instituto Ayrton Senna', id: '93QcoEH9jWg' },
      { title: 'Denisson - Relato', id: 'KSuC5X1W_AQ' },
      { title: 'Boca do Acre - IAS', id: '83fFqgw8Huk' },
    ],
  },
  {
    title: 'Go Karting - Trailer (Pitch)',
    description: [
      'Responsável pela edição do trailer “Go Karting”, criado para apresentação do projeto e arrecadação de verba.',
    ],
    videos: [{ title: 'Go Karting - Trailer Documentário (Pitch)', id: 'BH3n_SWPcwo' }],
  },
  {
    title: 'IstoÉ — “Sobreviventes” (Pitch)',
    description: [
      'Edição do vídeo promocional desenvolvido para apresentação de projeto à revista IstoÉ.',
    ],
    videos: [{ title: 'ISTOÉ SOBREVIVENTES', id: 'CVfbCbudQ4I' }],
  },
]

const allVideos = projects.flatMap((project) => project.videos)

function youtubeEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}`
}

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

function renderHeroWord(word: string) {
  return Array.from(word).map((letter, index) => (
    <span className="letter" key={`${letter}-${index}`}>
      {letter}
    </span>
  ))
}

function LightbulbIcon({ isOn }: { isOn: boolean }) {
  return (
    <svg
      className="theme-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {isOn ? (
        <>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.2 14.6c-1.2-1-2-2.6-2-4.3a5.8 5.8 0 0 1 11.6 0c0 1.8-.8 3.3-2 4.3-.7.6-.9 1.1-.9 2H9.1c0-.9-.2-1.4-.9-2Z" />
          <path d="M12 2v1.5" />
          <path d="m4.9 4.9 1.1 1.1" />
          <path d="M2 12h1.5" />
          <path d="m19.1 4.9-1.1 1.1" />
          <path d="M20.5 12H22" />
        </>
      ) : (
        <>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.2 14.6c-1.2-1-2-2.6-2-4.3a5.8 5.8 0 0 1 9.4-4.6" />
          <path d="M15.8 14.6c-.7.6-.9 1.1-.9 2H9.1c0-.9-.2-1.4-.9-2" />
          <path d="m3 3 18 18" />
        </>
      )}
    </svg>
  )
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(
          [
            '.reveal',
            '.section-media-reveal',
            '.project-heading-reveal',
            '.note-card-reveal',
            '.contact-reveal',
            '.video-card',
            '.hero-title .letter',
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          },
        )
        gsap.set('.hero-title .line', { opacity: 0 })
        return
      }

      const easeOut = 'power3.out'
      const heroLine = document.querySelector<HTMLElement>('.hero-title .line')
      const heroLetters = gsap.utils.toArray<HTMLElement>(
        '.hero-title .animated-name .letter',
      )
      const heroLettersWrapper =
        document.querySelector<HTMLElement>('.hero-title .animated-name .letters')

      gsap.from('.site-header.reveal', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      })

      gsap.from('.hero-copy .reveal', {
        y: 12,
        opacity: 0,
        duration: 0.42,
        ease: easeOut,
        stagger: 0.04,
      })

      gsap.from('.hero-portrait.reveal', {
        scale: 1.015,
        opacity: 0,
        duration: 0.55,
        ease: easeOut,
        delay: 0.08,
      })

      if (heroLine && heroLettersWrapper && heroLetters.length > 0) {
        gsap
          .timeline()
          .set(heroLetters, { opacity: 0 })
          .set(heroLine, {
            x: 0,
            scaleY: 0,
            opacity: 0,
            transformOrigin: '0 50%',
          })
          .to(heroLine, {
            scaleY: 1,
            opacity: 1,
            duration: 0.36,
            ease: 'expo.out',
          })
          .to(heroLine, {
            x: () => heroLettersWrapper.getBoundingClientRect().width + 10,
            duration: 0.48,
            ease: 'expo.out',
            delay: 0.06,
          })
          .to(
            heroLetters,
            {
              opacity: 1,
              duration: 0.42,
              ease: 'expo.out',
              stagger: 0.024,
            },
            '-=0.48',
          )
          .to(heroLine, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
      }

      gsap.utils.toArray<HTMLElement>('.section-media-reveal').forEach((element) => {
        gsap.from(element, {
          scale: 1.015,
          opacity: 0,
          duration: 0.52,
          ease: easeOut,
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.project-heading-reveal').forEach((element) => {
        const noteCard = element.querySelector('.note-card-reveal')

        gsap.from(element, {
          opacity: 0,
          duration: 0.28,
          ease: easeOut,
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
          },
        })

        if (noteCard) {
          gsap.from(noteCard, {
            x: 20,
            opacity: 0,
            duration: 0.36,
            ease: easeOut,
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
            },
          })
        }
      })

      gsap.utils.toArray<HTMLElement>('.video-grid').forEach((grid) => {
        gsap.from(grid.querySelectorAll('.video-card'), {
          y: 8,
          opacity: 0,
          duration: 0.3,
          ease: easeOut,
          stagger: 0.05,
          scrollTrigger: {
            trigger: grid,
            start: 'top 86%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.contact-reveal').forEach((element) => {
        const media = element.querySelector('.contact-media')
        const panelItems = element.querySelectorAll(
          '.contact-panel h2, .contact-actions, .thumbnail-carousel',
        )

        if (media) {
          gsap.from(media, {
            scale: 1.02,
            opacity: 0,
            duration: 0.55,
            ease: easeOut,
            scrollTrigger: {
              trigger: element,
              start: 'top 78%',
            },
          })
        }

        if (panelItems.length > 0) {
          gsap.from(panelItems, {
            y: 18,
            opacity: 0,
            duration: 0.42,
            ease: easeOut,
            stagger: 0.07,
            scrollTrigger: {
              trigger: element,
              start: 'top 78%',
            },
          })
        }
      })

      return undefined
    },
    { scope: rootRef },
  )

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="site" ref={rootRef}>
      <header className="site-header reveal">
        <a className="brand" href="#inicio" aria-label="João Lauffer">
          João <span>Lauffer</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() =>
            setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
          }
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          <LightbulbIcon isOn={theme === 'dark'} />
        </button>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow reveal">Editor de Vídeo & Videomaker</p>
            <h1 className="hero-title" aria-label="João Lauffer">
              <span className="word">João</span>
              <span className="text-wrapper animated-name" aria-hidden="true">
                <span className="line line1" />
                <span className="letters">
                  <span className="word">{renderHeroWord('Lauffer')}</span>
                </span>
              </span>
            </h1>
            <p className="hero-text reveal">
              Editor de vídeo com experiência em filmes publicitários, projetos
              documentais e conteúdos digitais. Atuo em edição, captação e
              construção narrativa, com foco em ritmo, estética e clareza visual.
              Experiência em produtora audiovisual e trabalhos para marcas e
              iniciativas criativas.
            </p>
            <div className="hero-actions reveal">
              <a className="primary-link" href="#contato">
                Entrar em contato
              </a>
              <a className="quiet-link" href="#projetos">
                Ver trabalhos
              </a>
            </div>
          </div>

          <figure className="hero-portrait reveal">
            <img src="/hero-camera.png" alt="João Lauffer operando uma câmera" />
            <a className="primary-link hero-image-cta" href="#contato">
              Entrar em contato
            </a>
          </figure>
        </section>

        <section className="exhibition" id="projetos">
          <div
            className="exhibition__copy section-media-reveal"
            style={{ backgroundImage: `url(${projectsTitleBackground})` }}
          >
            <div className="exhibition-text">
              <h2>Projetos</h2>
              <p className="section-subtitle">
                Atuo em edição, captação e construção narrativa, com foco em ritmo,
                estética e clareza visual.
              </p>
            </div>
          </div>

          <div className="video-stack">
            {projects.map((project) => {
              const [description, ...cards] = project.description

              return (
              <section className="video-group" key={project.title}>
                <div className="video-group__heading project-heading-reveal">
                  <div className="project-title-copy">
                    <h3>{project.title}</h3>
                    {description ? <p>{description}</p> : null}
                  </div>
                  {cards.length > 0 ? (
                    <div className="project-note-card note-card-reveal">
                      {cards.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="video-grid">
                  {project.videos.map((video) => (
                    <article className="video-card" key={video.id}>
                      <iframe
                        src={youtubeEmbed(video.id)}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {video.title}
                      </a>
                    </article>
                  ))}
                </div>
              </section>
              )
            })}
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="contact-body contact-reveal">
            <figure className="contact-media">
              <img
                src={contactCameraImage}
                alt="João Lauffer olhando para baixo enquanto segura uma câmera"
              />
            </figure>
            <div className="contact-panel">
              <h2>Entre em contato</h2>
              <div className="contact-actions">
            <button className="email-cta" type="button" onClick={copyEmail}>
              <span>Email</span>
              <span className="email-hint">
                {copied ? 'email copiado' : 'clique para copiar'}
              </span>
            </button>
            <a
              className="linkedin-button"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir LinkedIn de João Lauffer"
            >
              <span aria-hidden="true">in</span>
            </a>
            </div>
              <div className="thumbnail-carousel" aria-label="Thumbnails dos vídeos">
                <div className="thumbnail-track">
                  {[...allVideos, ...allVideos].map((video, index) => (
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noreferrer"
                      key={`${video.id}-${index}`}
                    >
                      <img
                        src={youtubeThumb(video.id)}
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
