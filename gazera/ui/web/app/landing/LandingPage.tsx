"use client";

import { useEffect } from "react";

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&display=swap');";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzaRh9hc96L3p9_FyvMc1jBssWnEGsaKWCxrrwOwngQ__Tnrt0SLUF_-qvOcI-oxvYk/exec";

type LandingPageProps = {
  styleText: string;
  bodyHtml: string;
};

export default function LandingPage({ styleText, bodyHtml }: LandingPageProps) {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (!navbar) {
        return;
      }
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedItems = document.querySelectorAll(
      ".product-card, .capability-card, .testimonial-card, .feature-showcase"
    );

    animatedItems.forEach((el) => {
      const target = el as HTMLElement;
      target.style.opacity = "0";
      target.style.transform = "translateY(24px)";
      target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(target);
    });

    const form = document.getElementById("waitlistForm") as HTMLFormElement | null;
    const btn = document.getElementById("submitBtn") as HTMLButtonElement | null;
    const msg = document.getElementById("responseMsg") as HTMLElement | null;

    const onSubmit = async (event: Event) => {
      event.preventDefault();
      if (!form || !btn || !msg) {
        return;
      }

      btn.disabled = true;
      btn.innerText = "Joining...";
      msg.innerText = "";

      const emailInput = document.getElementById("userEmail") as HTMLInputElement | null;
      const hpField = document.getElementById("hp_field") as HTMLInputElement | null;

      const payload = {
        email: emailInput?.value || "",
        hp_field: hpField?.value || ""
      };

      try {
        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          cache: "no-cache",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        msg.style.color = "#10b981";
        msg.innerText = "Welcome! You've been added to the Gazera Labs waitlist.";
        form.reset();
      } catch (error) {
        msg.style.color = "#ef4444";
        msg.innerText = "Something went wrong. Please try again later.";
        console.error("Waitlist Error:", error);
      } finally {
        btn.disabled = false;
        btn.innerText = "Get Early Access";
      }
    };

    form?.addEventListener("submit", onSubmit);

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const anchorHandlers = new Map<HTMLAnchorElement, (event: Event) => void>();

    anchors.forEach((anchor) => {
      const handler = (event: Event) => {
        event.preventDefault();
        const href = anchor.getAttribute("href");
        if (!href || href === "#") {
          return;
        }
        try {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } catch {
          // Invalid selector, ignore
        }
      };
      anchorHandlers.set(anchor, handler);
      anchor.addEventListener("click", handler);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      form?.removeEventListener("submit", onSubmit);
      anchorHandlers.forEach((handler, anchor) => {
        anchor.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <div className="landing-root" dir="ltr" lang="en">
      <style dangerouslySetInnerHTML={{ __html: `${FONT_IMPORT}\n${styleText}` }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
