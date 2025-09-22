'use client'
 
import { useSearchParams } from 'next/navigation'

export default async function BMIPage() {
    const searchParams = useSearchParams()
    const uuid = searchParams.get('uuid')

    if (!uuid) {
        return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>No UUID provided.</p>
        </div>
        <a href="/" style={{ marginTop: "2rem", color: "#0070f3", textDecoration: "underline" }}>
            Back to Home
        </a>
        </div>
        );
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-bmi`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid }),
        cache: "no-store",
        });

        const data = await res.json();

        const nickname = data.nickname ?? null;
        const bmi = data.bmi ?? null;

        return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem" }}>
            <span style={{ fontSize: "1.2rem", color: "#666" }}>Your bmi is...</span>
            <span style={{ fontSize: "6rem", fontWeight: "bold", marginTop: "1rem" }}>
            {bmi ? bmi : "No BMI provided."}
            </span>
        </div>
        <a href="/" style={{ marginTop: "2rem", color: "#0070f3", textDecoration: "underline" }}>
            Back to Home
        </a>
        </div>
        );
    } catch (err) {
        return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem" }}>
            <h1 style={{ fontSize: "2rem", color: "#d32f2f" }}>BMI Result</h1>
            <p style={{ fontSize: "1.2rem", color: "#666", marginTop: "1rem" }}>Error fetching BMI 😿</p>
        </div>
        <a href="/" style={{ marginTop: "2rem", color: "#0070f3", textDecoration: "underline" }}>
            Back to Home
        </a>
        </div>
        );
    }
}
