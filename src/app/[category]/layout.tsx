// app/auth/layout.tsx
export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="md:py-4">{children}</div>;
}
