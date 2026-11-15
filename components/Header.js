"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import mainLogo from "@/public/images/main-logo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSession } from "next-auth/react";

import MobileMenuBarIcon from "@/public/images/menu-bar-mobile.png";
import MobileMenuBarCross from "@/public/images/close-menu.png";

import Menu from "./api/menuApi";
import HeaderNav from "./HeaderNav";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthOrHome = pathname === '/' || pathname === '/signin' || pathname === '/login' || pathname === '/signup';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerRef = useRef(null);
  const [menuData] = useState(Menu);

  useEffect(() => {
    if (isAuthOrHome) return;
    const header = headerRef.current;
    if (!header) return;

    if (window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "150px top",
        toggleClass: { targets: header, className: "scrolled" },
        onEnter: () => {
          gsap.to(header, {
            y: 0,
            duration: 0.8,
            ease: "power3.in",
            onStart: () => {
              header.style.position = "sticky";
              header.style.top = "0";
              header.style.left = "0";
              header.style.width = "100%";
              header.style.zIndex = "999";
              header.style.transition = "transform 0.8s ease";
            },
          });
        },
      });
    }
  }, [pathname]);

  if (isAuthOrHome) return null;

  return (
    <header ref={headerRef} className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo-wrap">
            <Link href="/">
              <Image
                src={mainLogo}
                alt="Royel Turf & Swimming Zone Logo"
                width={1000}
                className="header__logo"
              />
            </Link>
          </div>


          <nav className="header__nav-wrap header__nav-wrap--desktop">
            <HeaderNav menuDataAtt={menuData} />

            {session?.user ? (
              <Link href={'/dashboard'} className="header__user-name">
                {session.user.name}
              </Link>
            ) : (
              <Link href="/signin">
                <span className="primary-button">লগইন</span>
              </Link>
            )}

            <Link href="/#booking">
              <span className="primary-button">বুক করুন</span>
            </Link>
          </nav>


          <div className="header__mobile-menu" onClick={toggleMenu}>
            <Image
              className="header__mobile-menu-bar"
              src={MobileMenuBarIcon}
              alt="mobile nav bar icon"
            />
          </div>


          {isMenuOpen && (
            <div className="header__mobile">
              <div className="header__mobile-header">
                <div className="header__logo-wrap">
                  <Link href="/" onClick={toggleMenu}>
                    <Image
                      src={mainLogo}
                      alt="Royel Turf & Swimming Zone Logo"
                      width={2000}
                      className="header__logo"
                    />
                  </Link>
                </div>

                <div
                  className="header__mobile-menu-cross-wrap"
                  onClick={toggleMenu}
                >
                  <Image
                    className="header__mobile-menu-cross"
                    src={MobileMenuBarCross}
                    alt="close menu"
                  />
                </div>
              </div>

              <nav className="header__nav-wrap header__nav-wrap--mobile">
                <Link href="/" onClick={toggleMenu}>
                  <span className="header__nav-item">হোম</span>
                </Link>
                <Link href="/aboutus" onClick={toggleMenu}>
                  <span className="header__nav-item">আমাদের সম্পর্কে</span>
                </Link>
                <Link href="/facilities" onClick={toggleMenu}>
                  <span className="header__nav-item">সুবিধাসমূহ</span>
                </Link>
                <Link href="/gallery" onClick={toggleMenu}>
                  <span className="header__nav-item">গ্যালারি</span>
                </Link>
                <Link href="/contactus" onClick={toggleMenu}>
                  <span className="header__nav-item">যোগাযোগ</span>
                </Link>

                {session?.user ? (
                  <Link href="/dashboard" onClick={toggleMenu}>
                    <span className="header__nav-item header__user-name">
                      {session.user.name}
                    </span>
                  </Link>
                ) : (
                  <Link href="/signin" onClick={toggleMenu}>
                    <span className="primary-button header__nav-item-button--mobile">
                      লগইন
                    </span>
                  </Link>
                )}
                <Link href="/#booking" onClick={toggleMenu}>
                  <span className="header__nav-item">বুক করুন</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
