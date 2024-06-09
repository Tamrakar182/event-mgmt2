"use client";
import useEvents from '@/hooks/useEvents';
import { useEffect, useState } from 'react';
import { IEvent } from '@/types/event';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';

export default function EventListSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [query, setQuery] = useState({ searchTerm: '', startDate: '', endDate: '' });

    const router = useRouter();

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedStartDate = useDebounce(startDate, 500);
    const debouncedEndDate = useDebounce(endDate, 500);

    useEffect(() => {
        setQuery({ searchTerm: debouncedSearchTerm, startDate: debouncedStartDate, endDate: debouncedEndDate });
    }, [debouncedSearchTerm, debouncedStartDate, debouncedEndDate]);

    const { data, isLoading, error, removeEvent } = useEvents(query);

    if (error) return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-3xl gap-4">
            Error: {error.message}
            <Link href="/">Go back to home</Link>
        </div>
    )

    const onEdit = (id: string) => {
        router.push(`/events/${id}/edit`)
    }

    const onDelete = (event: IEvent) => {
        removeEvent(event);
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
                <input
                    type="text"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ring-1 ring-gray-500 mt-4 text-black rounded-sm p-3 shadow-md w-full"
                />
                <div className="flex sm:flex-row gap-4 pt-8 flex-col">
                    <div className="w-full">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            className="ring-1 ring-gray-500 text-black rounded-sm p-3 shadow-md w-full"
                        />
                    </div>
                    <div className="w-full">
                        <label>End Date:</label>
                        <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            className="ring-1 ring-gray-500 text-black rounded-sm p-3 shadow-md w-full"
                        />
                    </div>
                </div>
                {isLoading || !data
                    ?
                    <div className="flex items-center justify-center my-16 min-h-72">
                        Loading...
                    </div>
                    :
                    <div className="relative overflow-x-auto my-16">
                        <table className="w-full text-sm min-w-[600px]">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">SN.</th>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2">Total Participants</th>
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
                                        <td className="border px-4 py-2 text-center">{event.totalParticipants}</td>
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
                                                    onClick={() => onDelete(event)}
                                                >🚮</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}