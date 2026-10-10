import React, { useEffect } from 'react';
import { X, Printer, Mail, Phone, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDocumentModal: React.FC<ResumeDocumentModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#292929] bg-[#101010] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#292929] bg-[#080808] px-6 py-4">
          <div>
            <h2 id="resume-modal-title" className="font-display text-lg font-bold text-white">
              {RESUME_DATA.personal.name} — Curriculum Vitae
            </h2>
            <p className="text-xs text-[#A3A3A3]">
              Complete verified resume record · Ready to print or save as PDF
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-[#F97316] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#FB923C] whitespace-nowrap shrink-0"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="rounded-lg border border-[#292929] bg-[#171717] p-2 text-[#A3A3A3] transition-colors hover:border-[#F97316] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-resume-sheet"
          className="overflow-y-auto p-6 sm:p-10 space-y-6 text-sm leading-relaxed"
        >
          {/* Header Block */}
          <div className="border-b border-[#292929] pb-6">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">
              {RESUME_DATA.personal.name}
            </h1>
            <p className="mt-1 text-base font-medium text-[#FB923C]">
              {RESUME_DATA.personal.fullHeadline}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#A3A3A3] font-mono-tabular">
              <a
                href={RESUME_DATA.personal.contact.phoneHref}
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-[#F97316]" />
                <span>{RESUME_DATA.personal.contact.phone}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={RESUME_DATA.personal.contact.emailHref}
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-[#F97316]" />
                <span>{RESUME_DATA.personal.contact.email}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={RESUME_DATA.personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={RESUME_DATA.personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Career Objective */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Career Objective
            </h3>
            <p className="mt-2 text-[#E5E5E5]">{RESUME_DATA.personal.careerObjective}</p>
          </section>

          {/* Educational Qualifications */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Educational Qualifications
            </h3>
            <div className="mt-3 space-y-3">
              {RESUME_DATA.education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col justify-between border-b border-[#292929]/60 pb-2 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-semibold text-white">{edu.course}</p>
                    <p className="text-xs text-[#A3A3A3]">{edu.institution}</p>
                  </div>
                  <div className="mt-1 text-xs font-mono-tabular text-[#FB923C] sm:mt-0 sm:text-right">
                    <span>{edu.duration}</span>
                    <span className="mx-2 text-[#A3A3A3]">·</span>
                    <span>Percentage: {edu.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical & Soft Skills */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Technical & Soft Skills
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {RESUME_DATA.skillGroups.map((group) => (
                <div key={group.id} className="text-xs">
                  <span className="font-semibold text-white">{group.category}: </span>
                  <span className="text-[#A3A3A3]">
                    {group.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Internship Experience */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Internship Experience
            </h3>
            <div className="mt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-white">
                  {RESUME_DATA.internship.position} — {RESUME_DATA.internship.company}
                </p>
                <span className="font-mono-tabular text-xs text-[#FB923C]">
                  {RESUME_DATA.internship.duration}
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#D4D4D4]">
                {RESUME_DATA.internship.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Projects
            </h3>
            <div className="mt-3 space-y-4">
              {RESUME_DATA.projects.map((proj) => (
                <div key={proj.id}>
                  <p className="font-semibold text-white">{proj.title}</p>
                  <p className="text-xs text-[#FB923C]">
                    Technologies: {proj.technologies.join(' · ')}
                  </p>
                  <p className="mt-1 text-xs text-[#D4D4D4]">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              Certifications
            </h3>
            <ul className="mt-2 space-y-1.5 text-xs text-[#D4D4D4]">
              {RESUME_DATA.certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-semibold text-white">{cert.title}</span> — {cert.issuer}
                  {cert.date !== 'Documented' ? ` (${cert.date})` : ''}
                </li>
              ))}
            </ul>
          </section>

          {/* Volunteering, Achievements & Languages */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
                Volunteering & Leadership
              </h3>
              <p className="mt-2 text-xs font-semibold text-white">
                {RESUME_DATA.leadership.role}
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-[#D4D4D4]">
                {RESUME_DATA.leadership.activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F97316]">
                Co-Curricular Activities & Languages
              </h3>
              <ul className="mt-2 space-y-1 text-xs text-[#D4D4D4]">
                <li>
                  <strong className="text-white">Karate:</strong> District Karate Champion – 2023; Holds a Black Belt.
                </li>
                <li>
                  <strong className="text-white">Dance:</strong> Skilled in Dance; Actively participated in cultural events.
                </li>
                <li>
                  <strong className="text-white">Craft Making:</strong> Interested in Craft Making and creative art activities.
                </li>
                <li className="pt-1">
                  <strong className="text-white">Languages Known:</strong>{' '}
                  {RESUME_DATA.languages.map((l) => l.name).join(', ')}
                </li>
              </ul>
            </section>
          </div>

          {/* Declaration */}
          <section className="border-t border-[#292929] pt-4">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
              Declaration
            </h3>
            <p className="mt-1 text-xs italic text-[#D4D4D4]">
              “{RESUME_DATA.declaration.text}”
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A3A3A3]">
              <div>
                <p>Date: </p>
                <p>Place: </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{RESUME_DATA.personal.name}</p>
                <p>Signature</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
