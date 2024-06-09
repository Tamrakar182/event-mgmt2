"use client"

import { useRouter } from "next/navigation";
import Input from "./common/Input";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Snackbar from "./common/Snackbar";
import api from "@/utils/api";
import { useAuthContext } from "@/context/AuthProvider";

const EventSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
    const router = useRouter();
    const { handleLogin } = useAuthContext();

    const methods = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            email: "example@email.com",
            password: "password",
        },
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post("/login", data);
            if (res.data.success) {
                Snackbar.success("Successfully logged in.");
                handleLogin();
                router.push("/events");
                return;
            } else {
                Snackbar.error(res.data.message);
            }

        } catch (e: any) {
            if (e.response.data) {
                Snackbar.error(e.response.data.message);
            } else {
                Snackbar.error("An error occurred, please try again later.");
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Email"
                        name="email"
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        required
                    />
                </div>

                <button type="submit" className="w-full my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">
                    Login
                </button>
            </form>
        </FormProvider>
    );
}

export default LoginForm;