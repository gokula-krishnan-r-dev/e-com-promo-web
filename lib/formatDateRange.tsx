// Function to format the date range
export const formatDateRange = (startDate: string, endDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedStartDate = new Date(startDate).toLocaleDateString(
    "en-US",
    options
  );
  const formattedEndDate = new Date(endDate).toLocaleDateString(
    "en-US",
    options
  );

  return `${formattedStartDate} - ${formattedEndDate}`;
};
