import Image from "next/image"
import Link from "next/link"

const VerifyEmail = () => {

    return (
        <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
            <div className='max-w-[412] mx-auto'>
                <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                    <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>Verification link</h2>
                    <p className='text-[10px] sm:text-xs md:text-sm text-center text-black'>We’ve sent a verification link to your email</p>
                </div>

                <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 bg-[#E1F5EE] border border-[#1D9E75] rounded-sm md:rounded-md p-2 sm:p-3 md-p-4 lg:p-5 mb-4 sm:mb-5 md:mb-6 lg:mb-7">
                    <Image src={'/svgs/check-circle.svg'} alt="success icon" height={48} width={48}></Image>
                    <p className="text-center font-semibold text-[8px] sm:text-[10px] md:text-xs text-[#1D9E75]">We’ve sent a link to <span className="font-extrabold text-[#086547]">david@gmail.com</span>. <br />
                        Click to activate your account </p>
                </div>

                <p className="text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm text-center">Wrong email? <Link href={'/register'} className="underline cursor-pointer text-black">Go back and correct it</Link></p>
            </div>
        </div>
    )
}

export default VerifyEmail