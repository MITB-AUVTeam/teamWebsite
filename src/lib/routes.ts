/**
 * Per-page metadata. `depth` is where the page sits on the dive: the site starts
 * at the surface on Home and reaches the seabed on Contact. It drives the page
 * transition readout, the depth gauge and how dark the water gets.
 */
export interface RouteMeta {
  label: string;
  depth: number;
  title: string;
  description: string;
}

export const ROUTES: Record<string, RouteMeta> = {
  "/": {
    label: "Surface",
    depth: 0,
    title: "AUV-MITB | Autonomous Underwater Vehicle Team, MIT Bengaluru",
    description: "Team AUV MIT-B designs and builds autonomous underwater vehicles at MIT Bengaluru and competes at the international RoboSub competition.",
  },
  "/about": {
    label: "About",
    depth: 40,
    title: "About | AUV-MITB",
    description: "Who we are, why we build underwater robots, and the milestones from our founding in 2025 to RoboSub 2026.",
  },
  "/vehicles": {
    label: "Vehicles",
    depth: 120,
    title: "Vehicles | AUV-MITB",
    description: "Hydrogen and Deuterium: specs, subsystems and the technical design report behind our autonomous underwater vehicles.",
  },
  "/team": {
    label: "Team",
    depth: 200,
    title: "Team | AUV-MITB",
    description: "Meet the engineers behind AUV-MITB across mechanical, electrical, software, design and management.",
  },
  "/gallery": {
    label: "Gallery",
    depth: 280,
    title: "Gallery | AUV-MITB",
    description: "Pool tests, late nights in the workshop and RoboSub 2026 in California, in photos.",
  },
  "/media": {
    label: "Media",
    depth: 360,
    title: "Media | AUV-MITB",
    description: "Engineering blogs and articles from Team AUV MIT-B.",
  },
  "/sponsors": {
    label: "Sponsors",
    depth: 440,
    title: "Sponsors | AUV-MITB",
    description: "The partners who make our vehicles possible, and how your company can sponsor Team AUV MIT-B.",
  },
  "/contact": {
    label: "Contact",
    depth: 520,
    title: "Contact | AUV-MITB",
    description: "Get in touch with Team AUV MIT-B for sponsorships, collaborations or joining the team.",
  },
};

/** The deepest page; the water is darkest here. */
export const SEABED = 520;

/** Anything off the map: lost at 404 m, naturally. */
export const NOT_FOUND: RouteMeta = {
  label: "Lost at sea",
  depth: 404,
  title: "Lost at sea | AUV-MITB",
  description: "This page doesn't exist. Head back to the surface.",
};

export const routeMeta = (pathname: string): RouteMeta => ROUTES[pathname.replace(/\/$/, "") || "/"] ?? NOT_FOUND;
