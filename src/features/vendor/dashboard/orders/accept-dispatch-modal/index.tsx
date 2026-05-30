"use client";

import Button from "@/shared/components/button";
import { X } from "lucide-react";

type AcceptDispatchModalProps = {
    isPending: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    order?: {
        id: string;
        placedDate: string;
        shipsTo: string;
        shippingHub: string;
        product: {
            name: string;
            qty: number;
            price: number;
            isBespoke: boolean;
        };
        details: {
            size: string,
            color: string
        },
        customization: {
            fabric: string;
            lining: string;
            customerNote?: string;
        };
        timeline: {
            requiredBy: string;
            daysRemaining: number;
            suggestedProduction: string;
        };
        payout: {
            subtotal: number;
            markupPercent: number;
            markupAmount: number;
            total: number;
        };
    };
};

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

const AcceptDispatchModal = ({
    isPending,
    onClose,
    onSubmit,
    order,
}: AcceptDispatchModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-4 py-6 overflow-y-auto">
            <div className="w-full max-w-153 rounded-[10px] bg-[#FAFAFA] p-7 shadow-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                    <div>
                        <h2 className="font-garamond text-xl lg:text-2xl text-[#1F1B17] mb-1">
                            Order details
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
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Product
                </p>
                <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-md bg-[#2a2a2a] shrink-0 overflow-hidden">
                        {/* product image slot */}
                    </div>
                    <div>
                        <h3 className="font-garamond text-[17px] font-medium text-[#1F1B17] mb-1.5">
                            {order?.product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            {order?.product.isBespoke && (
                                <span className="text-[10px] font-medium text-[#6B4FBB] bg-[#EFE9FF] px-2 py-0.5 rounded-full">
                                    Bespoke
                                </span>
                            )}
                            <span className="text-xs text-[#5C5650]">
                                Qty {order?.product.qty} · {formatNaira(order?.product.price ?? 0)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Measurements */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Order Details
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-[#F0E8D6] rounded-md px-3 py-2.5">
                        <p className="text-[9px] tracking-wider uppercase text-[#8A8278] mb-1">
                            Size
                        </p>
                        <p className="text-[15px] font-medium text-[#1F1B17]">{order?.details.size}</p>
                    </div>

                    <div className="bg-[#F0E8D6] rounded-md px-3 py-2.5">
                        <p className="text-[9px] tracking-wider uppercase text-[#8A8278] mb-1">
                            Color
                        </p>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3.5 w-3.5 rounded-full"
                                style={{ backgroundColor: order?.details?.color }}
                            />

                            <p className="text-[15px] font-medium text-[#1F1B17]">
                                {order?.details?.color
                                    ? order.details.color.charAt(0).toUpperCase() + order.details.color.slice(1)
                                    : ""}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Customization */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Customization
                </p>
                <div className="space-y-2.5 text-sm">
                    <div className="flex gap-4">
                        <span className="w-28 shrink-0 text-[#8A8278]">Fabric</span>
                        <span className="text-[#1F1B17]">{order?.customization.fabric}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-28 shrink-0 text-[#8A8278]">Lining</span>
                        <span className="text-[#1F1B17]">{order?.customization.lining}</span>
                    </div>
                    {order?.customization.customerNote && (
                        <div className="flex gap-4">
                            <span className="w-28 shrink-0 text-[#8A8278]">Customer note</span>
                            <span className="text-[#5C5650] italic">
                                "{order.customization.customerNote}"
                            </span>
                        </div>
                    )}
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Timeline */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Timeline
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                        <span className="w-37.5 shrink-0 text-[#8A8278]">Required ready by</span>
                        <span className="font-medium text-[#1F1B17]">
                            {order?.timeline.requiredBy} — in {order?.timeline.daysRemaining} days
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-37.5 shrink-0 text-[#8A8278]">Suggested production</span>
                        <span className="text-[#5C5650]">{order?.timeline.suggestedProduction}</span>
                    </div>
                </div>

                {/* Payout box */}
                <div className="bg-[#F0E8D6] rounded-lg px-4.5 py-4 mt-5">
                    <div className="flex justify-between text-sm text-[#5C5650] mb-2">
                        <span>Order subtotal</span>
                        <span>{formatNaira(order?.payout.subtotal ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#5C5650] mb-2">
                        <span>Platform markup ({order?.payout.markupPercent}%)</span>
                        <span>+{formatNaira(order?.payout.markupAmount ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-[15px] font-semibold text-[#1F1B17] border-t border-[#DDD6CC] pt-2.5 mt-1">
                        <span>Your payout</span>
                        <span>{formatNaira(order?.payout.total ?? 0)}</span>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-[#8A8278] leading-relaxed mt-3.5 mb-5">
                    By accepting, you commit to producing this order to specification and dispatching
                    to the Stitches Africa hub by the required date. Cancellations after acceptance
                    may impact your vendor tier.
                </p>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-between">
                    <Button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="border border-[#A3A3A3] bg-transparent hover:bg-[#F5F5F5] py-3 md:py-3.5 max-w-67.5"
                    >
                        <p className="text-black text-sm font-medium">Cancel</p>
                    </Button>

                    <Button
                        type="button"
                        onClick={() => onSubmit(order)}
                        disabled={isPending}
                        className="bg-[#B5894A] hover:bg-[#9F763B] py-3 md:py-3.5 max-w-67.5"
                    >
                        <p className="text-white text-sm font-medium">
                            {isPending ? "Processing..." : "Accept & prepare for dispatch"}
                        </p>
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AcceptDispatchModal;