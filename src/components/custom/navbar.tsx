"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/funil", label: "Treino Personalizado" },
    { href: "/montador", label: "Montador de Treino" },
    { href: "/treinos", label: "Treinos IA" },
    { href: "/calorias", label: "Calorias" },
    { href: "/receitas", label: "Receitas" },
    { href: "/membros", label: "Área de Membros" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/00ecb78b-bbd4-416c-ab91-88e6351ca469.png" 
              alt="PerformGymX Logo" 
              className="h-10 w-auto invert"
            />
            <span className="text-xl font-bold text-white">PerformGym<span className="text-red-500">X</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/vendas"
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition-all"
            >
              Assinar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-gray-900"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/vendas"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-red-700 hover:to-red-600 transition-all mt-2"
              >
                Assinar Agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
