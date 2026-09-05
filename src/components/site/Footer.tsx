import { Link } from "@tanstack/react-router";
import { navLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/" className="font-display text-xl font-semibold tracking-[-0.02em]">
            {site.name}
            <span className="text-primary">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Navigate
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Social
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {site.phone}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>Contact details and client references are placeholders.</p>
      </div>
    </footer>
  );
}

export default Footer;
