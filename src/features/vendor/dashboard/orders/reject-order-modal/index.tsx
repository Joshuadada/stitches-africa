"use client";

import { useForm } from "react-hook-form";
import Button from "@/shared/components/button";
import Select from "@/shared/components/select";
import { X, Info } from "lucide-react";

type RejectOrderFormData = {
    reason: string;
    message?: string;
};

type RejectOrderModalProps = {
    isPending: boolean;
    onClose: () => void;
    onSubmit: (data: RejectOrderFormData) => void;
    order?: {
        id: string;
        placedDate: string;
        shipsTo: string;
        shippingHub: string;
        product: {
            name: string;
            qty: number;
            price: number;
            type: "Bespoke" | "MTO" | "RTS";
        };
    };
};

const REJECTION_REASONS = [
    { label: "At capacity / fully booked", value: "capacity" },
    { label: "Fabric unavailable", value: "fabric" },
    { label: "Cannot meet timeline", value: "timeline" },
    { label: "Unable to meet specifications", value: "spec" },
    { label: "Other", value: "other" },
];

const TYPE_BADGE: Record<string, { bg: string; text: string; border: string }> = {
    Bespoke: { bg: "bg-[#EFE9FF]", text: "text-[#6B4FBB]", border: "border-transparent" },
    MTO: { bg: "bg-[#EBF4FF]", text: "text-[#2563EB]", border: "border-[#BFDBFE]" },
    RTS: { bg: "bg-[#ECFDF5]", text: "text-[#059669]", border: "border-transparent" },
};

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const RejectOrderModal = ({
    isPending,
    onClose,
    onSubmit,
    order,
}: RejectOrderModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RejectOrderFormData>();

    const badge = TYPE_BADGE[order?.product.type ?? "MTO"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-4 py-6 overflow-y-auto">
            <div className="w-full max-w-145 rounded-[10px] bg-white p-7 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="font-garamond text-2xl lg:text-[26px] font-medium text-[#1F1B17] mb-1">
                            Reject order
                        </h2>
                        <p className="text-xs text-[#8A8278]">
                            Order #{order?.id} · placed {order?.placedDate} · ships to {order?.shipsTo} via {order?.shippingHub}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#1A1A1A] hover:opacity-50 transition cursor-pointer"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Product */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">
                    Product
                </p>
                <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-md bg-[#2a2a2a] shrink-0 overflow-hidden" />
                    <div>
                        <h3 className="text-[17px] font-medium text-[#1F1B17] mb-1.5">
                            {order?.product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                                {order?.product.type}
                            </span>
                            <span className="text-xs text-[#5C5650]">
                                Qty {order?.product.qty} · {formatNaira(order?.product.price ?? 0)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Warning banner */}
                <div className="bg-[#F5E5DD] rounded-lg px-4 py-3.5 flex gap-3 items-start">
                    <Info size={18} strokeWidth={1.8} className="text-[#8B4A29] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#8B4A29] leading-relaxed">
                        Rejections notify the customer and count toward your performance rating.
                        Frequent rejections may affect your vendor tier.
                    </p>
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Reason select */}
                    <Select
                        label="Reason for rejection"
                        name="reason"
                        required
                        placeholder="Select a reason"
                        register={register}
                        error={errors.reason}
                        options={REJECTION_REASONS}
                        registerOptions={{
                            required: "Please select a reason for rejection",
                        }}
                    />

                    {/* Message textarea */}
                    <div>
                        <label className="block text-sm font-medium text-[#1F1B17] mb-2">
                            Message to customer{" "}
                            <span className="text-[#8A8278] font-normal">(optional)</span>
                        </label>
                        <textarea
                            {...register("message")}
                            placeholder="Add a brief note. This will be shared with the customer"
                            rows={4}
                            className="w-full border border-[#D4CFC9] rounded-md px-3.5 py-3 text-sm text-[#1F1B17] placeholder:text-[#A8A29E] resize-none outline-none transition focus:border-[#B5894A] font-sans"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="border border-[#A3A3A3] bg-transparent hover:bg-[#F5F5F5] py-3 md:py-3.5"
                        >
                            <p className="text-black text-sm font-medium">Cancel</p>
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-[#E24B4A] hover:bg-[#C0392B] py-3 md:py-3.5"
                        >
                            <p className="text-white text-sm font-medium">
                                {isPending ? "Rejecting..." : "Reject order"}
                            </p>
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default RejectOrderModal;