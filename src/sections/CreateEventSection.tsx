import EventCreateEditForm from "@/components/EventCreateEditForm"

export default function CreateEventSection() {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="content-container">
                <h1 className="text-4xl font-bold mt-16 text-center">Create New Event</h1>
                <EventCreateEditForm />
            </div>
        </div>
    )
}