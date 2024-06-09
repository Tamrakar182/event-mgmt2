"use client";
import useEvents from '@/hooks/useEvents';
import { useRouter } from 'next/navigation';

export default function EventListSection() {
    const { data, isLoading, error } = useEvents();
    const router = useRouter();

    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error: {error.message}</div>)
    if (!data) return (<div>No data</div>)

    const onEdit = (id: string) => {
        router.push(`/events/${id}`)
    }

    const onDelete = (id: string) => {
        console.log('Delete', id);
    }

    const onCreate = () => {
        router.push('/events/create')
    }

    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="content-container">
                <h1 className="text-4xl font-bold mt-16 text-center">Event list</h1>
                <div className="w-full flex flex-row justify-end py-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onCreate}
                    >Create Event</button>
                </div>
                <div className="relative overflow-x-auto my-16">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">SN.</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Start Date</th>
                                <th className="px-4 py-2">End Date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event, index) => (
                                <tr key={event.id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{event.title}</td>
                                    <td className="border px-4 py-2 text-center">{event.description}</td>
                                    <td className="border px-4 py-2 text-center">{event.startDate}</td>
                                    <td className="border px-4 py-2 text-center">{event.endDate}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex flex-row items-center justify-center gap-4">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
                                                onClick={() => onEdit(event.id)}
                                            >✏</button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
                                                onClick={() => onDelete(event.id)}
                                            >🚮</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}