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
        <Link href="/" className="shrink-0 w-40 lg:w-64">
          <Image
            src="/images/new/logo-font-size-big.gif"
            alt="Prolixus Logo"
            width={180}
            height={50}
            className="h-12 w-auto object-contain scale-110 lg:scale-[1.5] origin-left"
            priority
            unoptimized
          />
        </Link>

        {/* Mobile Google Rating Ribbon - Only on mobile */}
        <div className="absolute lg:hidden right-4 top-full bg-primary border-x border-b border-divider rounded-b-xl px-3 py-2 shadow-xl flex items-center justify-center -mt-px z-40">
          <a
            href="https://www.google.com/search?sca_esv=c6b7077b8ab86951&rlz=1C1ONGR_enDE1204DE1204&sxsrf=APpeQnurCfikLS9oLVQhJBRDc0fnoiITvQ:1785787031260&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_1ZFmLJaom0GPH0-z1SqDoogD3LGPqb32wDEmmxEwO5ShbHrm5X5lwWTfOIzWKOr9g3lwUuIZDr_GftE5XCQWhc536Jv&q=Prolixus+GmbH+Reviews&sa=X&ved=2ahUKEwj61JGNn4WWAxVAzQIHHTgMLEwQ0bkNegQILBAH&biw=1366&bih=641&dpr=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <Image
              src="/images/new/Stars-01.svg"
              alt="5 Stars"
              width={54}
              height={11}
              className="h-auto w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6 gap-6 xl:gap-8">
          <ul className="flex items-center gap-1">
            {mainMenus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.url}
                  className="px-2 lg:px-3 xl:px-4 py-3 text-white font-semibold text-[14px] xl:text-[16px] transition hover:text-accent no-underline whitespace-nowrap"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            {/* Google Rating Badge */}
            <a
              href="https://www.google.com/search?sca_esv=c6b7077b8ab86951&rlz=1C1ONGR_enDE1204DE1204&sxsrf=APpeQnurCfikLS9oLVQhJBRDc0fnoiITvQ:1785787031260&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_1ZFmLJaom0GPH0-z1SqDoogD3LGPqb32wDEmmxEwO5ShbHrm5X5lwWTfOIzWKOr9g3lwUuIZDr_GftE5XCQWhc536Jv&q=Prolixus+GmbH+Reviews&sa=X&ved=2ahUKEwj61JGNn4WWAxVAzQIHHTgMLEwQ0bkNegQILBAH&biw=1366&bih=641&dpr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-0.5 hover:opacity-80 transition-opacity no-underline shrink-0"
            >
              <Image
                src="/images/new/Google.svg"
                alt="Google Rating"
                width={70}
                height={30}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/images/new/Stars-01.svg"
                alt="5 Stars"
                width={80}
                height={18}
                className="h-3 w-auto object-contain"
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
                      <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-primary font-bold shadow-lg border border-white">
                        {profile?.name?.charAt(0).toUpperCase() || <FaUser size={14} />}
                      </div>
                      <div className="hidden lg:flex flex-col items-start leading-none">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">{t("navbar_welcome", "Welcome")}</span>
                        <span className="font-bold text-sm">{profile?.name || t("navbar_user", "User")}</span>
                      </div>
                      <FaChevronDown className={`text-[10px] text-white/40 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 mt-3 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                          <div className="p-4 border-b border-white bg-primary">
                            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t("navbar_account_member", "Account Member")}</p>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/20">
                                {profile?.name?.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-bold text-white truncate">{profile?.name}</p>
                                <p className="text-xs text-white/50 truncate">
                                  {profile?.email}
                                </p>
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
                                <span className="font-semibold text-white">{t("navbar_dashboard", "Dashboard")}</span>
                                <span className="text-[10px] text-white/40">{t("navbar_dashboard_desc", "Manage your account")}</span>
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
                                <span className="font-semibold text-white">{t("navbar_profile_settings", "Profile Settings")}</span>
                                <span className="text-[10px] text-white/40">{t("navbar_profile_desc", "Update your information")}</span>
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
                              <span className="font-bold">{t("navbar_logout", "Logout")}</span>
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
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-primary font-bold shadow-lg border border-white transition-all"
                >
                  {profile?.name?.charAt(0).toUpperCase() || <FaUser size={14} />}
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      <div className="p-4 border-b border-white bg-gray-900">
                        <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t("navbar_account_member", "Account Member")}</p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/20">
                            {profile?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-bold text-white truncate">{profile?.name}</p>
                            <p className="text-xs text-white truncate">{profile?.email}</p>
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
                            <span className="font-semibold text-white">{t("navbar_dashboard", "Dashboard")}</span>
                            <span className="text-[10px] text-white/40">{t("navbar_dashboard_desc", "Manage your account")}</span>
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
                            <span className="font-semibold text-white">{t("navbar_profile_settings", "Profile Settings")}</span>
                            <span className="text-[10px] text-white/40">{t("navbar_profile_desc", "Update your information")}</span>
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
                          <span className="font-bold">{t("navbar_logout", "Logout")}</span>
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

      {/* Mobile Menu (Top-Down Dropdown - Auto Height) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden top-[80px]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 max-h-[calc(100vh-80px)] z-50 bg-primary shadow-2xl lg:hidden font-sans border-b border-white flex flex-col overflow-y-auto">
            <nav className="px-6 py-8 shrink">
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
            <div className="sticky bottom-0 p-6 border-t border-white/10 bg-primary shrink-0 mt-auto z-10 w-full">
              <div className="flex flex-col w-full">
                <span className="text-white/60 text-sm mb-3 font-medium">Language</span>
                <LanguageSwitcher variant="mobile" />
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
  //             <Link href="/subscribe" className="flex items-center">
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
  //                   <Link href="/subscribe" className="shrink-0">
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
