"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

/* ============================================================
   TIKTOK ICON
   ============================================================ */
const TikTokIcon = ({
  size = 14,
  ...props
}: {
  size?: number;
  [key: string]: any;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

/* ============================================================
   NAVIGATION DATA
   ============================================================ */
const AREAS = [
  { name: "Buckhead", slug: "buckhead" },
  { name: "Midtown", slug: "midtown" },
  { name: "Downtown", slug: "downtown" },
  { name: "Eastside", slug: "eastside" },
  { name: "Westside", slug: "westside" },
  { name: "North Atlanta", slug: "north-atlanta" },
  { name: "South Atlanta", slug: "south-atlanta" },
  { name: "Southeast Atlanta", slug: "southeast-atlanta" },
  { name: "Southwest Atlanta", slug: "southwest-atlanta" },
];

const HUB_ITEMS = [
  {
    name: "Businesses",
    slug: "businesses",
    image: "https://placehold.co/200x120/1a1a1a/e6c46d?text=Businesses",
  },
  {
    name: "Eats & Drinks",
    slug: "eats-and-drinks",
    image: "https://placehold.co/200x120/c1121f/ffffff?text=Eats",
  },
  {
    name: "Events",
    slug: "events",
    image: "https://placehold.co/200x120/4a4a4a/ffffff?text=Events",
  },
  {
    name: "Things to Do",
    slug: "things-to-do",
    image: "https://placehold.co/200x120/e6c46d/1a1a1a?text=Things+To+Do",
  },
  {
    name: "Atlanta Guide",
    slug: "atlanta-guide",
    image: "https://placehold.co/200x120/1a1a1a/fee198?text=Guide",
  },
];

/* Beyond ATL — linear list, no descriptions */
const BEYOND_ATL = [
  { name: "Cities", slug: "cities" },
  { name: "Relocation", slug: "relocation" },
];

/* Platform-native hover colors — icon only, count stays gray */
const SOCIAL_LINKS = [
  {
    icon: Facebook,
    label: "Facebook",
    count: "56K",
    href: "https://facebook.com/atlvibesandviews",
    hoverClass: "group-hover:text-[#1877F2]",
  },
  {
    icon: Twitter,
    label: "X",
    count: "12K",
    href: "https://x.com/atlvibes_views",
    hoverClass: "group-hover:text-black",
  },
  {
    icon: Youtube,
    label: "YouTube",
    count: "2K",
    href: "https://www.youtube.com/@livinginAtlanta-MellandaReese",
    hoverClass: "group-hover:text-[#FF0000]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    count: "45K",
    href: "https://instagram.com/atlvibesandviews",
    hoverClass: "group-hover:text-[#E4405F]",
  },
  {
    icon: TikTokIcon,
    label: "TikTok",
    count: "5K",
    href: "https://tiktok.com/@atlvibesandviews",
    hoverClass: "group-hover:text-black",
  },
];

/* Drawer blog stories — DIFFERENT from homepage stories */
const DRAWER_STORIES = [
  {
    slug: "atlanta-hidden-rooftop-bars",
    title: "Atlanta's Best Hidden Rooftop Bars",
    image: "https://placehold.co/80x80/c1121f/ffffff?text=1",
  },
  {
    slug: "neighborhood-guide-old-fourth-ward",
    title: "Neighborhood Guide: Old Fourth Ward",
    image: "https://placehold.co/80x80/4a4a4a/ffffff?text=2",
  },
  {
    slug: "best-weekend-brunch-spots",
    title: "The Best Weekend Brunch Spots in the City",
    image: "https://placehold.co/80x80/e6c46d/1a1a1a?text=3",
  },
];

/* ============================================================
   HEADER COMPONENT
   ============================================================ */
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [closeSpinning, setCloseSpinning] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handleClick = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [activeDropdown]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  /* Open drawer — mount then animate in */
  const openDrawer = () => {
    setDrawerOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDrawerVisible(true);
      });
    });
  };

  /* Close drawer — twist X, slide out, then unmount */
  const closeDrawer = () => {
    setCloseSpinning(true);
    setTimeout(() => {
      setDrawerVisible(false);
      setTimeout(() => {
        setDrawerOpen(false);
        setCloseSpinning(false);
      }, 400);
    }, 250);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* ========== ROW 1: Utility Bar — generous breathing room ========== */}
      <div className="border-b border-gray-100">
        <div className="site-container flex items-center justify-between h-[76px]">
          {/* Social Icons — icon hovers to platform color, count stays gray */}
          <div className="hidden md:flex items-center gap-5">
            {SOCIAL_LINKS.map(
              ({ icon: Icon, label, count, href, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 group"
                  aria-label={label}
                >
                  <span
                    className={`text-gray-400 transition-colors duration-200 ${hoverClass}`}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {count}
                  </span>
                </a>
              )
            )}
          </div>

          {/* Logo — centered */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <div className="font-logo text-xl md:text-2xl font-bold tracking-wide text-black leading-none">
              ATL VIBES &amp; VIEWS
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.15em] text-gray-mid mt-1.5 uppercase">
              The City. The Culture. The Conversation.
            </div>
          </Link>

          {/* Account + Search — hover yellow #fee198 */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-[#fee198]"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              href="/login"
              className="p-2.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-[#fee198]"
              aria-label="Sign in"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ========== Search Bar ========== */}
      {searchOpen && (
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="site-container py-4">
            <div className="flex items-center gap-3 max-w-xl mx-auto">
              <Search size={18} className="text-gray-mid shrink-0" />
              <input
                type="text"
                placeholder="Search stories, neighborhoods, businesses..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-mid"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-white rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== ROW 2: Navigation — breathing room ========== */}
      <div className="site-container flex items-center justify-between h-[56px]">
        {/* Hamburger */}
        <button
          onClick={openDrawer}
          className="p-2.5 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* Desktop Nav — larger text, more gap */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <NavLink href="/">Home</NavLink>

          {/* Areas dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("areas")}
            onMouseLeave={handleDropdownLeave}
          >
            <NavDropdownTrigger active={activeDropdown === "areas"}>
              Areas
            </NavDropdownTrigger>
            {activeDropdown === "areas" && (
              <DropdownPanel>
                {AREAS.map((area) => (
                  <DropdownLink
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                  >
                    {area.name}
                  </DropdownLink>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <DropdownLink href="/neighborhoods" highlight>
                    Explore All Neighborhoods
                  </DropdownLink>
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* Hub — mega menu with thumbnails */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("hub")}
            onMouseLeave={handleDropdownLeave}
          >
            <NavDropdownTrigger active={activeDropdown === "hub"}>
              The Hub
            </NavDropdownTrigger>
            {activeDropdown === "hub" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] shadow-2xl z-50 w-[700px] p-6">
                <div className="grid grid-cols-5 gap-4">
                  {HUB_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/hub/${item.slug}`}
                      className="group block text-center"
                    >
                      <div className="relative aspect-[5/3] overflow-hidden mb-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-white text-xs font-semibold group-hover:text-gold-light transition-colors">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Beyond ATL — linear dropdown, no descriptions */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("beyond")}
            onMouseLeave={handleDropdownLeave}
          >
            <NavDropdownTrigger active={activeDropdown === "beyond"}>
              Beyond ATL
            </NavDropdownTrigger>
            {activeDropdown === "beyond" && (
              <DropdownPanel>
                {BEYOND_ATL.map((item) => (
                  <DropdownLink
                    key={item.slug}
                    href={`/beyond-atl/${item.slug}`}
                  >
                    {item.name}
                  </DropdownLink>
                ))}
              </DropdownPanel>
            )}
          </div>

          <NavLink href="/city-watch">City Watch</NavLink>
          <NavLink href="/media">Media</NavLink>
        </nav>

        {/* Submit Listing — pill */}
        <Link
          href="/submit"
          className="hidden md:inline-flex items-center px-5 py-2 bg-red-brand text-white text-xs font-semibold uppercase tracking-eyebrow rounded-full hover:bg-black transition-colors"
        >
          Submit Listing
        </Link>
      </div>

      {/* ========== Slide-Out Drawer ========== */}
      {drawerOpen && (
        <>
          {/* Backdrop — smooth fade */}
          <div
            className="fixed inset-0 z-50 transition-opacity duration-400"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              opacity: drawerVisible ? 1 : 0,
            }}
            onClick={closeDrawer}
          />

          {/* Panel — smooth slide from left */}
          <div
            className="fixed top-0 left-0 w-[320px] h-full bg-[#1a1a1a] z-50 overflow-y-auto"
            style={{
              transform: drawerVisible
                ? "translateX(0)"
                : "translateX(-100%)",
              transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-logo text-lg font-bold text-white tracking-wide">
                ATL VIBES &amp; VIEWS
              </span>
              {/* X close — twist animation */}
              <button
                onClick={closeDrawer}
                className="p-1.5 text-white/60 hover:text-white transition-all"
                style={{
                  transform: closeSpinning
                    ? "rotate(90deg) scale(0.7)"
                    : "rotate(0deg) scale(1)",
                  opacity: closeSpinning ? 0 : 1,
                  transition:
                    "transform 250ms ease-in-out, opacity 250ms ease-in-out",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="p-6">
              <DrawerLink href="/" onClick={closeDrawer}>
                Home
              </DrawerLink>

              <DrawerSection title="Areas">
                {AREAS.map((area) => (
                  <DrawerSubLink
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    onClick={closeDrawer}
                  >
                    {area.name}
                  </DrawerSubLink>
                ))}
                <DrawerSubLink
                  href="/neighborhoods"
                  highlight
                  onClick={closeDrawer}
                >
                  Explore All Neighborhoods
                </DrawerSubLink>
              </DrawerSection>

              <DrawerSection title="The Hub">
                {HUB_ITEMS.map((item) => (
                  <DrawerSubLink
                    key={item.slug}
                    href={`/hub/${item.slug}`}
                    onClick={closeDrawer}
                  >
                    {item.name}
                  </DrawerSubLink>
                ))}
              </DrawerSection>

              <DrawerSection title="Beyond ATL">
                {BEYOND_ATL.map((item) => (
                  <DrawerSubLink
                    key={item.slug}
                    href={`/beyond-atl/${item.slug}`}
                    onClick={closeDrawer}
                  >
                    {item.name}
                  </DrawerSubLink>
                ))}
              </DrawerSection>

              <DrawerLink href="/city-watch" onClick={closeDrawer}>
                City Watch
              </DrawerLink>
              <DrawerLink href="/media" onClick={closeDrawer}>
                Media
              </DrawerLink>

              {/* Submit Listing */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href="/submit"
                  onClick={closeDrawer}
                  className="block w-full text-center py-3 bg-red-brand text-white text-xs font-semibold uppercase tracking-eyebrow rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Submit Listing
                </Link>
              </div>

              {/* Blog Stories — circular thumbnails (Chronicle-style) */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="space-y-5">
                  {DRAWER_STORIES.map((story) => (
                    <Link
                      key={story.slug}
                      href={`/stories/${story.slug}`}
                      onClick={closeDrawer}
                      className="flex items-center gap-4 group"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-gold-light transition-colors">
                        {story.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-5 mt-8 pt-6 border-t border-white/10">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-gold-light transition-colors"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[13px] font-semibold uppercase tracking-eyebrow text-black hover:text-red-brand transition-colors py-1"
    >
      {children}
    </Link>
  );
}

function NavDropdownTrigger({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-eyebrow py-1 transition-colors ${
        active ? "text-red-brand" : "text-black hover:text-red-brand"
      }`}
    >
      {children}
      <ChevronDown
        size={12}
        className={`transition-transform duration-200 ${
          active ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-100 shadow-lg py-2 z-50">
      {children}
    </div>
  );
}

function DropdownLink({
  href,
  children,
  highlight,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block px-5 py-2.5 text-sm transition-colors ${
        highlight
          ? "text-red-brand font-semibold hover:bg-gray-50"
          : "text-gray-dark hover:bg-gray-50 hover:text-black"
      }`}
    >
      {children}
    </Link>
  );
}

function DrawerLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3.5 text-white text-sm font-semibold uppercase tracking-eyebrow border-b border-white/5 hover:text-gold-light transition-colors"
    >
      {children}
    </Link>
  );
}

function DrawerSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-white text-sm font-semibold uppercase tracking-eyebrow hover:text-gold-light transition-colors"
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 text-white/40 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pb-3">{children}</div>
      </div>
    </div>
  );
}

function DrawerSubLink({
  href,
  children,
  highlight,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2.5 pl-4 text-sm transition-colors ${
        highlight
          ? "text-gold-light font-medium"
          : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
