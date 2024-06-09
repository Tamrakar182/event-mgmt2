import EventCreateEditForm from "@/components/EventCreateEditForm"
import Link from "next/link"

export default function CreateEventSection() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center">
            <div className="content-container">
            <div className="mt-16 mb-10">
                    <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
                    <Link href="/events">Event List</Link> • <span className="text-slate-400">Create Event</span>
                </div>
                <EventCreateEditForm />
            </div>
        </div>
    )
}