
import Sidebar from "@/components/headmaster/sidebar";
import Navbar from "@/components/headmaster/navbar";
import Footer from "@/components/headmaster/footer";

export default function HeadmasterLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
