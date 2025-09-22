'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Record = {
  uuid: string;
  nickname: string;
  weight: number;
  height: number;
  bmi: string;
  date: string;
};

export default function BMIPage() {
    const searchParams = useSearchParams()
    const uuid = searchParams.get('uuid')

    const [nickname, setNickname] = useState<string | null>(null)
    const [bmi, setBmi] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const allBmi = loadAllBmi();


    useEffect(() => {
        if (!uuid) {
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-bmi`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ uuid }),
                    cache: "no-store",
                })

                const data = await res.json()
                setNickname(data.nickname ?? null)
                setBmi(data.bmi)
            } catch (err) {
                setError("Error fetching BMI data.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [uuid])

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
        )
    }

    if (loading) {
        return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Loading your BMI...</p>
        </div>
        )
    }

    if (error) {
        return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem" }}>
                <h1 style={{ fontSize: "2rem", color: "#d32f2f" }}>BMI Result</h1>
                <p style={{ fontSize: "1.2rem", color: "#666", marginTop: "1rem" }}>{error}</p>
            </div>
            <a href="/" style={{ marginTop: "2rem", color: "#0070f3", textDecoration: "underline" }}>
                Back to Home
            </a>
        </div>
        )
    }

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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>BMI Details</h2>
            <table style={{ borderCollapse: "collapse", minWidth: "350px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nickname</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>BMI</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Height</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {allBmi && allBmi.length > 0 ? (
                        allBmi.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.nickname ?? "N/A"}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.bmi ?? "N/A"}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.height ?? "N/A"}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.weight ?? "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                                No BMI records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

function loadAllBmi(): Record[] | null {
    const [allBmi, setAllBmi] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchAllBmi = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-bmi`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                })
                const data = await res.json()
                const records: Record[] = JSON.parse(data.records);

                records.forEach((r) => {
                    console.log(r.nickname, r.bmi);
                });

                setAllBmi(records)

            } catch (err) {
                // Optionally handle error
            }
        }
        fetchAllBmi()
    }, []);
    return allBmi;
}
