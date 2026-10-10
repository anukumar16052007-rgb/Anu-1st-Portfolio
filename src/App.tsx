import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Menu,
  Phone,
  Send,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { RESUME_DATA, ProjectItem, CertificationItem } from './data/resumeData';
import { CustomCursor } from './components/CustomCursor';
import { TiltCard } from './components/TiltCard';
import { HeroNeuralCore } from './components/HeroNeuralCore';
import { RoadHazardVisual, PlacementReadinessVisual } from './components/ProjectIllustrations';
import { ResumeDocumentModal } from './components/ResumeDocumentModal';

type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'leadership'
  | 'activities'
  | 'contact';

const ALL_NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
];

// Top Bar Contract uses 5 primary links; the secondary sub-bar & mobile menu expose all 10 sections
const TOP_BAR_LINKS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Filters
  const [skillFilter, setSkillFilter] = useState<
    'all' | 'programming' | 'frontend' | 'data' | 'tools-soft'
  >('all');
  const [certFilter, setCertFilter] = useState<'all' | 'technical' | 'communication'>('all');

  // Interactive Modals
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Copy states
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'message' | null>(null);

  // Contact form state (constructs a real mailto draft or clipboard copy)
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'ready'>('idle');

  // Scroll Progress & Active Section Observer
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    ALL_NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedCert(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = async (text: string, type: 'email' | 'phone' | 'message') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(type);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback if clipboard permission is restricted
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedField(type);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!senderName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!senderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!senderMessage.trim() || senderMessage.trim().length < 10) {
      setFormError('Please enter a message of at least 10 characters.');
      return;
    }

    setFormStatus('ready');
    const subjectLine = encodeURIComponent(
      senderSubject.trim() || `Portfolio Inquiry from ${senderName.trim()}`
    );
    const bodyText = encodeURIComponent(
      `Hello ANU K,\n\n${senderMessage.trim()}\n\nBest regards,\n${senderName.trim()}\n${senderEmail.trim()}`
    );
    window.location.href = `mailto:${RESUME_DATA.personal.contact.email}?subject=${subjectLine}&body=${bodyText}`;
  };

  const filteredSkillGroups =
    skillFilter === 'all'
      ? RESUME_DATA.skillGroups
      : RESUME_DATA.skillGroups.filter((group) => group.filterGroup === skillFilter);

  const filteredCertifications =
    certFilter === 'all'
      ? RESUME_DATA.certifications
      : RESUME_DATA.certifications.filter((cert) => cert.category === certFilter);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#F97316]/30 selection:text-[#FB923C]">
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#171717]"
      >
        <div
          className="h-full bg-[#F97316] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Primary Top Bar following the strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[#292929] bg-[#080808]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
          >
            ANU K
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A3A3A3]"
          >
            {TOP_BAR_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316] ${
                    isActive ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#F97316]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (+ mobile menu button on small viewports) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="rounded-lg bg-[#F97316] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#FB923C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
            >
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle full section navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#292929] bg-[#101010] text-white transition-colors hover:border-[#F97316] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Desktop Complete Section Jump Strip (All 10 required sections accessible on 1 line) */}
        <div className="hidden lg:block border-t border-[#292929]/60 bg-[#080808]/95">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
            <div className="flex items-center gap-6 overflow-x-auto">
              {ALL_NAV_SECTIONS.map((sec, idx) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-1.5 py-0.5 transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'font-semibold text-[#FB923C]'
                        : 'text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    <span className="font-mono-tabular text-[10px] text-[#F97316]/80">
                      0{idx + 1 === 10 ? '' : ''}{idx + 1}.
                    </span>
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="text-xs font-medium text-[#A3A3A3] transition-colors hover:text-[#FB923C] whitespace-nowrap shrink-0"
            >
              View Printable CV
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer (All 10 sections) */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Section Navigation"
            className="border-t border-[#292929] bg-[#101010] px-6 py-4 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ALL_NAV_SECTIONS.map((sec, idx) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[#F97316] bg-[#F97316]/10 text-white'
                        : 'border-[#292929] bg-[#171717] text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    <span className="font-mono-tabular text-[#F97316]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ============================================================
            1. HERO SECTION (#home)
        ============================================================ */}
        <section
          id="home"
          className="relative overflow-hidden border-b border-[#292929] bg-[#080808] bg-tech-grid pt-12 pb-20 lg:pt-16 lg:pb-24"
        >
          {/* Subtle Ambient Orange Illumination */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#F97316]/10 blur-[130px]"
          />

          <div className="mx-auto max-w-7xl px-6">
            {/* Split-Screen Hero */}
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
              {/* Left Column: Typographic Hierarchy & CTAs */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#FB923C]">
                    Aspiring Full Stack Developer · B.Sc. Computer Science (AI & Data Science) Student
                  </p>

                  <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-white headline-balance">
                    ANU K
                  </h1>

                  <p className="mt-3 font-display text-xl font-medium text-[#E5E5E5] sm:text-2xl headline-balance">
                    Building responsive full stack web applications and intelligent data-driven platforms.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A3A3A3]">
                    “{RESUME_DATA.personal.careerObjective}”
                  </p>
                </div>

                {/* Primary & Secondary Action Controls */}
                <div className="mt-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-[#FB923C] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Explore My Projects</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#101010] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#F97316] hover:text-[#FB923C] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Mail className="h-4 w-4 text-[#F97316]" />
                      <span>Contact Me</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setResumeModalOpen(true)}
                      className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#171717] px-4 py-3 text-sm font-medium text-[#D4D4D4] transition-colors hover:border-[#F97316]/60 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileText className="h-4 w-4 text-[#F97316]" />
                      <span>Printable Resume</span>
                    </button>
                  </div>

                  {/* Direct Verified Links Bar (Unboxed clean metadata + interactive links) */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#292929] pt-5 text-xs text-[#A3A3A3]">
                    <a
                      href={RESUME_DATA.personal.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-medium text-white transition-colors hover:text-[#FB923C] whitespace-nowrap shrink-0"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#F97316]" />
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={RESUME_DATA.personal.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-medium text-white transition-colors hover:text-[#FB923C] whitespace-nowrap shrink-0"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#F97316]" />
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={RESUME_DATA.personal.contact.emailHref}
                      className="font-mono-tabular transition-colors hover:text-white whitespace-nowrap shrink-0"
                    >
                      {RESUME_DATA.personal.contact.email}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={RESUME_DATA.personal.contact.phoneHref}
                      className="font-mono-tabular transition-colors hover:text-white whitespace-nowrap shrink-0"
                    >
                      +91 {RESUME_DATA.personal.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D Neural Core & Typographic Portrait */}
              <div className="lg:col-span-5">
                <HeroNeuralCore />
              </div>
            </div>

            {/* Full-Width Key Proof Strip Below Hero Split */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[#292929] pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[#292929] bg-[#101010] p-5">
                <p className="text-xs text-[#A3A3A3]">Current Undergraduate Degree</p>
                <p className="mt-1 font-mono-tabular text-2xl font-bold text-[#F97316]">
                  69.45%
                </p>
                <p className="mt-1 text-xs text-white">
                  B.Sc. Computer Science (AI & Data Science) · 2024 – Pursuing
                </p>
              </div>

              <div className="rounded-xl border border-[#292929] bg-[#101010] p-5">
                <p className="text-xs text-[#A3A3A3]">Full Stack Internship</p>
                <p className="mt-1 font-display text-lg font-bold text-white">
                  Viz Web Solutions
                </p>
                <p className="mt-1 font-mono-tabular text-xs text-[#FB923C]">
                  May 2026 – July 2026 · Tiruppur
                </p>
              </div>

              <div className="rounded-xl border border-[#292929] bg-[#101010] p-5">
                <p className="text-xs text-[#A3A3A3]">Featured Web & AI Systems</p>
                <p className="mt-1 font-mono-tabular text-2xl font-bold text-white">
                  02 Systems
                </p>
                <p className="mt-1 text-xs text-[#A3A3A3]">
                  Civic Hazard Management · AI Placement Readiness
                </p>
              </div>

              <div className="rounded-xl border border-[#292929] bg-[#101010] p-5">
                <p className="text-xs text-[#A3A3A3]">Credentials & Leadership</p>
                <p className="mt-1 font-mono-tabular text-2xl font-bold text-[#FB923C]">
                  07 Certificates
                </p>
                <p className="mt-1 text-xs text-white">
                  Student Voice President – JCI · Karate Black Belt
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. ABOUT ME SECTION (#about)
        ============================================================ */}
        <section
          id="about"
          className="border-b border-[#292929] bg-[#080808] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
              {/* Left Column: Editorial Introduction & Career Objective */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-xs font-medium text-[#F97316]">01. About ANU K</p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl headline-balance">
                    Driven by Full Stack Engineering, Artificial Intelligence, and Real-World Problem Solving
                  </h2>
                </div>

                <p className="text-base leading-relaxed text-[#D4D4D4]">
                  I am <strong className="font-semibold text-white">ANU K</strong>, a{' '}
                  <strong className="font-semibold text-white">
                    Bachelor of Computer Science (Artificial Intelligence &amp; Data Science)
                  </strong>{' '}
                  student at{' '}
                  <span className="text-white">
                    Shree Venkateshwara Arts and Science College, Tiruppur
                  </span>{' '}
                  (2024 – Pursuing, currently holding 69.45%).
                </p>

                <p className="text-base leading-relaxed text-[#A3A3A3]">
                  My technical journey combines foundational programming in Python (Basic),
                  JavaScript, and SQL with practical web application development using HTML, CSS,
                  Django, Node.js, Express.js, and MySQL. Through my Full Stack Development
                  Internship at <span className="text-white">Viz Web Solutions, Tiruppur</span>, and
                  hands-on academic projects, I focus on designing responsive, multi-dashboard web
                  platforms that address practical civic and educational challenges.
                </p>

                {/* Career Objective Callout Card (All-around hairline border, no thick left stripe) */}
                <div className="rounded-2xl border border-[#292929] bg-[#101010] p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FB923C]">
                    Documented Career Objective
                  </p>
                  <blockquote className="mt-3 text-sm leading-relaxed text-white">
                    “{RESUME_DATA.personal.careerObjective}”
                  </blockquote>
                </div>
              </div>

              {/* Right Column: Core Pillars & Languages Known */}
              <div className="lg:col-span-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TiltCard className="p-6">
                  <GraduationCap className="h-5 w-5 text-[#F97316]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    AI &amp; Data Science Foundation
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                    Pursuing B.Sc. Computer Science (Artificial Intelligence &amp; Data Science) at
                    Shree Venkateshwara Arts and Science College, Tiruppur, complemented by the
                    Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate credential.
                  </p>
                </TiltCard>

                <TiltCard className="p-6">
                  <Code2 className="h-5 w-5 text-[#F97316]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    Full Stack Web Development
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                    Practical internship training at Viz Web Solutions developing responsive web
                    applications with HTML, CSS, JavaScript, and Django, with experience in backend
                    integration and project deployment.
                  </p>
                </TiltCard>

                <TiltCard className="p-6">
                  <Layers className="h-5 w-5 text-[#F97316]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    Multi-Dashboard Architecture
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                    Built role-specific web portals for Citizens and Government officials in the
                    Road Hazard Complaint Management System, and for Students, Faculty, Admin, and
                    Companies in the AI Placement Readiness Platform.
                  </p>
                </TiltCard>

                <TiltCard className="p-6">
                  <Users className="h-5 w-5 text-[#F97316]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    Student Leadership &amp; Discipline
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                    Served as Student Voice President – JCI coordinating student events with
                    faculty, alongside earning the 2023 District Karate Championship and a Karate
                    Black Belt.
                  </p>
                </TiltCard>

                {/* Spoken Languages Card spanning 2 columns */}
                <div className="sm:col-span-2 rounded-2xl border border-[#292929] bg-[#101010] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-5 w-5 text-[#F97316]" />
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">
                          Languages Known
                        </h3>
                        <p className="text-xs text-[#A3A3A3]">
                          Multilingual communication across regional and professional environments
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      {RESUME_DATA.languages.map((lang) => (
                        <div key={lang.name} className="text-left">
                          <p className="font-display text-sm font-semibold text-white">
                            {lang.name}
                          </p>
                          <p className="text-xs text-[#FB923C]">{lang.script}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. TECHNICAL SKILLS SECTION (#skills)
        ============================================================ */}
        <section
          id="skills"
          className="border-b border-[#292929] bg-[#080808] bg-tech-grid py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#F97316]">02. Technical &amp; Soft Skills</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Documented Capabilities &amp; Tooling
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#A3A3A3]">
                  Every programming language, framework, frontend technology, database, enterprise
                  software, development tool, and soft skill documented in ANU K’s resume.
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter skills by category"
                className="flex flex-wrap items-center gap-1 rounded-xl border border-[#292929] bg-[#101010] p-1.5"
              >
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'programming', label: 'Programming & Framework' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'data', label: 'Database & Software' },
                  { id: 'tools-soft', label: 'Tools & Soft Skills' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={skillFilter === tab.id}
                    onClick={() => setSkillFilter(tab.id as any)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      skillFilter === tab.id
                        ? 'bg-[#F97316] text-black font-semibold'
                        : 'text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Category Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredSkillGroups.map((group, idx) => (
                <TiltCard key={group.id} className="flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                      <span className="font-mono-tabular text-xs font-medium text-[#F97316]">
                        0{idx + 1}
                      </span>
                      <span className="text-xs text-[#A3A3A3]">
                        {group.skills.length} {group.skills.length === 1 ? 'Skill' : 'Skills'}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-white">
                      {group.category}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#A3A3A3]">
                      {group.description}
                    </p>

                    <div className="mt-5 space-y-3">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-xl border border-[#292929] bg-[#171717] p-3.5 transition-colors hover:border-[#F97316]/50"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-sm font-semibold text-white">
                              {skill.name}
                            </span>
                            {skill.note && (
                              <span className="font-mono-tabular text-[11px] text-[#FB923C]">
                                {skill.note} Level
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-[#A3A3A3]">
                            {skill.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. FEATURED PROJECTS SECTION (#projects)
        ============================================================ */}
        <section
          id="projects"
          className="border-b border-[#292929] bg-[#080808] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#F97316]">03. Featured Projects</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Documented Full Stack &amp; AI Systems
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#A3A3A3]">
                  Interactive showcase of ANU K’s web-based platforms. Switch between role
                  dashboards inside each visual preview or open the full specification modal.
                </p>
              </div>

              <a
                href={RESUME_DATA.personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-[#101010] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#F97316] hover:text-[#FB923C] whitespace-nowrap shrink-0"
              >
                <FolderGit2 className="h-4 w-4 text-[#F97316]" />
                <span>View GitHub Profile ({RESUME_DATA.personal.contact.githubHandle})</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {RESUME_DATA.projects.map((project) => (
                <TiltCard
                  key={project.id}
                  intensity={4}
                  className="flex flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    {/* Top Metadata Line (Clean unboxed text with separators) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A3A3A3]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#F97316]">
                          Project {project.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>
                      <span className="font-mono-tabular text-[#FB923C]">
                        {project.dashboards.length} Role Dashboards
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="mt-3 font-display text-2xl font-bold text-white">
                      {project.title}
                    </h3>

                    {/* Interactive Custom CSS/SVG Illustration */}
                    <div className="mt-5">
                      {project.id === 'road-hazard-system' ? (
                        <RoadHazardVisual />
                      ) : (
                        <PlacementReadinessVisual />
                      )}
                    </div>

                    {/* Exact Documented Description */}
                    <p className="mt-5 text-sm leading-relaxed text-[#D4D4D4]">
                      {project.description}
                    </p>

                    {/* Documented Technologies (Clean unboxed inline metadata) */}
                    <div className="mt-5 border-t border-[#292929] pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                        Documented Technologies
                      </p>
                      <p className="mt-1.5 font-mono-tabular text-xs text-[#FB923C]">
                        {project.technologies.join(' · ')}
                      </p>
                    </div>

                    {/* Documented Features Grid */}
                    <div className="mt-4 border-t border-[#292929] pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                        Documented Features ({project.features.length})
                      </p>
                      <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs text-[#D4D4D4]">
                        {project.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#292929] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#FB923C] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Inspect System Architecture</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href={RESUME_DATA.personal.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A3A3A3] transition-colors hover:text-white whitespace-nowrap shrink-0"
                    >
                      <span>Author GitHub Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#F97316]" />
                    </a>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            5. INTERNSHIP EXPERIENCE SECTION (#experience)
        ============================================================ */}
        <section
          id="experience"
          className="border-b border-[#292929] bg-[#080808] bg-tech-grid py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F97316]">04. Internship Experience</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Professional Training &amp; Industry Experience
              </h2>
              <p className="mt-2 text-sm text-[#A3A3A3]">
                Practical full stack development training and web application deployment experience.
              </p>
            </div>

            <div className="mt-10">
              <TiltCard intensity={3} className="p-6 sm:p-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  {/* Left Timeline Column */}
                  <div className="lg:col-span-4 flex flex-col justify-between border-b border-[#292929] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FB923C]">
                        <Briefcase className="h-4 w-4 text-[#F97316]" />
                        <span>Internship Role</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold text-white">
                        {RESUME_DATA.internship.position}
                      </h3>
                      <p className="mt-1 text-base font-medium text-[#E5E5E5]">
                        {RESUME_DATA.internship.company}
                      </p>
                    </div>

                    <div className="mt-6 space-y-2 border-t border-[#292929] pt-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#A3A3A3]">Duration</span>
                        <span className="font-mono-tabular font-semibold text-[#FB923C]">
                          {RESUME_DATA.internship.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#A3A3A3]">Location</span>
                        <span className="text-white">Tiruppur</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Responsibilities & Stack Column */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                    <div>
                      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#A3A3A3]">
                        Documented Responsibilities &amp; Experience
                      </h4>
                      <div className="mt-4 space-y-3">
                        {RESUME_DATA.internship.responsibilities.map((resp, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3.5 rounded-xl border border-[#292929] bg-[#171717] p-4"
                          >
                            <span className="font-mono-tabular text-xs font-semibold text-[#F97316] mt-0.5">
                              0{index + 1}
                            </span>
                            <p className="text-sm leading-relaxed text-white">{resp}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#292929] pt-4 text-xs">
                      <span className="text-[#A3A3A3]">Technologies Utilized During Internship:</span>
                      <span className="font-mono-tabular font-semibold text-[#FB923C]">
                        {RESUME_DATA.internship.technologies.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. EDUCATIONAL QUALIFICATIONS SECTION (#education)
        ============================================================ */}
        <section
          id="education"
          className="border-b border-[#292929] bg-[#080808] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F97316]">05. Educational Qualifications</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Academic Timeline &amp; Verified Records
              </h2>
              <p className="mt-2 text-sm text-[#A3A3A3]">
                Complete educational progression preserving exact percentages, years, and
                institutions.
              </p>
            </div>

            <div className="relative mt-12 space-y-6">
              {RESUME_DATA.education.map((edu, index) => (
                <TiltCard
                  key={edu.id}
                  intensity={3}
                  className={`p-6 sm:p-8 ${
                    edu.highlight ? 'border-[#F97316]/60 bg-[#101010]' : 'bg-[#101010]'
                  }`}
                >
                  <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
                    {/* Index & Duration */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                        <span className="font-mono-tabular font-semibold text-[#F97316]">
                          0{index + 1}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{edu.qualification}</span>
                      </div>
                      <p className="mt-2 font-mono-tabular text-lg font-bold text-white">
                        {edu.duration}
                      </p>
                      <p className="mt-0.5 text-xs text-[#FB923C]">{edu.status}</p>
                    </div>

                    {/* Course & Institution */}
                    <div className="lg:col-span-6">
                      <h3 className="font-display text-xl font-bold text-white">
                        {edu.course}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#D4D4D4]">{edu.institution}</p>
                    </div>

                    {/* Academic Percentage */}
                    <div className="lg:col-span-3 flex flex-col lg:items-end justify-center border-t border-[#292929] pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
                      <span className="text-xs text-[#A3A3A3]">
                        {edu.highlight ? 'Current Percentage' : 'Academic Percentage'}
                      </span>
                      <span className="mt-1 font-mono-tabular text-3xl font-bold text-[#F97316]">
                        {edu.percentage}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            7. CERTIFICATIONS SECTION (#certifications)
        ============================================================ */}
        <section
          id="certifications"
          className="border-b border-[#292929] bg-[#080808] bg-tech-grid py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#F97316]">06. Certifications &amp; Events</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Verified Certifications &amp; Symposium Participations
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#A3A3A3]">
                  All seven documented certifications and participation records across Oracle
                  University, Naan Mudhalvan Scheme (TNSDC), Edunet IBM Skills Build, VET Institute
                  of Arts and Science, TERF Academy, and JCI.
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter certifications"
                className="flex flex-wrap items-center gap-1 rounded-xl border border-[#292929] bg-[#101010] p-1.5"
              >
                {[
                  { id: 'all', label: 'All Entries (7)' },
                  { id: 'technical', label: 'Web, AI & Technical (4)' },
                  { id: 'communication', label: 'Communication & Fests (3)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={certFilter === tab.id}
                    onClick={() => setCertFilter(tab.id as any)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      certFilter === tab.id
                        ? 'bg-[#F97316] text-black font-semibold'
                        : 'text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertifications.map((cert) => (
                <TiltCard
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="flex cursor-pointer flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#292929] pb-3 text-xs text-[#A3A3A3]">
                      <span className="font-mono-tabular font-semibold text-[#F97316]">
                        #{cert.index}
                      </span>
                      <span className="font-mono-tabular text-[#FB923C]">{cert.date}</span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-white leading-snug">
                      {cert.title}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#E5E5E5]">{cert.issuer}</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#A3A3A3]">{cert.summary}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#292929] pt-3 text-xs">
                    <span className="text-[#A3A3A3]">{cert.type} Record</span>
                    <span className="flex items-center gap-1 font-medium text-[#FB923C]">
                      <span>Inspect Details</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            8. VOLUNTEERING & LEADERSHIP SECTION (#leadership)
        ============================================================ */}
        <section
          id="leadership"
          className="border-b border-[#292929] bg-[#080808] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F97316]">07. Volunteering &amp; Leadership</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Student Representation &amp; Event Coordination
              </h2>
            </div>

            <div className="mt-10">
              <TiltCard intensity={3} className="p-6 sm:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FB923C]">
                      <Award className="h-4 w-4 text-[#F97316]" />
                      <span>Leadership Appointment</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {RESUME_DATA.leadership.role}
                    </h3>
                    <p className="text-sm text-[#A3A3A3]">
                      {RESUME_DATA.leadership.organization}
                    </p>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {RESUME_DATA.leadership.activities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-between rounded-xl border border-[#292929] bg-[#171717] p-5"
                      >
                        <span className="font-mono-tabular text-xs font-semibold text-[#F97316]">
                          Responsibility 0{idx + 1}
                        </span>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-white">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ============================================================
            9. CO-CURRICULAR ACTIVITIES, LANGUAGES & DECLARATION (#activities)
        ============================================================ */}
        <section
          id="activities"
          className="border-b border-[#292929] bg-[#080808] bg-tech-grid py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F97316]">
                08. Co-Curricular Activities &amp; Achievements
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Championships, Cultural Arts &amp; Personal Interests
              </h2>
              <p className="mt-2 text-sm text-[#A3A3A3]">
                Athletic discipline, stage performance, and creative craftsmanship outside the
                classroom.
              </p>
            </div>

            {/* 3 Activity Cards */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {RESUME_DATA.activities.map((act, index) => (
                <TiltCard
                  key={act.id}
                  className={`flex flex-col justify-between p-6 ${
                    act.id === 'karate' ? 'border-[#F97316]/60' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#292929] pb-3 text-xs text-[#A3A3A3]">
                      <span className="font-mono-tabular font-semibold text-[#F97316]">
                        0{index + 1} · {act.category}
                      </span>
                      {act.id === 'karate' ? (
                        <Trophy className="h-4 w-4 text-[#F97316]" />
                      ) : act.id === 'dance' ? (
                        <Sparkles className="h-4 w-4 text-[#F97316]" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-[#F97316]" />
                      )}
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold text-white">
                      {act.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#FB923C]">{act.subtitle}</p>

                    <ul className="mt-5 space-y-2.5">
                      {act.highlights.map((item, i) => (
                        <li
                          key={i}
                          className="rounded-xl border border-[#292929] bg-[#171717] px-4 py-3 text-sm font-medium text-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Languages Known & Discreet Declaration Row */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Languages Known */}
              <div className="rounded-2xl border border-[#292929] bg-[#101010] p-6 lg:col-span-6">
                <p className="text-xs font-medium text-[#F97316]">09. Languages Known</p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  Documented Languages
                </h3>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {RESUME_DATA.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="rounded-xl border border-[#292929] bg-[#171717] p-4 text-center"
                    >
                      <p className="font-display text-base font-bold text-white">{lang.name}</p>
                      <p className="mt-1 text-xs text-[#FB923C]">{lang.script}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discreet Resume Declaration */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#292929] bg-[#101010] p-6 lg:col-span-6">
                <div>
                  <p className="text-xs font-medium text-[#A3A3A3]">10. Formal Resume Declaration</p>
                  <p className="mt-3 text-sm italic leading-relaxed text-[#D4D4D4]">
                    “{RESUME_DATA.declaration.text}”
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#292929] pt-4 text-xs text-[#A3A3A3]">
                  <div className="flex items-center gap-4">
                    <span>Date: —</span>
                    <span aria-hidden="true">·</span>
                    <span>Place: —</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-semibold text-white">
                      Signature: {RESUME_DATA.personal.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            10. CONTACT SECTION (#contact)
        ============================================================ */}
        <section id="contact" className="bg-[#080808] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Direct Verified Contact Channels */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-medium text-[#F97316]">11. Contact &amp; Connect</p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Get in Touch with ANU K
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                    Seeking entry-level Full Stack Development, Web Development, and AI &amp; Data
                    Science opportunities where I can apply my technical knowledge and contribute to
                    organizational success.
                  </p>
                </div>

                {/* Verified Contact Cards */}
                <div className="space-y-3.5">
                  {/* Phone */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#292929] bg-[#171717] text-[#F97316]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#A3A3A3]">Phone</p>
                        <a
                          href={RESUME_DATA.personal.contact.phoneHref}
                          className="font-mono-tabular text-sm font-semibold text-white hover:text-[#FB923C]"
                        >
                          {RESUME_DATA.personal.contact.phone}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(RESUME_DATA.personal.contact.phone, 'phone')}
                      className="flex items-center gap-1.5 rounded-lg border border-[#292929] bg-[#171717] px-3 py-1.5 text-xs font-medium text-[#D4D4D4] transition-colors hover:border-[#F97316] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#F97316]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#292929] bg-[#171717] text-[#F97316]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#A3A3A3]">Email</p>
                        <a
                          href={RESUME_DATA.personal.contact.emailHref}
                          className="block truncate font-mono-tabular text-sm font-semibold text-white hover:text-[#FB923C]"
                        >
                          {RESUME_DATA.personal.contact.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(RESUME_DATA.personal.contact.email, 'email')}
                      className="flex items-center gap-1.5 rounded-lg border border-[#292929] bg-[#171717] px-3 py-1.5 text-xs font-medium text-[#D4D4D4] transition-colors hover:border-[#F97316] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#F97316]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* GitHub */}
                  <a
                    href={RESUME_DATA.personal.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4 transition-colors hover:border-[#F97316]"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#A3A3A3]">GitHub Profile</p>
                      <p className="truncate font-mono-tabular text-sm font-semibold text-white">
                        {RESUME_DATA.personal.contact.github}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#F97316]" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={RESUME_DATA.personal.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4 transition-colors hover:border-[#F97316]"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#A3A3A3]">LinkedIn Profile</p>
                      <p className="truncate font-mono-tabular text-sm font-semibold text-white">
                        {RESUME_DATA.personal.contact.linkedin}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#F97316]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Validated Direct Mailto Inquiry Composer */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-[#292929] bg-[#101010] p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-white">
                    Compose Direct Inquiry to ANU K
                  </h3>
                  <p className="mt-1 text-xs text-[#A3A3A3]">
                    Validates your details and opens your email client pre-addressed to{' '}
                    <span className="font-mono-tabular text-white">
                      {RESUME_DATA.personal.contact.email}
                    </span>
                    , or lets you copy the formatted message directly.
                  </p>

                  <form onSubmit={handleContactSubmit} className="mt-6 space-y-4" noValidate>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-[#D4D4D4]"
                        >
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => {
                            setSenderName(e.target.value);
                            setFormError(null);
                          }}
                          placeholder="Recruiter / Collaborator Name"
                          className="mt-1.5 w-full rounded-lg border border-[#292929] bg-[#080808] px-3.5 py-2.5 text-sm text-white placeholder-[#A3A3A3]/50 focus:border-[#F97316] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-[#D4D4D4]"
                        >
                          Your Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => {
                            setSenderEmail(e.target.value);
                            setFormError(null);
                          }}
                          placeholder="name@company.com"
                          className="mt-1.5 w-full rounded-lg border border-[#292929] bg-[#080808] px-3.5 py-2.5 text-sm text-white placeholder-[#A3A3A3]/50 focus:border-[#F97316] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-medium text-[#D4D4D4]"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={senderSubject}
                        onChange={(e) => setSenderSubject(e.target.value)}
                        placeholder="Full Stack Developer Role / Interview Invitation"
                        className="mt-1.5 w-full rounded-lg border border-[#292929] bg-[#080808] px-3.5 py-2.5 text-sm text-white placeholder-[#A3A3A3]/50 focus:border-[#F97316] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-[#D4D4D4]"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={senderMessage}
                        onChange={(e) => {
                          setSenderMessage(e.target.value);
                          setFormError(null);
                        }}
                        placeholder="Write your message for ANU K..."
                        className="mt-1.5 w-full rounded-lg border border-[#292929] bg-[#080808] px-3.5 py-2.5 text-sm text-white placeholder-[#A3A3A3]/50 focus:border-[#F97316] focus:outline-none"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-[#F97316] bg-[#F97316]/10 px-4 py-2.5 text-xs text-[#FB923C]"
                      >
                        {formError}
                      </div>
                    )}

                    {formStatus === 'ready' && !formError && (
                      <div
                        role="status"
                        className="rounded-lg border border-[#292929] bg-[#171717] px-4 py-3 text-xs text-white"
                      >
                        Your email client has been triggered with your message addressed to{' '}
                        <span className="font-mono-tabular text-[#FB923C]">
                          {RESUME_DATA.personal.contact.email}
                        </span>
                        . You can also copy the formatted message below.
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#FB923C] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Open in Email Client</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const formatted = `To: ${RESUME_DATA.personal.contact.email}\nFrom: ${senderName || 'Sender'} (${senderEmail || 'Email'})\nSubject: ${senderSubject || 'Portfolio Inquiry'}\n\n${senderMessage}`;
                          handleCopy(formatted, 'message');
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-[#171717] px-4 py-2.5 text-xs font-medium text-[#D4D4D4] transition-colors hover:border-[#F97316] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedField === 'message' ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#F97316]" />
                            <span>Copied Formatted Inquiry</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Inquiry Text</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          CLEAN FOOTER
      ============================================================ */}
      <footer className="border-t border-[#292929] bg-[#000000] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-base font-bold text-white">
              {RESUME_DATA.personal.name}
            </p>
            <p className="mt-1 text-xs text-[#A3A3A3]">
              {RESUME_DATA.personal.fullHeadline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A3A3A3]">
            <a
              href={RESUME_DATA.personal.contact.phoneHref}
              className="hover:text-white font-mono-tabular"
            >
              {RESUME_DATA.personal.contact.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={RESUME_DATA.personal.contact.emailHref}
              className="hover:text-white font-mono-tabular"
            >
              {RESUME_DATA.personal.contact.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={RESUME_DATA.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={RESUME_DATA.personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* ============================================================
          PROJECT ARCHITECTURE MODAL
      ============================================================ */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#292929] bg-[#101010] p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#292929] pb-4">
              <div>
                <p className="font-mono-tabular text-xs text-[#F97316]">
                  Project {selectedProject.index} · {selectedProject.category}
                </p>
                <h2
                  id="project-modal-title"
                  className="mt-1 font-display text-2xl font-bold text-white"
                >
                  {selectedProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="rounded-lg border border-[#292929] bg-[#171717] p-2 text-[#A3A3A3] hover:border-[#F97316] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {selectedProject.id === 'road-hazard-system' ? (
                <RoadHazardVisual />
              ) : (
                <PlacementReadinessVisual />
              )}

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FB923C]">
                  Documented Project Description
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#E5E5E5]">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FB923C]">
                  System Overview
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                  {selectedProject.architectureSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#292929] bg-[#171717] p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                    Documented Technologies
                  </h4>
                  <p className="mt-2 font-mono-tabular text-xs text-[#FB923C]">
                    {selectedProject.technologies.join(' · ')}
                  </p>
                </div>

                <div className="rounded-xl border border-[#292929] bg-[#171717] p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                    Dedicated Portals
                  </h4>
                  <p className="mt-2 text-xs text-white">
                    {selectedProject.dashboards.join(' · ')}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FB923C]">
                  Complete Feature Checklist
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-white">
                  {selectedProject.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#171717] px-3 py-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          CERTIFICATION DETAIL MODAL
      ============================================================ */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-[#292929] bg-[#101010] p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#292929] pb-4">
              <div>
                <p className="font-mono-tabular text-xs text-[#F97316]">
                  Entry #{selectedCert.index} · {selectedCert.type}
                </p>
                <h2
                  id="cert-modal-title"
                  className="mt-1 font-display text-xl font-bold text-white"
                >
                  {selectedCert.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certification modal"
                className="rounded-lg border border-[#292929] bg-[#171717] p-2 text-[#A3A3A3] hover:border-[#F97316] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-xl border border-[#292929] bg-[#171717] p-4">
                <p className="text-xs text-[#A3A3A3]">Issuing Organization / Event</p>
                <p className="mt-1 font-semibold text-white">{selectedCert.issuer}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#292929] bg-[#171717] p-4">
                  <p className="text-xs text-[#A3A3A3]">Documented Date</p>
                  <p className="mt-1 font-mono-tabular font-semibold text-[#FB923C]">
                    {selectedCert.date}
                  </p>
                </div>
                <div className="rounded-xl border border-[#292929] bg-[#171717] p-4">
                  <p className="text-xs text-[#A3A3A3]">Recipient</p>
                  <p className="mt-1 font-semibold text-white">{RESUME_DATA.personal.name}</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#A3A3A3]">{selectedCert.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          PRINTABLE / DOWNLOADABLE RESUME MODAL
      ============================================================ */}
      <ResumeDocumentModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
