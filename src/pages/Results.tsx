import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Footer from "../components/Footer";

interface ShapDetail {
  abs: number;
  feature: string;
  shap_value: number;
  value: number;
}

interface ApiResponse {
  explanation_text: string;
  label: string;
  probability: number;
  shap_details: ShapDetail[];
  threshold: number;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as any).response) {
      setData((location.state as any).response);
    } else {
      navigate("/"); 
    }
  }, [location, navigate]);

  if (!data) return null;

  const isPositive = data.label === "Yes";
  const probabilityPercent = (data.probability * 100).toFixed(2);

  return (
    <>
    <Navbar/>
    <Alert/>
    <div className="flex flex-col items-center justify-center min-h-screen mt-2 sm:p- w-[80vw] max-sm:w-[90vw] mx-auto">
      <div
        className={`w-full rounded-2xl shadow-lg sm:p-8 max-sm:py-4  text-center border ${
          isPositive
            ? "border-red-400 bg-red-50 text-red-700"
            : "border-green-400 bg-green-50 text-green-700"
        }`}
      >
        <h2 className="text-3xl font-bold mb-2">
          {isPositive
            ? "⚠️ You are at a risk of being diabetic"
            : "✅ You are not at a risk of being diabetic"}
        </h2>
        <p className="text-lg mb-4">
          <strong>Predicted Probability:</strong> {probabilityPercent}%
        </p>

        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="mt-4 py-2 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {showDetails ? "Hide Details" : "See Details"}
        </button>

        {showDetails && (
          <div className="mt-6 text-left bg-white p-4 rounded-lg shadow-inner border border-gray-200 w-full">
            <h3 className="text-xl font-semibold mb-2">Explanation:</h3>
            <p className="text-gray-700 mb-4">{data.explanation_text}</p>

            <h3 className="text-lg font-semibold mb-2">Feature Contributions:</h3>
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-3 py-2 text-left">Feature</th>
                  <th className="px-3 py-2 text-left">Value</th>
                  <th className="px-3 py-2 text-left">SHAP Value</th>
                </tr>
              </thead>
              <tbody>
                {data.shap_details.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-3 py-2">{item.feature}</td>
                    <td className="px-3 py-2">{item.value}</td>
                    <td
                      className={`px-3 py-2 ${
                        item.shap_value > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {item.shap_value.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/test")}
        className="my-4 py-2 px-6 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-800"
      >
        🔁 Test Again
      </button>
    </div>
    <Footer/>
    </>
  );
};

export default Results;
