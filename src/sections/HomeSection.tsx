import LoginForm from '@/components/LoginForm';

export default function HomeSection() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <h1 className="py-4 text-center">
                <span className="text-4xl">📚Event Management Platform⌚</span>
            </h1>
            <LoginForm />
        </div>
    )
}