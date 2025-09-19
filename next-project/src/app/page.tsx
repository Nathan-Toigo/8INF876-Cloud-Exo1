import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <form className="flex flex-col gap-4 w-full max-w-xs" action="/api/bmi" method="post">
        <div>
          <label className="block mb-1 font-medium" htmlFor="weight">Weight</label>
          <input
          id="weight"
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your weight in kg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="height">Height</label>
          <input
          id="height"
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your height in cm"
          />
        </div>
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
