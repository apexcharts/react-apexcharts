import React, { useState, lazy, Suspense } from "react";
import Area from "./chart-types/Area";
import Bar from "./chart-types/Bar";
import Column from "./chart-types/Column";
import Line from "./chart-types/Line";
import Donut from "./chart-types/Donut";
import RadialBar from "./chart-types/RadialBar";
import ChartUpdate from "./ChartUpdate";

// Lazy-load tree-shaking demos so apexcharts/core doesn't interfere
// with apexcharts/client (full bundle) used by the regular demos.
const TreeShakingLine = lazy(() => import("./chart-types/TreeShakingLine"));
const TreeShakingBar = lazy(() => import("./chart-types/TreeShakingBar"));
const TreeShakingMixed = lazy(() => import("./chart-types/TreeShakingMixed"));

const FULL_BUNDLE_CHARTS = [
  { id: "line", label: "Line" },
  { id: "area", label: "Area" },
  { id: "bar", label: "Bar" },
  { id: "column", label: "Column" },
  { id: "radialbar", label: "Radial Bar" },
  { id: "donut", label: "Donut" },
  { id: "updateExample", label: "Live Update" },
];

const TREE_SHAKING_CHARTS = [
  { id: "treeshaking-line", label: "Line" },
  { id: "treeshaking-bar", label: "Bar" },
  { id: "treeshaking-mixed", label: "Mixed" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("full");
  const [selectedChart, setSelectedChart] = useState("line");
  const [darkMode, setDarkMode] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedChart(tab === "full" ? "line" : "treeshaking-line");
  };

  const navItems = activeTab === "full" ? FULL_BUNDLE_CHARTS : TREE_SHAKING_CHARTS;

  return (
    <div className={`app-root${darkMode ? " dark" : ""}`}>
      {/* Header */}
      <header className="app-header">
        <div className="app-header-left">
          <svg className="apex-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#008FFB"/>
            <path d="M8 28L16 14L20 22L24 18L32 28H8Z" fill="white" fillOpacity="0.9"/>
            <circle cx="20" cy="13" r="3" fill="white"/>
          </svg>
          <div className="app-header-title">
            <span className="app-title">react-apexcharts</span>
            <span className="app-subtitle">Interactive Demo</span>
          </div>
        </div>
        <div className="app-header-right">
          <button
            className="dark-mode-btn"
            onClick={() => setDarkMode((d) => !d)}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <a
            className="github-link"
            href="https://github.com/apexcharts/react-apexcharts"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn${activeTab === "full" ? " active" : ""}`}
          onClick={() => handleTabChange("full")}
        >
          Full Bundle
          <span className="tab-badge">react-apexcharts</span>
        </button>
        <button
          className={`tab-btn${activeTab === "tree" ? " active" : ""}`}
          onClick={() => handleTabChange("tree")}
        >
          Tree Shaking
          <span className="tab-badge">react-apexcharts/core</span>
        </button>
      </div>

      {/* Body */}
      <div className="app-body">
        {/* Sidebar */}
        <nav className="sidebar">
          <p className="sidebar-label">Chart Types</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item${selectedChart === item.id ? " active" : ""}`}
              onClick={() => setSelectedChart(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="chart-area">
          {/* Full bundle charts */}
          {selectedChart === "line" && <Line />}
          {selectedChart === "area" && <Area />}
          {selectedChart === "bar" && <Bar />}
          {selectedChart === "column" && <Column />}
          {selectedChart === "radialbar" && <RadialBar />}
          {selectedChart === "donut" && <Donut />}
          {selectedChart === "updateExample" && <ChartUpdate />}

          {/* Tree-shaking charts */}
          <Suspense fallback={<div className="chart-loading">Loading chart...</div>}>
            {selectedChart === "treeshaking-line" && <TreeShakingLine />}
            {selectedChart === "treeshaking-bar" && <TreeShakingBar />}
            {selectedChart === "treeshaking-mixed" && <TreeShakingMixed />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
