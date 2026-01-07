import "./globals.css";

export const metadata = {
  title: "JobNova",
  description: "Job Recommendation Board",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100 text-gray-900">
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-slate-50">
        {children}
      </body>
    </html>
  );
}

