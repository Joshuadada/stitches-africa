"use client";

import Button from "@/shared/components/button";
import { Order } from "@/types/vendor";
import { formatShortDate, toCurrency } from "@/utils/util-method";
import { X } from "lucide-react";
import Image from "next/image";

type AcceptOrderModalProps = {
    isPending: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    order?: Order;
};

const AcceptOrderModal = ({
    isPending,
    onClose,
    onSubmit,
    order,
}: AcceptOrderModalProps) => {
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
                            Order #{order?.id} · placed {formatShortDate(order?.orderDate || "")} · ships to {order?.addressLine}, {order?.state}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#1A1A1A] hover:opacity-50 transition cursor-pointer"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Products */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Products ({order?.lineItems.length ?? 0})
                </p>
                <div className="space-y-4">
                    {order?.lineItems.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-3.5">
                                <div className="w-16 h-16 rounded-md bg-[#2a2a2a] shrink-0 overflow-hidden">
                                    {item.imageUrl && (
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            className="w-full h-full object-cover"
                                            height={64}
                                            width={64}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-garamond text-[17px] font-medium text-[#1F1B17] mb-1.5">
                                        {item.productName}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {item.listingType === "Bespoke" && (
                                            <span className="text-[10px] font-medium text-[#6B4FBB] bg-[#EFE9FF] px-2 py-0.5 rounded-full">
                                                Bespoke
                                            </span>
                                        )}
                                        <span className="text-xs text-[#5C5650]">
                                            Qty {item.quantity} · {toCurrency(item.unitPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Measurements */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Customer Measurements
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {[
                        { label: "Bust", value: order?.measurements?.bust || "--" },
                        { label: "Waist", value: order?.measurements?.waist || "--" },
                        { label: "Hips", value: order?.measurements?.hips || "--" },
                        { label: "Length", value: order?.measurements?.length || "--" },
                        { label: "Sleeve", value: order?.measurements?.sleeve || "--" },
                        { label: "Height", value: order?.measurements?.height || "--" },
                    ].map(({ label, value }) =>
                        (
                            <div key={label} className="bg-[#F0E8D6] rounded-md px-3 py-2.5">
                                <p className="text-[9px] tracking-wider uppercase text-[#8A8278] mb-1">
                                    {label}
                                </p>
                                <p className="text-[15px] font-medium text-[#1F1B17]">{value}</p>
                            </div>
                        )
                    )}
                </div>

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Customization */}
                <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
                    Customization
                </p>
                <div className="space-y-2.5 text-sm">
                    <div className="flex gap-4">
                        <span className="w-28 shrink-0 text-[#8A8278]">Fabric</span>
                        <span className="text-[#1F1B17]">{order?.measurements?.fabric}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-28 shrink-0 text-[#8A8278]">Lining</span>
                        <span className="text-[#1F1B17]">{order?.measurements?.lining}</span>
                    </div>
                    {order?.measurements?.customerNote && (
                        <div className="flex gap-4">
                            <span className="w-28 shrink-0 text-[#8A8278]">Customer note</span>
                            <span className="text-[#5C5650] italic">
                                "{order.measurements?.customerNote}"
                            </span>
                        </div>
                    )}
                </div>

                {/* Reference Images */}
                {/* {order?.product.referenceImages && order.product.referenceImages.length > 0 && (
                    <>
                        <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mt-4 mb-3">
                            Reference Images ({order.product.referenceImages.length})
                        </p>
                        <div className="flex gap-2">
                            {order.product.referenceImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="w-15 h-15 rounded-md bg-[#2a2a2a] overflow-hidden shrink-0"
                                >
                                    <Image src={src || '/'} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" height={60} width={60} />
                                </div>
                            ))}
                        </div>
                    </>
                )} */}

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Timeline */}
                {/* <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3.5">
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
                </div> */}

                <div className="h-px bg-[#E8E3DC] my-5" />

                {/* Payout box */}
                {/* <div className="bg-[#F0E8D6] rounded-lg px-4.5 py-4 mt-5">
                    <div className="flex justify-between text-sm text-[#5C5650] mb-2">
                        <span>Order subtotal</span>
                        <span>{toCurrency(order?.payout.subtotal ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#5C5650] mb-2">
                        <span>Platform markup ({order?.payout.markupPercent}%)</span>
                        <span>+{toCurrency(order?.payout.markupAmount ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-[15px] font-semibold text-[#1F1B17] border-t border-[#DDD6CC] pt-2.5 mt-1">
                        <span>Your payout</span>
                        <span>{toCurrency(order?.payout.total ?? 0)}</span>
                    </div>
                </div> */}

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
                            {isPending ? "Processing..." : "Accept & Start processing"}
                        </p>
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AcceptOrderModal;