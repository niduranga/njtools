import React, { useState, useRef } from 'react';

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [statusMessage, setStatusMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("sending");

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "4e85a91b-8c0c-4962-bdd5-0831f28c1b07");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setStatusMessage("Message sent! I'll get back to you shortly.");
                formRef.current?.reset();
                setTimeout(() => setStatus("idle"), 6000);
            } else {
                throw new Error(data.message || "Submission failed");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setStatus("error");
            setStatusMessage("Something went wrong. Please try again later.");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const inputClasses = `
        w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl
        outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
        transition-all duration-200 placeholder:text-slate-400 text-slate-700
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    return (
        <div className="w-full flex flex-col justify-center items-center bg-slate-50 p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60">
                    <header className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-800">Get in touch</h3>
                        <p className="text-slate-500 mt-1">Have a project in mind? Let's talk.</p>
                    </header>

                    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-600 mb-2 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                disabled={status === "sending"}
                                className={inputClasses}
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-600 mb-2 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="hello@company.com"
                                required
                                disabled={status === "sending"}
                                className={inputClasses}
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="message" className="block text-sm font-semibold text-slate-600 mb-2 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Tell me a bit about your goals..."
                                required
                                disabled={status === "sending"}
                                className={`${inputClasses} resize-none`}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group relative w-full bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-xl shadow-slate-900/10"
                        >
                            <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${status === "sending" ? "-translate-y-12" : "translate-y-0"}`}>
                                Send Message
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>

                            {status === "sending" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-600">
                                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                        </button>

                        {status !== "idle" && status !== "sending" && (
                            <div
                                role="alert"
                                className={`p-4 rounded-xl text-sm font-medium text-center animate-in fade-in slide-in-from-top-2 duration-300 ${
                                    status === "success"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                        : "bg-rose-50 text-rose-700 border border-rose-100"
                                }`}>
                                {statusMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}