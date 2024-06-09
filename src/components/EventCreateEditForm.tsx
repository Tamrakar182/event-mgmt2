"use client"

import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";
import Input from "./common/Input";
import { useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Snackbar from "./common/Snackbar";
import api from "@/utils/api";

interface Props {
    event?: IEvent;
}

const EventSchema: ZodType<Omit<IEvent, 'id'>> = z.object({
    title: z.string().min(1, "Event Title is required"),
    description: z.string().min(1, "Event Description is required"),
    totalParticipants: z.number().min(1, "Total Participants must be at least 1"),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
});

const EventCreateEditForm = ({ event }: Props) => {
    const router = useRouter();

    const defaultValue = useMemo(() => ({
        title: event?.title || '',
        description: event?.description || '',
        totalParticipants: event?.totalParticipants || 0,
        startDate: event?.startDate || '',
        endDate: event?.endDate || '',
    }), [event])

    const methods = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: defaultValue,
    });

    const {
        handleSubmit,
        reset,
    } = methods;

    useEffect(() => {
        if (event) {
            reset(defaultValue);
        }
    }, [event, defaultValue, reset]);


    const onSubmit = async (data: any) => {
        try {
            if (event) {
                const res = await api.put(`/auth/events/${event.id}/`, data);
                if (res.data.success) {
                    Snackbar.success("Successfully updated the event.");
                    router.push("/events");
                    return;
                } else {
                    Snackbar.error(res.data.message);
                }
            }
            const res = await api.post("/auth/events/", data);
            if (res.data.success) {
                Snackbar.success("Successfully added the new event.");
                router.push("/events");
                return;
            } else {
                Snackbar.error(res.data.message);
            }

        } catch (e) {
            Snackbar.error("Failed to add the new item.");
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Event Title"
                        name="title"
                        required
                    />

                    <Input
                        label="Event Description"
                        name="description"
                        required
                    />

                    <Input
                        label="Total Participants"
                        name="totalParticipants"
                        type="number"
                        required
                    />

                    <div className="flex flex-col gap-3 w-full sm:flex-row">
                        <Input
                            label="Start Date"
                            name="startDate"
                            type="date"
                            required
                        />
                        <Input
                            label="End Date"
                            name="endDate"
                            type="date"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">
                    Submit
                </button>
            </form>
        </FormProvider>
    );
}

export default EventCreateEditForm;