import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
        } catch (error) {
            console.log(error)
            setStatus("error");
            setStatusMessage("Something went wrong. Please try again later.");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const inputClasses = `
        w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-4 rounded-2xl
        outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600
        transition-all duration-300 placeholder:text-slate-400 dark:text-white font-bold text-sm
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2 ml-1 group-focus-within:text-blue-600 transition-colors";

    return (
        <div className="w-full flex flex-col justify-center items-center py-1">
            <div className="w-full max-w-xl mx-auto px-4">
                <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">

                    {/* Header */}
                    <header className="mb-10 relative">
                        <div className="absolute -left-4 top-0 w-1 h-12 bg-blue-600 rounded-full" />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">
                            Get in <span className="text-blue-600">touch</span>
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Have a tool in mind? Let's build something epic.</p>
                    </header>

                    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
                        <div className="group">
                            <label htmlFor="name" className={labelClasses}>Full Name</label>
                            <input
                                id="name" type="text" name="name" placeholder="E.g. Niduranga Jayayarathna"
                                required disabled={status === "sending"} className={inputClasses}
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="email" className={labelClasses}>Email Address</label>
                            <input
                                id="email" type="email" name="email" placeholder="hello@njtools.xyz"
                                required disabled={status === "sending"} className={inputClasses}
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="message" className={labelClasses}>Project Details</label>
                            <textarea
                                id="message" name="message" rows={4}
                                placeholder="Briefly describe your goals or tool requirements..."
                                required disabled={status === "sending"}
                                className={`${inputClasses} resize-none`}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group relative w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-300 text-white font-black py-5 rounded-[2rem] transition-all duration-300 active:scale-[0.98] overflow-hidden shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs italic"
                        >
                            <span className={`flex items-center justify-center gap-3 transition-all duration-500 ${status === "sending" ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                                Initiate Contact
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>

                            {status === "sending" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="animate-spin h-6 w-6 text-white" />
                                </div>
                            )}
                        </button>

                        {/* Status Messages */}
                        {status !== "idle" && status !== "sending" && (
                            <div
                                className={`flex items-center gap-3 p-5 rounded-2xl text-sm font-bold border animate-in fade-in zoom-in duration-300 ${
                                    status === "success"
                                        ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
                                        : "bg-rose-50 dark:bg-rose-900/10 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30"
                                }`}>
                                {status === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                {statusMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}