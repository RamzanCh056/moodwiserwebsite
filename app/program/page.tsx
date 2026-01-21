import type { Metadata } from "next";
import ProgramContent from "./ProgramContent";

export const metadata: Metadata = {
    title: "21 Day Anxiety Program & Calm App | Emotions Are Wisdom – MoodWiser",
    description: "A 21-day anxiety program and daily Calm app designed to reduce stress, pressure, and emotional overload. Voice-guided, non-medical, and simple to use.",
    keywords: "21-day anxiety program, emotional wellness program, anxiety and stress relief, calm mind program, emotional regulation, daily calm practice, anxiety without medication",
    openGraph: {
        title: "Emotions Are Wisdom - 21 Day Anxiety Program",
        description: "Stop fighting anxiety. Start understanding it. A guided audio journey to reclaim calm.",
        images: ['/moodwiser.jpeg'],
    },
};

export default function ProgramPage() {
    return <ProgramContent />;
}
