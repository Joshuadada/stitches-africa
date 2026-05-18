import { ImagePlus } from "lucide-react";
import { FieldError } from "react-hook-form";

type ProductImagesProps = {
    images: File[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: FieldError | { message?: string };
    slots?: number;
};

const ProductImages = ({
    images,
    onUpload,
    error,
    slots = 3,
}: ProductImagesProps) => {
    return (
        <div>
            <p className="text-xs sm:text-sm text-[#171717] mb-4">
                Product Images *
            </p>

            <div className="flex flex-wrap gap-4">
                {Array.from({ length: slots }).map((_, index) => {
                    const file = images[index];

                    return (
                        <label
                            key={index}
                            className="
                                w-28 h-28
                                rounded-2xl
                                border-2 border-dashed border-[#D7C5A8]
                                bg-[#FFFCF7]
                                flex flex-col items-center justify-center gap-2
                                hover:bg-[#FAF7F2]
                                transition
                                cursor-pointer
                                overflow-hidden
                                relative
                            "
                        >
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={onUpload}
                            />

                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <>
                                    <ImagePlus
                                        size={22}
                                        className="text-[#B5894A]"
                                    />
                                    <span className="text-[11px] text-[#B5894A]">
                                        Add photo
                                    </span>
                                </>
                            )}
                        </label>
                    );
                })}
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-2">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default ProductImages;