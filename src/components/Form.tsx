
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Payload = {
  Age: number;
  Polyuria: number;
  Polydipsia: number;
  sudden_weight_loss: number;
  weakness: number;
  Polyphagia: number;
  Genital_thrush: number;
  visual_blurring: number;
  Itching: number;
  Irritability: number;
  delayed_healing: number;
  partial_paresis: number;
  muscle_stiffness: number;
  Alopecia: number;
  Obesity: number;
};

export default function Form() {
  const navigate = useNavigate();
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<string>(""); 
  const [weight, setWeight] = useState<string>(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
  const [fields, setFields] = useState<Record<string, number>>({
    Polyuria: 0,
    Polydipsia: 0,
    sudden_weight_loss: 0,
    weakness: 0,
    Polyphagia: 0,
    Genital_thrush: 0,
    visual_blurring: 0,
    Itching: 0,
    Irritability: 0,
    delayed_healing: 0,
    partial_paresis: 0,
    muscle_stiffness: 0,
    Alopecia: 0,
  });

  const questions: { key: keyof typeof fields; label: string }[] = [
    { key: "Polyuria", label: "Do you urinate frequently?" },
    { key: "Polydipsia", label: "Do you feel unusually thirsty?" },
    { key: "sudden_weight_loss", label: "Have you experienced sudden weight loss?" },
    { key: "weakness", label: "Do you feel unusual weakness or fatigue?" },
    { key: "Polyphagia", label: "Do you feel unusually hungry often?" },
    { key: "Genital_thrush", label: "Have you experienced genital itching or thrush?" },
    { key: "visual_blurring", label: "Have you had blurred vision recently?" },
    { key: "Itching", label: "Do you have frequent itching?" },
    { key: "Irritability", label: "Have you felt increased irritability?" },
    { key: "delayed_healing", label: "Do cuts/injuries take longer to heal?" },
    { key: "partial_paresis", label: "Have you experienced partial loss of muscle function?" },
    { key: "muscle_stiffness", label: "Do you have muscle stiffness?" },
    { key: "Alopecia", label: "Have you noticed unusual hair loss?" },
  ];

  function setFieldValue(key: string, value: number) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function computeObesity(): number {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!isFinite(h) || !isFinite(w) || h <= 0) return 0;
    const bmi = w / (h * h);
    return bmi > 25 ? 1 : 0;
  }

  function validate(): string | null {
    if (age === "" || Number.isNaN(Number(age))) return "Please enter age.";
    if (typeof age === "number" && (age < 0 || age > 100)) return "Age must be between 0 and 100.";
    
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (height.trim() === "" || Number.isNaN(h) || h <= 0) return "Please enter height in meters (e.g. 1.75).";
    if (weight.trim() === "" || Number.isNaN(w) || w <= 0) return "Please enter weight in kilograms (e.g. 70.5).";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const obesity = computeObesity();

    const payload: Payload = {
      Age: Number(age),
      Polyuria: fields.Polyuria,
      Polydipsia: fields.Polydipsia,
      sudden_weight_loss: fields.sudden_weight_loss,
      weakness: fields.weakness,
      Polyphagia: fields.Polyphagia,
      Genital_thrush: fields.Genital_thrush,
      visual_blurring: fields.visual_blurring,
      Itching: fields.Itching,
      Irritability: fields.Irritability,
      delayed_healing: fields.delayed_healing,
      partial_paresis: fields.partial_paresis,
      muscle_stiffness: fields.muscle_stiffness,
      Alopecia: fields.Alopecia,
      Obesity: obesity,
    };

    setLoading(true);
    try {
      const res = await fetch("https://diabetes-risk-predictor-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

     
      if (!res.ok) {
        const msg = data?.message || `Server returned ${res.status}`;
        throw new Error(msg);
      }

     
      navigate("/results", { state: { payload, response: data } });
    } catch (err: any) {
      setError(err?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[80vw] mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-6">
      <h2 className="text-4xl font-semibold mb-4">Diabetes Risk Assessmesnt Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Age (years)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-40 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 45"
            required
          />
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Height (meters)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 1.75"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-md text-gray-500 mt-1">Enter height in meters (e.g. 1.75).</p>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70.5"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-md text-gray-500 mt-1">Enter weight in kilograms.</p>
          </div>
        </div>

        {/* Questions */}
        <div className="grid grid-cols-1 gap-4">
          {questions.map((q) => (
            <fieldset key={q.key} className="border rounded-md p-3">
              <legend className="text-lg font-medium text-gray-800">{q.label}</legend>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex items-center gap-2 text-md">
                  <input
                    type="radio"
                    name={q.key}
                    value="1"
                    checked={fields[q.key] === 1}
                    onChange={() => setFieldValue(q.key, 1)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span>Yes</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.key}
                    value="0"
                    checked={fields[q.key] === 0}
                    onChange={() => setFieldValue(q.key, 0)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </fieldset>
          ))}
        </div>

        {error && <p className="text-lg text-red-600">{error}</p>}

        <div className="flex items-center gap-3 text-xl">
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 px-4 py-2 rounded-md text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          
        </div>
      </form>
    </div>
  );
}
