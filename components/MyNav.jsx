"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import UserMenu from "@/components/UserMenu";
import { HeartIcon, UserIcon, LogOutIcon, LogInIcon, VideoIcon, CalendarIcon, ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getSession, clearSession } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";



export default function MyNav() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getSession());
    }

    // Load cart count
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('temple_cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    // Listen for storage changes (cart updates)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for same-page cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    router.push('/');
  };

  const navItems = [
    {
      name: t('nav.home'),
      link: "/",
    },
    {
      name: t('nav.about'),
      link: "/about",
    },
    {
      name: t('nav.visit'),
      link: "/howtoreachus",
    },
    {
      name: language === 'en' ? 'Services & Aarti' : 'सेवाएं और आरती',
      link: "/services",
    },
    {
      name: t('nav.events'),
      link: "/events",
    },
    {
      name: t('nav.gallery'),
      link: "/media"
    },
    {
      name: t('nav.shop'),
      link:"/shop"
    },
    {
      name: t('nav.contact'),
      link: "/contact",
    }
  ];

  return (
    <div className="relative w-full bg-white shadow-sm z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

            <div className="grid grid-cols-3 gap-4 items-center">
              <UserMenu user={user} onLogout={handleLogout} t={t} language={language} />

              {/* Cart Icon */}
              <Link href="/cart" className="relative">
                <button className="flex items-center justify-center p-2 hover:bg-sandalwood/10 rounded-sm transition-colors relative">
                  <ShoppingCart size={20} className="text-deep-brown" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-sandalwood text-ivory text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              <NavbarButton className="flex items-center justify-center bg-sandalwood hover:bg-deep-brown text-ivory border-sandalwood" variant="primary">
                <HeartIcon size={16} fill="currentColor" className="mr-2" />
                {t('nav.donate')}
              </NavbarButton>
            </div>
        
         
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-deep-brown hover:text-sandalwood transition-colors font-light">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              {/* Language Switcher in Mobile */}
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-sandalwood hover:bg-deep-brown text-ivory">
                <HeartIcon size={16} fill="currentColor" className="mr-2 inline" />
                {t('nav.donate')}
              </NavbarButton>
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-sandalwood/5 rounded-sm border border-sandalwood/15">
                    <UserIcon size={16} className="text-sandalwood" />
                    <span className="text-sm font-light text-deep-brown">{user.name}</span>
                  </div>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/my-bookings');
                    }}
                    variant="outline"
                    className="w-full border-sandalwood/30 text-deep-brown hover:bg-sandalwood/5">
                    <CalendarIcon size={16} className="mr-2 inline" />
                    {language === 'en' ? 'My Bookings' : 'मेरी बुकिंग'}
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/my-aartis');
                    }}
                    variant="outline"
                    className="w-full border-sandalwood/30 text-deep-brown hover:bg-sandalwood/5">
                    <VideoIcon size={16} className="mr-2 inline" />
                    {t('nav.myAartis')}
                  </NavbarButton>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-sm font-light hover:bg-red-100 transition-colors flex items-center justify-center">
                    <LogOutIcon size={16} className="mr-2" />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/auth/login');
                  }}
                  variant="outline"
                  className="w-full border-sandalwood/30 text-deep-brown hover:bg-sandalwood/5">
                  <LogInIcon size={16} className="mr-2 inline" />
                  {t('nav.login')}
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
