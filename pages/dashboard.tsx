import DashboardLayout from "@/components/layouts/DashboardLayout";

const Dashboard = () => {
    return <div>Dashboard goes here</div>
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout>;

export default Dashboard;