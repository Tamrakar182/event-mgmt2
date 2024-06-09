"use client";
import EventCreateEditForm from "@/components/EventCreateEditForm";
import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";

export default function EditEventSection() {
    const params: {
        id: string;
    } = useParams();

    const { data, isLoading, error } = useEvent(params.id);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!data) {
        return <div>No data</div>
    }

    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="content-container">
                <h1 className="text-4xl font-bold mt-16 text-center">Edit Existing Event</h1>
                <EventCreateEditForm event={data} />
            </div>
        </div>
    )
}