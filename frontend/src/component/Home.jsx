import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortIndex, setSortIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://sheets.googleapis.com/v4/spreadsheets/1vwc803C8MwWBMc7ntCre3zJ5xZtG881HKkxlIrwwxNs/values/Sheet1!A1:I2000?key=AIzaSyAs_XknzjyclT7eJ2ZCq8W-NB4HsMpBQlQ";

      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.values) {
          setData(json.values);
        } else {
          console.error("No data found in the response:", json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Sorting logic
  const handleSort = (index) => {
    const sortedData = [...data.slice(1)];
    sortedData.sort((a, b) => {
      const valA = a[index] || "";
      const valB = b[index] || "";

      if (sortOrder === "asc") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });

    setData([data[0], ...sortedData]);
    setSortIndex(index);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Search filter logic
  const filteredData = data.filter((row, rowIndex) => {
    if (rowIndex === 0 || searchQuery === "") return true;
    const domainColumnIndex = 2;
    return row[domainColumnIndex]
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 mx-6 mb-[20px]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Google Spreadsheet Data
          <div className="rounded w-36 h-1 bg-gray-400 mt-2 mx-auto"></div>
        </h1>

        <input
          type="text"
          placeholder="Search by domain..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-80"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {data[0]?.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      {header}
                      <button
                        onClick={() => handleSort(index)}
                        className="ml-2 text-xs text-blue-500 underline"
                      >
                        Sort
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
