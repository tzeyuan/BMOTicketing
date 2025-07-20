import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ReportSummary.css";

interface TicketSummary {
  sold: number;
  price: number;
}

interface EventReport {
  title: string;
  date: string;
  tickets: Record<string, TicketSummary>;
  totalSales: number;
}

const ReportSummary = () => {
  const [summary, setSummary] = useState<{
    totalSales: number;
    totalTickets: number;
    events: EventReport[];
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
    if (!isAdmin) navigate("/");

    fetch("http://localhost:5000/api/reports/summary")
      .then((res) => res.json())
      .then(setSummary)
      .catch(() => alert("Failed to load report."));
  }, [navigate]);

  if (!summary) return <div className="report-page">Loading report...</div>;

  return (
    <div className="report-page">
      <h2>Monthly Report Summary</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Total Tickets Sold</th>
            <th>Total Sales (MYR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{summary.totalTickets}</td>
            <td>{summary.totalSales.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {summary.events.map((ev, idx) => (
        <div key={idx} className="event-report">
          <h3>{ev.title} ({ev.date})</h3>
          <table className="event-table">
            <thead>
              <tr>
                <th>Ticket Type</th>
                <th>Sold</th>
                <th>Revenue (MYR)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ev.tickets).map(([type, stats], i) => (
                <tr key={i}>
                  <td>{type}</td>
                  <td>{stats.sold}</td>
                  <td>{(stats.sold * stats.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="event-total">
                <td colSpan={2}><strong>Total Sales</strong></td>
                <td><strong>{ev.totalSales.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ReportSummary;
