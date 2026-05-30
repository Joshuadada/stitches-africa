"use client";

import { addPayoutSchema } from "@/schema/vendor/payout-schema";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import Select from "@/shared/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

type AddPayoutModalProps = {
    isPending: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
};

type FormValues = {
    bank: string;
    accountNumber: string;
    accountName: string;
};

const AddPayoutModal = ({
    isPending,
    onClose,
    onSubmit,
}: AddPayoutModalProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(addPayoutSchema),
        mode: "onChange",
        defaultValues: {
            bank: "",
            accountNumber: "",
            accountName: "",
        },
    });

    const accountNumber = watch("accountNumber");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-4 py-6 overflow-y-auto">
            <div className="w-full max-w-164.5 rounded-[10px] bg-[#FAFAFA] p-3 sm:p-4 md:p-4.5 lg:p-5 shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                    <div>
                        <h2 className="font-garamond text-xl lg:text-2xl text-[#1F1B17] mb-1">
                            Add payout account
                        </h2>

                        <p className="text-[10px] md:text-xs lg:text-sm text-[#8A8278]">
                            Where should we send your earnings?
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-[#1A1A1A] hover:opacity-70 transition cursor-pointer"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Current Account */}
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                    <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                        <p className="text-[8px] md:text-[10px] lg:text-xs tracking-wide text-[#8A8278] uppercase">
                            Current account
                        </p>

                        <button className="text-[8px] md:text-[10px] lg:text-xs text-[#EB5757] hover:underline">
                            Remove
                        </button>
                    </div>

                    <div className="bg-[#F0E8D6] rounded-sm px-4 sm:px-5 md:px-6 lg:px-7 py-2.5 sm:py-3 md:py-3.5 lg:py-4">
                        <h3 className="font-garamond text-sm md:text-base lg:text-lg text-[#B98B5C] font-bold mb-1.5 md:mb-2 lg:mb-2.5">
                            GTB Bank
                        </h3>

                        <p className="text-[#6B6357] text-[10px] md:text-xs lg:text-sm">
                            ••••• 92504 · David Nsirim
                        </p>
                    </div>
                </div>

                {/* Add New */}
                <div>
                    <p className="text-[8px] md:text-[10px] lg:text-xs tracking-wide text-[#8A8278] uppercase mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                        Add new account
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-2.5 sm:space-y-3.5 md:space-y-4.5 lg:space-y-5.5"
                    >
                        <Select
                            label="Bank"
                            name="bank"
                            required
                            placeholder="Select your bank"
                            register={register}
                            error={errors.bank}
                            options={[
                                {
                                    label: "GTBank",
                                    value: "gtbank",
                                },
                                {
                                    label: "Access Bank",
                                    value: "access",
                                },
                                {
                                    label: "UBA",
                                    value: "uba",
                                },
                                {
                                    label: "First Bank",
                                    value: "first-bank",
                                },
                            ]}
                            registerOptions={{
                                required: "Bank is required",
                            }}
                        />

                        <Input
                            label="Account number"
                            name="accountNumber"
                            type="text"
                            register={register}
                            error={errors.accountNumber}
                            required
                            registerOptions={{
                                required: "Account number is required",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Account number must be 10 digits",
                                },
                                maxLength: {
                                    value: 10,
                                    message:
                                        "Account number must be 10 digits",
                                },
                            }}
                        />

                        <Input
                            label="Account name"
                            name="accountName"
                            readonly
                            register={register}
                            error={errors.accountName}
                        />

                        {/* Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                            <Button
                                type="button"
                                onClick={onClose}
                                className="border border-[#A3A3A3] bg-transparent hover:bg-[#F5F5F5] py-3 md:py-3.5 lg:py-4"
                            >
                                <p className="text-black text-sm sm:text-base font-medium">
                                    Cancel
                                </p>
                            </Button>

                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                className="bg-[#B5894A] hover:bg-[#9F763B] py-3 md:py-3.5 lg:py-4"
                            >
                                <p className="text-white text-sm sm:text-base font-medium">
                                    Add account
                                </p>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPayoutModal;