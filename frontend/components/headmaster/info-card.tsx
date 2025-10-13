
import { LucideProps } from "lucide-react";

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
}

export default function InfoCard({ title, value, icon: Icon, color }: InfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border-l-4" style={{ borderColor: color }}>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
