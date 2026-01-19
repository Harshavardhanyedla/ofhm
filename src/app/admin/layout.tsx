import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            <AdminSidebar />
            <main className="flex-grow p-12 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
