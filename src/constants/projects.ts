/**
 * Portfolio project data
 * Single source of truth for the Projekte page — add new projects here.
 */

import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "fmg",
    title: "Flughafen München - Softwarelösungen",
    meta: [
      { label: "Zeitraum", value: "2017 - heute" },
      { label: "Technologien", value: "React, Node.js, TypeScript, Figma" },
    ],
    description:
      "Konzeption und Entwicklung individueller Softwarelösungen für FMG, Tochtergesellschaften und Lufthansa. Schwerpunkt auf Webentwicklung, UI/UX Design und Einführung moderner Frontend-Tools.",
    links: [
      {
        label: "Beispiel: IT-Akademie Eventseite",
        url: "https://levoram.github.io/IT-Akademie-Eventseite/",
        icon: "fas fa-external-link-alt",
      },
    ],
  },
  {
    id: "ardem",
    title: "Ardem",
    meta: [
      { label: "Release", value: "Early Access 2026 (Steam)" },
      { label: "Beitrag", value: "Game Art & Design" },
    ],
    description:
      "Mitwirkung an Game Art und Design für Ardem, ein Open-World-Survival-RPG mit 64 km² handgefertigter Spielwelt. Von Environment-Details bis zu visueller Gestaltung - mein kreativer Beitrag zu einem kommerziellen Steam-Titel.",
    links: [
      {
        label: "Auf Steam ansehen",
        url: "https://store.steampowered.com/app/2179480/Ardem/",
        icon: "fab fa-steam",
      },
    ],
  },
  {
    id: "neverknights",
    title: "Neverknights",
    meta: [
      { label: "Typ", value: "Eigene Lernplattform" },
      { label: "Themen", value: "Pixel Art, Color Theory, Game Art" },
    ],
    description:
      "Meine Tutorial-Plattform für Game Art: Pixel-Art-Grundlagen, Farbtheorie und Fundamentals - aufgebaut auf einem B.A. in Games & Animation. Mit kuratierter Fachbibliothek und Galerie eigener Environment-Arbeiten.",
    links: [
      {
        label: "neverknights.de besuchen",
        url: "https://www.neverknights.de/en/",
        icon: "fas fa-graduation-cap",
      },
    ],
  },
  {
    id: "vrar",
    title: "VR/AR Mixed Reality Projekte",
    meta: [
      { label: "Zeitraum", value: "2012 - heute" },
      { label: "Technologien", value: "Unity, C#, VR/AR SDKs" },
    ],
    description:
      "Entwicklung immersiver VR- und AR-Anwendungen für verschiedene Branchen. Von industriellen Trainingssimulatoren bis hin zu interaktiven Präsentationslösungen - Unity-zertifizierte Entwicklung.",
  },
  {
    id: "infogate",
    title: "3D Navigation Prototyp",
    meta: [
      { label: "Zeitraum", value: "2014 - 2016" },
      { label: "Unternehmen", value: "InfoGate Information Systems" },
      { label: "Technologien", value: "Unity, 3D Modeling, UI/UX Design" },
    ],
    description:
      "Entwicklung eines innovativen 3D-Navigationssystems für interaktive Informationssysteme. Kombination aus technischer Entwicklung und visueller Gestaltung.",
  },
  {
    id: "mediendesign",
    title: "Nico Küchler Mediendesign",
    meta: [
      { label: "Zeitraum", value: "2012 - heute" },
      { label: "Services", value: "Game Design, Videoproduktion, Fotografie" },
    ],
    description:
      "Selbstständige Tätigkeit mit Fokus auf 3D-Konfiguratoren, Game Design, professionelle Videoproduktion und Fotografie. Vollständige Projektbetreuung von der Konzeption bis zur Umsetzung.",
    links: [
      {
        label: "SnakeTris Adventure spielen",
        url: "https://levoram.itch.io/snaketris-adventure",
        icon: "fab fa-itch-io",
      },
      {
        label: "Alle Games auf itch.io",
        url: "https://levoram.itch.io/",
        icon: "fab fa-itch-io",
      },
    ],
  },
  {
    id: "nato",
    title: "Digitalisierung Fachbibliotheken",
    meta: [
      { label: "Zeitraum", value: "2005 - 2006" },
      { label: "Organisation", value: "NATO E3-A Verband" },
    ],
    description:
      "Projektleitung für die Digitalisierung militärischer Fachbibliotheken. Frühe Erfahrungen in der digitalen Transformation und Informationssystem-Management.",
  },
  {
    id: "webdesign",
    title: "Web- & Grafikdesign Projekte",
    meta: [
      { label: "Zeitraum", value: "2014 - heute" },
      { label: "Tools", value: "Adobe Creative Cloud, CAD, Video Editing" },
    ],
    description:
      "Vielfältige Projekte im Bereich Produktrenderings, CAD-Pläne, Werbevideos und Grafikdesign. Umfassende Expertise in der visuellen Kommunikation und Markenentwicklung.",
  },
];

export default PROJECTS;
