"use client";

import HeaderSwitcher from "./HeaderSwitcher";
import { LanguageProvider, useLanguage } from "./LanguageProvider";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayoutInner({ children }: MainLayoutProps) {
  const { language } = useLanguage();

  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={direction}
      className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#222222]"
    >
      <HeaderSwitcher />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <LanguageProvider>
      <MainLayoutInner>{children}</MainLayoutInner>
    </LanguageProvider>
  );
}
