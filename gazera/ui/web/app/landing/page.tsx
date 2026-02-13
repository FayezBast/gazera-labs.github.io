import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import LandingPage from "./LandingPage";

export const metadata: Metadata = {
  title: "Gazera Labs | AI Content Automation for the Arab World",
  description:
    "Gazera Labs builds sovereign Arabic AI that goes beyond translation—achieving true cultural understanding, advanced reasoning, and enterprise-grade reliability."
};

function loadLandingContent() {
  const htmlPath = path.join(process.cwd(), "app/landing/landing.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const styleText = styleMatch ? styleMatch[1].trim() : "";
  let bodyHtml = bodyMatch ? bodyMatch[1].trim() : "";

  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, "").trim();

  return { styleText, bodyHtml };
}

export default function Page() {
  const { styleText, bodyHtml } = loadLandingContent();
  return <LandingPage styleText={styleText} bodyHtml={bodyHtml} />;
}
