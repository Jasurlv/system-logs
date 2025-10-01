import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    type?: "success" | "error";
    duration?: number; 
};

function Toast({ message, type = "success", duration = 3000 }: ToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);


    return (
        <div
            className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white z-50 
            transform transition-all duration-500 ease-in-out
            ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
            ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
            {message}
        </div>
    )
}

export default Toast