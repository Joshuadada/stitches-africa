"use client";

import Header from "@/layout/header";
import { usePathname } from "next/navigation";

const STEPS = [
  { label: "Business details", suffix: "register" },
  { label: "Documents", suffix: "document-upload" },
  { label: "Review & Submit", suffix: "review-application" },
];

const getActiveStep = (pathname: string) => {
  if (pathname.endsWith("/review-application")) return 2;
  if (pathname.endsWith("/document-upload")) return 1;
  return 0;
};

export default function VendorRegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const activeStep = getActiveStep(pathname);

  return (
    <div>
      <Header />
      <div className="pt-3 sm:pt-5 md:pt-7 lg:pt-8.5 px-8 sm:px-16 md:px-32 lg:px-44 pb-6 sm:pb-12 md:pb-20 lg:pb-28 flex flex-col gap-14 sm:gap-24 md:gap-32 lg:gap-40 bg-[#FAF7F2]">
        <div className="flex flex-col gap-5 sm:gap-8 md:gap-11 lg:gap-15">
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-11.5">
            <p className="text-[#B5894A] text-sm sm:text-base md:text-lg lg:text-xl mb-1.5 sm:mb-2.5 md:mb-3.5 lg:mb-4.5">
              VENDOR APPLICATION
            </p>
            <h4 className="text-black font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond mb-2 sm:mb-3 md:mb-4 lg:mb-5">
              Apply to sell on Stitches Africa
            </h4>
            <p className="max-w-[502] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
              Join our network of verified Nigerian designers. We review every
              application personally — complete all three steps to submit yours
              for consideration.
            </p>
          </div>

          <div>
            {/* Info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between bg-white p-3 sm:p-4 md:p-5 lg:p-6 border border-[#C8C0B5] rounded-md mb-4 sm:mb-5 md:mb-6 lg:mb-7">
              <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                All applications reviewed within 5-7 business days
              </p>
              <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                CAC verification required for approval
              </p>
              <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                You will receive an email with the outcome
              </p>
            </div>

            {/* Step indicators */}
            <div className="flex items-center mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
              {STEPS.map((step, index) => (
                <div key={step.suffix} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`h-7 sm:h-9 md:h-11 lg:h-[50] w-7 sm:w-9 md:w-11 lg:w-[50] rounded-full border flex justify-center items-center shrink-0 transition-colors ${index == activeStep
                      ? "border-[#B5894A] bg-[#B5894A]"
                      : index < activeStep
                        ? "border-black bg-black"
                        : "border-[#B5894A] bg-white"
                      }`}
                  >
                    <p
                      className={`font-semibold text-xs sm:text-sm md:text-base lg:text-lg ${index <= activeStep
                        ? "text-white"
                        : "text-[#C8C0B5]"
                        }`}
                    >
                      {index + 1}
                    </p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <hr
                      className={`flex-1 border-t transition-colors ${index < activeStep ? "border-black" : "border-[#C8C0B5]"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step labels */}
            <div className="flex justify-between items-center">
              {STEPS.map((step, index) => (
                <p
                  key={step.suffix}
                  className={`text-[8px] sm:text-[10px] md:text-xs lg:text-sm transition-colors ${index == activeStep
                    ? "text-[#B5894A]"
                    : index < activeStep
                      ? "text-black"
                      : "text-[#C8C0B5]"
                    }`}
                >
                  {step.label}
                </p>
              ))}
            </div>
          </div>

          <div className="py-4 sm:py-5 md:py-6 lg:py-7 px-6 sm:px-10 md:px-16 lg:px-22 bg-white flex-1 rounded-[20px]">
            {children}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-[#737373] text-[10px] sm:text-xs md:text-sm lg:text-base">
          <p>Want to become a Stitches Africa Influencer?</p>
          <a className="cursor-pointer underline">Apply here</a>
        </div>
      </div>
    </div>
  );
}