"use client";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
        Welcome to the BMI Calculator!
      </h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Enter your nickname, weight, and height to calculate your Body Mass Index.
      </p>
      <form className="flex flex-col gap-4 w-full max-w-xs" action="/api/send-bmi" method="POST">
        <div>
          <label className="block mb-1 font-medium" htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your nickname"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="weight">Weight</label>
          <input
            id="weight"
            name="weight"
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your weight in kg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="height">Height</label>
          <input
            id="height"
            name="height"
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your height in cm"
          />
        </div>
        {errorCode === "1" && (
            <div className="bg-black border border-red-600 text-red-400 px-4 py-2 rounded w-full max-w-xs text-center mb-2">
            Enter valid parameters
            </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
