export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8 max-w-7xl min-w-80 mx-auto flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
