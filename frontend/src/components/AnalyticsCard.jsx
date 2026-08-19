function AnalyticsCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>

          {description && (
            <p className="text-xs text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default AnalyticsCard;