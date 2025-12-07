'use client';

import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/button';
// @ts-ignore
import { createPortal } from "react-dom";

export default function MobileFilter({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when filter is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-auto flex items-center gap-2 border-neutral-200 hover:bg-neutral-50 hover:text-brand transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filters
      </Button>

      {/* Drawer Portal */}
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-[100] flex justify-end sm:justify-start">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <div className="relative w-full sm:w-[350px] bg-white h-full shadow-2xl animate-in slide-in-from-right sm:slide-in-from-left duration-300 flex flex-col">

              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-neutral-100 bg-white sticky top-0 z-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-display font-bold text-neutral-900">Filters</h2>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {children}
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-neutral-100 bg-surface gap-3 flex">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.search = '';
                    window.location.href = url.toString();
                  }}
                  className="border-neutral-200"
                >
                  Reset
                </Button>
                <Button
                  fullWidth
                  onClick={() => setIsOpen(false)}
                  className="shadow-lg shadow-primary/20"
                >
                  Show Results
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

// Simple Portal Component
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
