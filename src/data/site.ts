/**
 * Site-wide identity and outbound links.
 *
 * Every entry in `links` is a placeholder. Replace the URLs and the email
 * address with the real profiles before deploying, then set
 * `site.linksArePlaceholders = false` to drop the notice from the footer.
 */
export const site = {
  name: "Muhammad Arslan",
  role: "PCB Designer & Embedded Systems Engineer",
  shortRole: "PCB Design | Embedded Systems",
  linksArePlaceholders: false,
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Expertise", href: "/#expertise" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const links = {
  github: "https://github.com/arslanlabs-ux",
  upwork: "https://www.upwork.com/freelancers/~015b4b5a871d7f2c1b?mp_source=share",
  email: "mailto:oisb2ksi@gmail.com",
} as const;

export const emailLabel = "oisb2ksi@gmail.com";
