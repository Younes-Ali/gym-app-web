import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import ChartCard from "../components/charts/ChartCard";
import MembershipPieChart from "../components/charts/MembershipPieChart";
import StatusBarChart from "../components/charts/StatusBarChart";
import AttendanceTrendChart from "../components/charts/AttendanceTrendChart";
import TopTrainersChart from "../components/charts/TopTrainersChart";
import { api } from "../api/client";
import { useGym } from "../context/GymContext";

export default function AnalyticsPage() {
  const { members } = useGym();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.analytics().then(setData).catch(() => {});
  }, [members]);

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Visual breakdown of gym performance and attendance" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Membership Types">
          <MembershipPieChart data={data?.membership_distribution} />
        </ChartCard>
        <ChartCard title="Active vs Expired Members">
          <StatusBarChart
            active={data?.status_distribution?.active ?? 0}
            expired={data?.status_distribution?.expired ?? 0}
          />
        </ChartCard>
        <ChartCard title="Attendance - Last 7 Days">
          <AttendanceTrendChart data={data?.attendance_trend} />
        </ChartCard>
        <ChartCard title="Top Trainers by Members">
          <TopTrainersChart data={data?.top_trainers} />
        </ChartCard>
      </div>
    </div>
  );
}
