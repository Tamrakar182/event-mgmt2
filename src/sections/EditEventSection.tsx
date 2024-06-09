"use client";
import EventCreateEditForm from "@/components/EventCreateEditForm";
import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";
import Link from "next/link";

export default function EditEventSection() {
    const params: {
        id: string;
    } = useParams();

    const { data, isLoading, error } = useEvent(params.id);

    if (isLoading) {
        return <div className="min-h-screen w-full flex items-center justify-center text-3xl">Loading...</div>
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-3xl gap-4">
                Error: {error.message}
                <Link href="/events">Go back to events</Link>
            </div>
        )
    }

    if (!data) {
        return <div className="min-h-screen w-full flex items-center justify-center text-3xl">No data</div>
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center">
            <div className="content-container">
                <div className="mt-16 mb-10">
                    <h1 className="text-4xl font-bold mb-2">Edit Existing Event</h1>
                    <Link href="/events">Event List</Link> • <span className="text-slate-400">Edit Event</span>
                </div>
                <EventCreateEditForm event={data} />
            </div>
        </div>
    )
}