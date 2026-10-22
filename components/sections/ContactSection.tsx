'use client'

import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '@/app/content'
import MagneticButton from '@/components/ui/MagneticButton'
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Sparkles,
} from 'lucide-react'

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Web Engineering',
    budget: '$25k - $50k',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const footerWordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const wordmark = footerWordmarkRef.current
    if (!wordmark) return

    gsap.fromTo(
      wordmark,
      { yPercent: 35, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: wordmark,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    )
  }, [])

  const servicesList = [
    'Web Engineering',
    'Mobile Experience',
    'AI Solutions',
    'UI/UX & 3D Design',
    'Cloud & DevOps',
  ]

  const budgetOptions = ['<$15k', '$15k - $30k', '$30k - $60k', '$60k+']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate instant transmission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#EC4899', '#0891B2', '#F472B6', '#FFFFFF'],
        })
      } catch (err) {
        // Fallback gracefully
      }

      // Reset form
      setFormState({
        name: '',
        email: '',
        service: 'Web Engineering',
        budget: '$25k - $50k',
        message: '',
      })
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-400" />
      case 'website':
        return <Globe className="w-5 h-5 text-cyan-400" />
      case 'github':
        return <Github className="w-5 h-5 text-white" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-blue-400" />
      default:
        return <Sparkles className="w-5 h-5 text-primary" />
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#080C14] text-white overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Huge Climax Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              08 // INITIATE &bull; SECURE YOUR TIMELINE
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 leading-tight">
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Unforgettable.
            </span>
          </h2>
          <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            {siteContent.contact.subtitle}
          </p>
        </div>

        {/* Contact Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h3 className="font-display font-black text-2xl text-white">
                Engineering Studio HQ
              </h3>
              <p className="font-body text-slate-400 text-sm leading-relaxed">
                Whether you need a full greenfield product built from scratch or an award-winning 3D web experience, our core team handles engineering end-to-end.
              </p>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{siteContent.contact.availability}</span>
              </div>

              {/* Details List */}
              <div className="space-y-3.5 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="hover:text-primary transition-colors cursor-pointer font-mono font-bold text-white underline decoration-primary/40 underline-offset-4"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a
                    href={siteContent.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors cursor-pointer font-mono font-bold text-slate-200"
                  >
                    {siteContent.contact.website}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <a
                    href={siteContent.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors cursor-pointer font-mono text-slate-200"
                  >
                    @brocodesorg
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>{siteContent.contact.location}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Avg. Turnaround: Under 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Social Links with Direct Hyperlinks */}
            <div>
              <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">
                OFFICIAL CHANNELS:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {siteContent.socials.map((social) => (
                  <MagneticButton
                    key={social.name}
                    asLink
                    href={social.url}
                    strength={12}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 text-slate-300 hover:text-white transition-all shadow-sm text-xs font-mono font-semibold"
                  >
                    {getSocialIcon(social.platform)}
                    <span>{social.name}</span>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 backdrop-blur-md hover:border-primary/30 transition-colors shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white">
                    Transmission Received!
                  </h4>
                  <p className="font-body text-slate-400 text-sm max-w-md mx-auto">
                    Your brief has been decrypted by the BROCODES core team. We will review your requirements and reach out via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Alex Hunter"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 text-white placeholder-slate-500 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 text-white placeholder-slate-500 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Required Capability Selector */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                      Primary Service Needed
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {servicesList.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() =>
                            setFormState({ ...formState, service })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            formState.service === service
                              ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(236,72,153,0.4)]'
                              : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Budget Selector */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {budgetOptions.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormState({ ...formState, budget })}
                          className={`py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer text-center ${
                            formState.budget === budget
                              ? 'bg-accent text-white border-accent shadow-[0_0_10px_rgba(8,145,178,0.4)]'
                              : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                      Project Goals &amp; Scope *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Brief overview of your product, timeline, goals, and reference links..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    strength={20}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING BRIEF...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND PROJECT TRANSMISSION</span>
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Giant Wordmark Revealing on Scroll */}
        <footer className="pt-12 border-t border-white/10 relative">
          {/* Giant Outline Wordmark */}
          <div
            ref={footerWordmarkRef}
            className="w-full text-center overflow-hidden pointer-events-none select-none my-6"
          >
            <div className="font-display font-black text-[14vw] leading-none text-transparent tracking-tighter text-outline-dark opacity-35 hover:opacity-50 transition-opacity">
              {siteContent.company.name}
            </div>
          </div>

          {/* Footer Sub-bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-6 border-t border-white/5">
            <div>{siteContent.footer.copyright}</div>
            <div className="flex items-center gap-6">
              <a
                href={siteContent.company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold"
              >
                BROCODES.SPACE
              </a>
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors cursor-pointer"
              >
                <span>TOP</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
