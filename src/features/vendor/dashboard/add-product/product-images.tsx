import { ImagePlus, X } from "lucide-react";
import { FieldError } from "react-hook-form";

type ProductImagesProps = {
    images: (File | string)[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onRemove: (index: number) => void;
    error?: FieldError | { message?: string };
};

const getImageSrc = (image: File | string): string => {
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
};

const ProductImages = ({
    images,
    onUpload,
    onRemove,
    error,
}: ProductImagesProps) => {
    // Always show all filled slots + one empty slot for adding more
    const slots = images.length + 1;

    return (
        <div>
            <p className="text-xs sm:text-sm text-[#171717] mb-4">
                Product Images <span className="text-[#DC2626]">*</span>
            </p>

            <div className="flex flex-wrap gap-4">
                {Array.from({ length: slots }).map((_, index) => {
                    const image = images[index];

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
                                onChange={(e) => onUpload(e, index)}
                            />

                            {image ? (
                                <>
                                    <img
                                        src={getImageSrc(image)}
                                        alt={`Product image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onRemove(index);
                                        }}
                                        className="absolute top-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        <X size={12} className="text-[#171717]" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ImagePlus size={22} className="text-[#B5894A]" />
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
                <p className="text-red-500 text-xs mt-2">{error.message}</p>
            )}
        </div>
    );
};

export default ProductImages;