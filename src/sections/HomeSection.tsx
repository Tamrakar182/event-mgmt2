"use client";
import { useRouter } from 'next/navigation';

export default function HomeSection() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/events')
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <h1 className="py-4 text-center">
                <span className="text-3xl">📚Event Management Platform⌚</span>
            </h1>
            <button onClick={handleClick} className="bg-white text-black p-4 rounded-lg hover:bg-slate-200">Go to Events</button>
        </div>
    )
}