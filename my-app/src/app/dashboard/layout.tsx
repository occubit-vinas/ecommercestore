import TopNavBar from "@/components/layout/dashboard/TopNavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
    <TopNavBar/>
    {children}
    </section>
}