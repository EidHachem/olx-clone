import HeaderSwitcher from "./HeaderSwitcher";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#222222]">
      <HeaderSwitcher />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}
