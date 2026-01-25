import React from "react";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fcf2f1] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-slate-700" />
              <h3 className="text-2xl font-bold">BookHaven</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover your next great read. From timeless classics to
              contemporary bestsellers, find books that inspire and transform.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/books"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">
                  Norzin Lam SE
                  <br />
                  Thimphu, Bhutan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  +975 2 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  info@bookhaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {currentYear} BookHaven. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
