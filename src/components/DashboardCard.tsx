export function DashboardCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold leading-tight">{value}</div>
      {note && (
        <div className="text-[11px] text-gray-500 mt-1 leading-snug">
          {note}
        </div>
      )}
    </div>
  );
}
