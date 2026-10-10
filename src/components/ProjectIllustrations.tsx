import React, { useState } from 'react';
import { MapPin, ShieldCheck, Upload, Navigation, FileSpreadsheet, BrainCircuit, Users, BarChart3 } from 'lucide-react';

export const RoadHazardVisual: React.FC = () => {
  const [activePortal, setActivePortal] = useState<'user' | 'government'>('user');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative overflow-hidden rounded-xl border border-[#292929] bg-[#080808] p-4 bg-tech-grid-orange"
    >
      {/* Top interactive portal switcher */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#292929] pb-3">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-[#F97316]" />
          <span className="text-xs font-medium text-white">Civic GIS & Hazard Tracking Interface</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-[#292929] bg-[#101010] p-1">
          <button
            type="button"
            onClick={() => setActivePortal('user')}
            className={`whitespace-nowrap shrink-0 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              activePortal === 'user'
                ? 'bg-[#F97316] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            User Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActivePortal('government')}
            className={`whitespace-nowrap shrink-0 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              activePortal === 'government'
                ? 'bg-[#F97316] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Government Dashboard
          </button>
        </div>
      </div>

      {/* Abstract SVG Road Network & Map View */}
      <div className="relative h-44 w-full overflow-hidden rounded-lg border border-[#292929] bg-[#0c0c0c]">
        <svg
          viewBox="0 0 600 220"
          className="h-full w-full opacity-90"
          aria-label="Abstract road network map view illustration"
        >
          {/* Subtle coordinate grid lines */}
          <g stroke="#1f1f1f" strokeWidth="1">
            <line x1="0" y1="55" x2="600" y2="55" />
            <line x1="0" y1="110" x2="600" y2="110" />
            <line x1="0" y1="165" x2="600" y2="165" />
            <line x1="150" y1="0" x2="150" y2="220" />
            <line x1="300" y1="0" x2="300" y2="220" />
            <line x1="450" y1="0" x2="450" y2="220" />
          </g>

          {/* Road arteries */}
          <path
            d="M -10 170 Q 140 150, 260 95 T 610 45"
            fill="none"
            stroke="#292929"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M -10 170 Q 140 150, 260 95 T 610 45"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 110 -10 L 245 230"
            fill="none"
            stroke="#262626"
            strokeWidth="8"
          />
          <path
            d="M 380 -10 L 310 230"
            fill="none"
            stroke="#262626"
            strokeWidth="8"
          />

          {/* GPS Hazard Location Nodes */}
          <g transform="translate(260, 95)">
            <circle r="18" fill="rgba(249, 115, 22, 0.18)" />
            <circle r="9" fill="rgba(249, 115, 22, 0.35)" />
            <circle r="4.5" fill="#F97316" />
          </g>
          <g transform="translate(430, 68)">
            <circle r="13" fill="rgba(251, 146, 60, 0.15)" />
            <circle r="4" fill="#FB923C" />
          </g>
          <g transform="translate(155, 142)">
            <circle r="12" fill="rgba(249, 115, 22, 0.14)" />
            <circle r="3.5" fill="#F97316" />
          </g>
        </svg>

        {/* Overlay cards representing documented features */}
        {activePortal === 'user' ? (
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#292929] bg-[#101010]/95 p-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#FB923C]">
                <MapPin className="h-3.5 w-3.5" />
                <span>GPS Live Location</span>
              </div>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                Pinpoints hazard coordinates on map view
              </p>
            </div>
            <div className="rounded-lg border border-[#292929] bg-[#101010]/95 p-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#FB923C]">
                <Upload className="h-3.5 w-3.5" />
                <span>Image Upload</span>
              </div>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                Submit road hazard photo & complaint details
              </p>
            </div>
            <div className="rounded-lg border border-[#292929] bg-[#101010]/95 p-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#FB923C]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Status Tracking</span>
              </div>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                Authenticated citizen complaint tracking
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-[#F97316]/40 bg-[#101010]/95 p-2.5 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-[#FB923C]">Government Review Queue</p>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                Centralized map view & complaint status management across submitted road hazards
              </p>
            </div>
            <div className="rounded-lg border border-[#292929] bg-[#101010]/95 p-2.5 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-white">Role-Separated Access</p>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                Dedicated User and Government dashboards with responsive interface
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PlacementReadinessVisual: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Faculty' | 'Admin' | 'Company'>('Student');

  const roleDetails: Record<'Student' | 'Faculty' | 'Admin' | 'Company', { focus: string; modules: string }> = {
    Student: {
      focus: 'AI-based Resume Analysis, Skill Gap Analysis & Placement Readiness Score',
      modules: 'Aptitude tests · Coding assessments · Mock interviews · Company preparation',
    },
    Faculty: {
      focus: 'Student Evaluation & Curriculum Skill Gap Monitoring',
      modules: 'Performance analytics · Assessment review · Readiness tracking',
    },
    Admin: {
      focus: 'Multi-Portal Governance & Assessment Orchestration',
      modules: 'Student, Faculty & Company dashboard administration · Analytics oversight',
    },
    Company: {
      focus: 'Candidate Readiness Evaluation & Role Preparation Alignment',
      modules: 'Placement Readiness Score inspection · Skill alignment review',
    },
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative overflow-hidden rounded-xl border border-[#292929] bg-[#080808] p-4 bg-tech-grid"
    >
      {/* 4-Dashboard Switcher */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#292929] pb-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-[#F97316]" />
          <span className="text-xs font-medium text-white">Multi-Dashboard AI Readiness Architecture</span>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#292929] bg-[#101010] p-1">
          {(['Student', 'Faculty', 'Admin', 'Company'] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`whitespace-nowrap shrink-0 rounded px-2 py-1 text-xs font-medium transition-colors ${
                selectedRole === role
                  ? 'bg-[#F97316] text-black'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Neural Resume & Skill Gap Graphic */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="flex flex-col justify-between rounded-lg border border-[#292929] bg-[#101010] p-3 sm:col-span-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#FB923C]">{selectedRole} Dashboard</span>
            <Users className="h-3.5 w-3.5 text-[#F97316]" />
          </div>
          <p className="mt-2 text-xs font-medium text-white leading-relaxed">
            {roleDetails[selectedRole].focus}
          </p>
          <p className="mt-2 border-t border-[#292929] pt-2 text-[11px] text-[#A3A3A3]">
            {roleDetails[selectedRole].modules}
          </p>
        </div>

        <div className="relative flex flex-col justify-between rounded-lg border border-[#292929] bg-[#101010] p-3 sm:col-span-7">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-white">Integrated Evaluation Pipeline</span>
            <BarChart3 className="h-3.5 w-3.5 text-[#F97316]" />
          </div>

          {/* SVG Skill Node Connection Graph */}
          <svg
            viewBox="0 0 360 95"
            className="my-2 h-20 w-full"
            aria-label="Abstract AI resume analysis and skill node topology"
          >
            <g stroke="#292929" strokeWidth="1.5">
              <line x1="45" y1="48" x2="135" y2="22" />
              <line x1="45" y1="48" x2="135" y2="74" />
              <line x1="135" y1="22" x2="230" y2="48" />
              <line x1="135" y1="74" x2="230" y2="48" />
              <line x1="230" y1="48" x2="315" y2="48" />
            </g>
            <g stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="45" y1="48" x2="135" y2="22" />
              <line x1="135" y1="22" x2="230" y2="48" />
              <line x1="230" y1="48" x2="315" y2="48" />
            </g>

            {/* Nodes */}
            <g transform="translate(45, 48)">
              <circle r="12" fill="#171717" stroke="#F97316" strokeWidth="1.5" />
              <circle r="4" fill="#F97316" />
              <text x="0" y="25" textAnchor="middle" fill="#A3A3A3" fontSize="9">
                Resume AI
              </text>
            </g>
            <g transform="translate(135, 22)">
              <circle r="10" fill="#171717" stroke="#FB923C" strokeWidth="1.5" />
              <circle r="3.5" fill="#FB923C" />
              <text x="0" y="-14" textAnchor="middle" fill="#A3A3A3" fontSize="9">
                Skill Gap
              </text>
            </g>
            <g transform="translate(135, 74)">
              <circle r="10" fill="#171717" stroke="#292929" strokeWidth="1.5" />
              <circle r="3.5" fill="#F97316" />
              <text x="0" y="20" textAnchor="middle" fill="#A3A3A3" fontSize="9">
                Assessments
              </text>
            </g>
            <g transform="translate(230, 48)">
              <circle r="12" fill="#171717" stroke="#F97316" strokeWidth="1.5" />
              <circle r="4" fill="#F97316" />
              <text x="0" y="25" textAnchor="middle" fill="#A3A3A3" fontSize="9">
                Analytics
              </text>
            </g>
            <g transform="translate(315, 48)">
              <circle r="15" fill="rgba(249,115,22,0.15)" stroke="#F97316" strokeWidth="1.5" />
              <circle r="5" fill="#F97316" />
              <text x="0" y="27" textAnchor="middle" fill="#FB923C" fontSize="9">
                Readiness Score
              </text>
            </g>
          </svg>

          <div className="flex items-center justify-between text-[11px] text-[#A3A3A3]">
            <span className="flex items-center gap-1">
              <FileSpreadsheet className="h-3 w-3 text-[#F97316]" />
              Node.js · Express.js · MySQL · Python (Flask)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
