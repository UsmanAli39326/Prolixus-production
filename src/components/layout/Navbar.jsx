"use client";
import { useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


import { FaCircleUser } from "react-icons/fa6";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";


import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import { FaChevronDown, FaUser, FaSignOutAlt, FaColumns, FaBars } from "react-icons/fa";

export default function Header({ menus = [] }) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, profile, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push("/login");
  };



  // Exclude Cart from main nav (Cart icon handled separately)
  const mainMenus = menus.filter((m) => m.label !== "Cart");


  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-divider bg-primary font-sans">
      <nav className="container mx-auto relative flex items-center justify-between px-4 py-4 lg:py-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 w-[180px] lg:w-[270px]">
          <Image
            src="/images/new/logo-font-size-big.gif"
            alt="Prolixus Logo"
            width={180}
            height={50}
            className="h-12 w-auto object-contain scale-110 lg:scale-[1.5] origin-left"
            priority
          />
        </Link>

        {/* Mobile Google Rating - Only on mobile */}
        <div className="absolute lg:hidden left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center px-2 max-w-[110px]">
          <a
            href="https://share.google/kgDhjqnMrkgLLtv8m"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition-opacity no-underline"
          >
            <Image
              src="/images/new/Stars-01.svg"
              alt="5 Stars"
              width={30}
              height={7}
              className="h-auto w-auto"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <ul className="flex items-center gap-1">
            {mainMenus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.url}
                  className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent no-underline"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            {/* Google Rating Badge */}
            <a
              href="https://share.google/kgDhjqnMrkgLLtv8m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity no-underline"
            >
              <Image
                src="/images/new/Google.svg"
                alt="Google Rating"
                width={70}
                height={30}
              />
              <Image
                src="/images/new/Stars-01.svg"
                alt="5 Stars"
                width={80}
                height={18}
                className="h-auto w-auto"
              />
            </a>

            <div className="flex items-center gap-6 pl-6 border-l border-divider">
              <div className="flex items-center gap-4">
                <LanguageSwitcher />

                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 text-white hover:text-accent transition-all duration-300 py-1.5 px-2 rounded-full hover:bg-white/5"
                    >
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-primary font-bold shadow-lg shadow-accent/20 border border-white/20">
                        {profile?.name?.charAt(0).toUpperCase() || <FaUser size={14} />}
                      </div>
                      <div className="flex flex-col items-start leading-none hidden lg:flex">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Welcome</span>
                        <span className="font-bold text-sm">{profile?.name || "User"}</span>
                      </div>
                      <FaChevronDown className={`text-[10px] text-white/40 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 mt-3 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                          <div className="p-4 border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Account Member</p>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/20">
                                {profile?.name?.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-bold text-white truncate">{profile?.name}</p>
                                <p className="text-[11px] text-white/50 truncate max-w-[140px]">{profile?.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link
                              href="/dashboard"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group no-underline"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                                <FaColumns size={14} />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-white">Dashboard</span>
                                <span className="text-[10px] text-white/40">Manage your account</span>
                              </div>
                            </Link>
                            <Link
                              href="/dashboard/profile"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group no-underline"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                                <FaUser size={14} />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-white">Profile Settings</span>
                                <span className="text-[10px] text-white/40">Update your information</span>
                              </div>
                            </Link>
                            <div className="my-1 border-t border-white/5 mx-2" />
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 rounded-xl transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error group-hover:text-white transition-all">
                                <FaSignOutAlt size={14} />
                              </div>
                              <span className="font-bold">Logout</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-10 w-10 rounded-full border border-white text-white transition hover:bg-white hover:text-accent no-underline"
                  >
                    <FaCircleUser />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile User Dropdown */}
          <div className="relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent/60 text-primary font-bold shadow-lg shadow-accent/20 border border-white/20 active:scale-95 transition-all"
                >
                  {profile?.name?.charAt(0).toUpperCase() || <FaUser size={14} />}
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      <div className="p-4 border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                        <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Account Member</p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/20">
                            {profile?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-bold text-white truncate">{profile?.name}</p>
                            <p className="text-[11px] text-white/50 truncate max-w-[140px]">{profile?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group no-underline"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                            <FaColumns size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">Dashboard</span>
                            <span className="text-[10px] text-white/40">Manage your account</span>
                          </div>
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group no-underline"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                            <FaUser size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">Profile Settings</span>
                            <span className="text-[10px] text-white/40">Update your information</span>
                          </div>
                        </Link>
                        <div className="my-1 border-t border-white/5 mx-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 rounded-xl transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error group-hover:text-white transition-all">
                            <FaSignOutAlt size={14} />
                          </div>
                          <span className="font-bold">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-white/20 text-white bg-white/5 active:scale-95 transition-all no-underline"
              >
                <FaCircleUser size={20} />
              </Link>
            )}
          </div>

          {/* Hamburger Toggle */}
          <button
            className="flex flex-col items-center justify-center h-10 w-10 rounded-xl bg-accent shadow-lg shadow-accent/20 active:scale-90 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block h-0.5 w-5 bg-primary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 w-5 bg-primary my-1 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-primary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Top-Down Dropdown - Half Screen) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden mt-[72px]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-[72px] left-0 right-0 h-[50vh] z-50 bg-primary shadow-2xl lg:hidden animate-in slide-in-from-top duration-300 font-sans border-b border-white/10">
            <div className="flex flex-col h-full">
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-6">
                  {mainMenus.map((menu) => (
                    <li key={menu.id}>
                      <Link
                        href={menu.url}
                        onClick={() => setMobileOpen(false)}
                        className="block text-xl font-bold text-white hover:text-accent no-underline transition-colors"
                      >
                        {menu.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                <div className="flex flex-col gap-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Preferences</p>
                  <div className="flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
                    {/* Language Switcher Only */}
                    <div className="scale-90 origin-left">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );




  // return (
  //   <header className="top-0 left-0 right-0 z-50 border-b border-divider bg-primary absolute">
  //     <div>
  //       <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:py-6">
  //         {/* Logo */}
  //         <Link href="/" className="flex items-center">
  //           <Image
  //             src="/images/logo.svg"
  //             alt="Logo"
  //             width={140}
  //             height={40}
  //             className="h-10 w-auto"
  //             priority
  //           />
  //         </Link>

  //         {/* Desktop Menu */}
  //         <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
  //           <ul className="flex items-center gap-1">
  //             {/* Home */}
  //             <li className="relative group">
  //               <Link
  //                 href="/"
  //                 className="flex items-center px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Home
  //               </Link>
  //             </li>

  //             {/* About */}
  //             <li>
  //               <Link
  //                 href="/about"
  //                 className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 About Us
  //               </Link>
  //             </li>

  //             {/* Pages Dropdown */}
  //             <li className="relative group">
  //               <button
  //                 type="button"
  //                 className="flex items-center px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Pages
  //                 <span className="ml-2 text-sm">
  //                   <FaChevronDown />
  //                 </span>
  //               </button>

  //               <ul className="absolute left-0 mt-1 w-56 rounded-2xl bg-accent opacity-0 scale-y-90 origin-top transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-100 pointer-events-none group-hover:pointer-events-auto">
  //                 <li>
  //                   <Link
  //                     href="/blog-single"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Blog Details
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/features"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Features
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/testimonials"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     Testimonials
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/faqs"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     FAQs
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <Link
  //                     href="/404"
  //                     className="block px-5 py-2 text-white font-semibold hover:text-primary transition"
  //                   >
  //                     404
  //                   </Link>
  //                 </li>
  //               </ul>
  //             </li>

  //             {/* Contact */}
  //             <li>
  //               <Link
  //                 href="/contact"
  //                 className="px-4 py-3 text-white font-semibold text-[16px] transition hover:text-accent"
  //               >
  //                 Contact Us
  //               </Link>
  //             </li>
  //           </ul>

  //           {/* Right Side */}
  //           <div className="flex items-center gap-6 pl-6 border-l border-divider">
  //             {/* Shop Now (ARROW REMOVED) */}
  //             <Link href="/products" className="flex items-center">
  //               <Button variant="accent" className="rounded-full!">
  //                 Shop Now
  //               </Button>
  //             </Link>

  //             {/* User + Cart icons */}
  //             <div className="flex items-center gap-3">
  //               <Link
  //                 href="/cart"
  //                 className="flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent"
  //                 aria-label="Cart"
  //               >
  //                 <span className="text-[18px]">
  //                   <FaCartArrowDown />
  //                 </span>
  //               </Link>

  //               <Link
  //                 href="/account"
  //                 className="flex items-center justify-center h-9 w-9 rounded-full border border-white text-white transition hover:bg-white hover:text-accent"
  //                 aria-label="Account"
  //               >
  //                 <span className="text-[18px]">
  //                   <FaCircleUser />
  //                 </span>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Mobile Toggle */}
  //         <button
  //           className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-accent"
  //           onClick={() => setMobileOpen(!mobileOpen)}
  //           aria-label="Toggle navigation"
  //         >
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
  //               mobileOpen ? "rotate-45 translate-y-1.5" : ""
  //             }`}
  //           />
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded my-1 transition-all duration-300 ${
  //               mobileOpen ? "opacity-0" : ""
  //             }`}
  //           />
  //           <span
  //             aria-hidden="true"
  //             className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
  //               mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
  //             }`}
  //           />
  //         </button>
  //       </nav>

  //       {/* Mobile Menu */}
  //       {mobileOpen && (
  //         <div className="lg:hidden bg-accent transition-all duration-300">
  //           <nav className="px-4 py-3">
  //             <ul className="flex flex-col gap-1">
  //               {/* Home Dropdown */}
  //               <li>
  //                 <details className="group">
  //                   <summary className="flex justify-between items-center px-3 py-2 text-white font-semibold cursor-pointer">
  //                     Home
  //                     <span className="text-xs">
  //                       <FaChevronDown />
  //                     </span>
  //                   </summary>
  //                   <ul className="pl-4 mt-1 flex flex-col gap-1">
  //                     <li>
  //                       <Link
  //                         href="/"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Main
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/index-video"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Video
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/index-slider"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Home - Slider
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </details>
  //               </li>

  //               {/* About */}
  //               <li>
  //                 <Link
  //                   href="/about"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   About Us
  //                 </Link>
  //               </li>

  //               {/* Blog */}
  //               <li>
  //                 <Link
  //                   href="/blog"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   Blog
  //                 </Link>
  //               </li>

  //               {/* Pages Dropdown */}
  //               <li>
  //                 <details className="group">
  //                   <summary className="flex justify-between items-center px-3 py-2 text-white font-semibold cursor-pointer">
  //                     Pages
  //                     <span className="text-xs">
  //                       <FaChevronDown />
  //                     </span>
  //                   </summary>
  //                   <ul className="pl-4 mt-1 flex flex-col gap-1">
  //                     <li>
  //                       <Link
  //                         href="/blog-single"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Blog Details
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/features"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Features
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/testimonials"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         Testimonials
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/faqs"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         FAQs
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link
  //                         href="/404"
  //                         className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                       >
  //                         404
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </details>
  //               </li>

  //               {/* Contact */}
  //               <li>
  //                 <Link
  //                   href="/contact"
  //                   className="block px-3 py-2 text-white font-semibold hover:text-primary"
  //                 >
  //                   Contact Us
  //                 </Link>
  //               </li>

  //               {/* Mobile bottom row */}
  //               <li className="mt-3 border-t border-white/20 pt-4">
  //                 <div className="flex items-center justify-between gap-3">
  //                   {/* Shop */}
  //                   <Link href="/products" className="shrink-0">
  //                     <Button variant="primary" className="rounded-full">
  //                       Shop Now
  //                     </Button>
  //                   </Link>

  //                   {/* User + Cart */}
  //                   <div className="flex items-center gap-2">
  //                     <Link
  //                       href="/cart"
  //                       className="flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
  //                       aria-label="Cart"
  //                     >
  //                       <span className="text-[18px]">
  //                         <FaCartArrowDown />
  //                       </span>
  //                     </Link>
  //                     <Link
  //                       href="/account"
  //                       className="flex items-center justify-center h-9 w-9 border rounded-full border-white text-white hover:bg-white hover:text-accent transition"
  //                       aria-label="Account"
  //                     >
  //                       <span className="text-[18px]">
  //                         <FaCircleUser />
  //                       </span>
  //                     </Link>
  //                   </div>
  //                 </div>
  //               </li>
  //             </ul>
  //           </nav>
  //         </div>
  //       )}
  //     </div>
  //   </header>
  // );
}
