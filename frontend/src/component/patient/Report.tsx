import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getReport } from '../../api/userapi/report'

function Report() {
  const location = useLocation();
  const { appointmentId } = location.state;
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await getReport(appointmentId);
        setReportContent(result?.content || 'No report found');
      } catch (error) {
        console.error('Error fetching report:', error);
        setReportContent('Failed to load report.');
      }
    };

    if (appointmentId) {
      fetchReport();
    }
  }, [appointmentId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Patient Report</h2>
      <div
        className="bg-white p-4 rounded shadow prose max-w-full"
        dangerouslySetInnerHTML={{ __html: reportContent }}
      />
    </div>
  );
}

export default Report;
