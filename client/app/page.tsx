import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Typewriter from "@/components/Typewriter";
import Reveal from "@/components/Reveal";
import TryMeTeaser from "@/components/TryMeTeaser";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-brand-dark text-brand-text font-sans antialiased bg-noise overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-bronze rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <Reveal className="reveal-side" delay={200}>
              <div className="inline-flex items-center gap-3 border-l-2 border-brand-bronze pl-4 mx-auto lg:mx-0">
                <span className="text-brand-bronze font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  Global Labor Intelligence
                </span>
              </div>
            </Reveal>

            <Reveal className="reveal-up" delay={400}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                Bridging the gap between <br />
                <Typewriter words={["Blue-Collar", "White-Collar", "New-Collar"]} />
              </h1>
            </Reveal>

            <Reveal className="reveal-up" delay={600}>
              <p className="text-base md:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                The world&apos;s first AI engine that maps your inherent skills to the global labor market. From
                construction sites to codebases, we find where you truly belong.
              </p>
            </Reveal>

            <Reveal className="reveal-up" delay={800}>
              <div className="flex flex-col gap-6 items-center lg:items-start pt-4">
                <TryMeTeaser />
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/signup"
                    className="px-8 py-4 bg-brand-bronze hover:bg-brand-bronze-hover text-white font-bold rounded-sm transition duration-300 shadow-xl hover:-translate-y-1 text-sm uppercase tracking-wider"
                  >
                    Start Assessment
                  </Link>
                  <Link
                    href="#sectors"
                    className="px-8 py-4 border border-brand-card hover:border-brand-bronze text-brand-text hover:text-white font-bold rounded-sm transition duration-300 text-sm uppercase tracking-wider"
                  >
                    Explore Data
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="reveal-up" delay={1000}>
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-brand-card border border-brand-card rounded-sm shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-20"></div>

              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80"
                alt="Industrial Tech"
                fill
                className="object-cover opacity-60 mix-blend-overlay grayscale group-hover:grayscale-0 transition duration-[2s] scale-100 group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6 z-30">
                <div className="bg-brand-dark/90 backdrop-blur p-6 border-l-4 border-brand-bronze shadow-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-brand-bronze text-[10px] font-bold uppercase tracking-widest">
                      Analysis Complete
                    </p>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                  </div>
                  <p className="text-white font-mono text-sm md:text-base">Skill Vector: Spatial Awareness + Logic</p>
                  <div className="w-full bg-brand-card h-1 mt-3 mb-1">
                    <div className="bg-brand-bronze h-1 w-[92%]"></div>
                  </div>
                  <p className="text-brand-muted text-[10px] text-right">Match: 92% (Robotics Field Tech)</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-brand-card border-y border-brand-surface stats-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Industries Mapped", value: "500+" },
            { label: "Career Transitions", value: "50k+" },
            { label: "Placement Accuracy", value: "98%" },
            { label: "Data Coverage", value: "Global" },
          ].map((stat, i) => (
            <Reveal key={i} className="reveal-up" delay={i * 100}>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 md:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal className="reveal-side">
              <span className="text-brand-bronze font-bold tracking-[0.2em] uppercase text-xs block mb-4">
                The Engine
              </span>
            </Reveal>
            <Reveal className="reveal-up" delay={200}>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Competency over Credentials</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Deep Discovery",
                icon: "fa-fingerprint",
                desc: "Our AI doesn't ask for your resume. It engages in a diagnostic conversation to understand your logic, spatial reasoning, and preferences.",
              },
              {
                title: "2. Vector Mapping",
                icon: "fa-network-wired",
                desc: "We convert your skills into mathematical vectors and match them against millions of job requirements across the globe.",
              },
              {
                title: "3. The Bridge",
                icon: "fa-route",
                desc: "Receive a step-by-step roadmap detailing the exact certifications and projects needed to pivot to your new high-value career.",
              },
            ].map((method, i) => (
              <Reveal key={i} className="reveal-up" delay={i * 200}>
                <div className="bg-brand-card h-full p-8 md:p-10 border border-brand-surface hover:border-brand-bronze transition duration-500 group">
                  <div className="w-12 h-12 bg-brand-dark border border-brand-surface flex items-center justify-center mb-8 text-brand-bronze group-hover:bg-brand-bronze group-hover:text-white transition duration-500">
                    <i className={`fa-solid ${method.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{method.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{method.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-24 bg-brand-surface/50 border-y border-brand-surface">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="reveal-side">
            <div className="space-y-6">
              <span className="text-brand-bronze font-bold tracking-[0.2em] uppercase text-xs block">Our Reach</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Universal Coverage</h2>
              <p className="text-brand-muted text-lg font-light mb-8">
                We don't just serve tech. We serve the economy. Our data pipelines digest requirements from the most
                critical sectors driving global growth.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "fa-solar-panel", label: "Renewable Energy" },
                  { icon: "fa-microchip", label: "Advanced Tech" },
                  { icon: "fa-trowel-bricks", label: "Civil Infrastructure" },
                  { icon: "fa-robot", label: "Manufacturing" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-brand-dark border border-brand-surface">
                    <i className={`fa-solid ${item.icon} text-brand-bronze`}></i>
                    <span className="text-sm font-bold text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="reveal-up" delay={400}>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden opacity-80 hover:opacity-100 transition duration-500">
                <Image
                  src="/office1.jpg"
                  alt="Industrial Sector"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden opacity-80 hover:opacity-100 transition duration-500 translate-y-8">
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
                  alt="Tech Sector"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 bg-brand-dark">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="reveal-up text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why We Are Different</h2>
          </Reveal>

          <Reveal className="reveal-up" delay={200}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-6 border-b border-brand-surface text-brand-muted text-xs uppercase tracking-widest w-1/3">
                      Features
                    </th>
                    <th className="p-6 border-b border-brand-surface text-brand-muted text-xs uppercase tracking-widest w-1/3">
                      Traditional Boards
                    </th>
                    <th className="p-6 border-b border-brand-bronze bg-brand-card/50 text-brand-bronze text-xs uppercase tracking-widest w-1/3">
                      Pathfinder AI
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-brand-text">
                  {[
                    { feature: "Matching Logic", trad: "Keyword Matching (Job Titles)", path: "Deep Skill Vectors" },
                    { feature: "Career Scope", trad: "Siloed (Tech vs. Labor)", path: "Universal (Cross-Industry)" },
                    { feature: "Guidance", trad: "Zero / Passive Search", path: "Active AI Mentorship" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-6 border-b border-brand-surface font-bold">{row.feature}</td>
                      <td className="p-6 border-b border-brand-surface text-brand-muted">{row.trad}</td>
                      <td className="p-6 border-b border-brand-surface bg-brand-card/20 text-white font-bold">
                        {row.path}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-brand-card border-t border-brand-surface overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
          <Reveal className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Stop Guessing. <br /> Start Navigating.
            </h2>
          </Reveal>
          <Reveal className="reveal-up" delay={200}>
            <p className="text-lg text-brand-muted font-light">Your potential is not defined by your past job titles.</p>
          </Reveal>
          <Reveal className="reveal-up" delay={400}>
            <div className="pt-6">
              <Link
                href="/signup"
                className="inline-block px-12 py-5 bg-brand-bronze hover:bg-brand-bronze-hover text-white text-sm font-bold uppercase tracking-widest rounded-sm transition duration-300 shadow-[0_0_20px_rgba(192,160,98,0.2)] hover:shadow-[0_0_30px_rgba(192,160,98,0.4)] hover:-translate-y-1"
              >
                Initialize Assessment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
