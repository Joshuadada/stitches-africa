import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Collection } from '@/types/vendor'
import { useState } from 'react'
import { useDeleteVendorCollection, usePublishVendorCollection, useUnpublishVendorCollection } from '@/hooks/api/vendor/useVendorCollections'
import { isApiError } from '@/services/api'
import { showToast } from '@/utils/toast'
import { Loader } from 'lucide-react'
import { toCurrency } from '@/utils/util-method'

export const CollectionTable = ({ collections }: { collections: Collection[] }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [unpublishingId, setUnpublishingId] = useState<string | null>(null);

    const { mutate: deleteCollection } = useDeleteVendorCollection();
    const { mutate: publishCollection } = usePublishVendorCollection();
    const { mutate: unpublishCollection } = useUnpublishVendorCollection();

    const handleDelete = (productId: string) => {
        setDeletingId(productId);

        deleteCollection(productId, {
            onSuccess: (res: any) => {
                showToast({
                    type: "success",
                    title: "Success",
                    message: res.message || "Successful",
                });

                setDeletingId(null);
            },
            onError: (error: any) => {
                const message = isApiError(error)
                    ? error.message
                    : "Something went wrong";

                showToast({
                    type: "error",
                    title: "Error",
                    message,
                });

                setDeletingId(null);
            },
        });
    };

    const handlePublish = (collectionId: string) => {
        setPublishingId(collectionId);

        publishCollection(collectionId, {
            onSuccess: (res: any) => {
                showToast({ type: "success", title: "Success", message: res.message || "Collection published" });
                setPublishingId(null);
            },
            onError: (error: any) => {
                const message = isApiError(error) ? error.message : "Something went wrong";
                showToast({ type: "error", title: "Error", message });
                setPublishingId(null);
            },
        });
    };

    const handleUnpublish = (collectionId: string) => {
        setUnpublishingId(collectionId);

        unpublishCollection(collectionId, {
            onSuccess: (res: any) => {
                showToast({ type: "success", title: "Success", message: res.message || "Collection unpublished" });
                setUnpublishingId(null);
            },
            onError: (error: any) => {
                const message = isApiError(error) ? error.message : "Something went wrong";
                showToast({ type: "error", title: "Error", message });
                setUnpublishingId(null);
            },
        });
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-4 sm:mb-7 md:mb-10 lg:mb-13'>
                <h3 className='text-black font-semibold text-xl md:text-2xl lg:text-3xl'>My Collections</h3>

                <button
                    onClick={() => router.push('/vendor/create-collection')}
                    className="inline-flex items-center gap-2.5 cursor-pointer px-2 md:px-2.5 lg:px-3 py-3 sm:py-3.5 md:py-4 lg:py-4.5 bg-black hover:bg-black/90 text-white rounded-md text-sm font-medium"
                >
                    + Create New Collection
                </button>
            </div>

            <div>
                {
                    collections.length > 0 ? (collections.map((collection) => {
                        return (
                            <div key={collection.id} className='flex flex-col sm:flex-row gap-3 border-y border-[#C8C0B5] py-2.5 sm:py-3.5 md:py-5 lg:py-6.5 px-4.5 sm:px-5.5 md:px-7 lg:px-8.5'>
                                <div className='flex-1 flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-18 xl:gap-23'>
                                    <div className='relative'>
                                        <Image src={collection.coverImageUrl || ""} alt='collection image' height={100} width={113} className='rounded-md h-full w-full'></Image>
                                        <p
                                            className={`text-[8px] sm:text-[10px] lg:text-xs py-1 px-2.5 rounded-4xl absolute -top-3 -right-9.5 ${collection.isPublished
                                                ? "text-[#3F7A4F] bg-[#E0EFD9]"
                                                : "text-[#B54708] bg-[#FEF0C7]"
                                                }`}
                                        >
                                            {collection.isPublished ? "Published" : "Not published"}
                                        </p>
                                    </div>

                                    <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
                                        <h4 className='text-black font-semibold text-base sm:text-lg lg:text-xl'>{collection.name}</h4>
                                        <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-[#736551] text-[10px] sm:text-xs lg:text-sm">
                                            <p>Bundle price: {toCurrency(collection.bundlePrice || 0)}</p>
                                            <p>{collection.productIds?.length} Products</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-1.5 sm:gap-2.5 lg:gap-3.5'>
                                    <a className='text-black underline text-[10px] sm:text-xs lg:text-sm cursor-pointer' onClick={() => router.push(`/vendor/collections/${collection.id}/edit`)}>Edit</a>
                                    {
                                        collection.isPublished ? (
                                            <a className='text-[#B5894A] underline text-[10px] sm:text-xs lg:text-sm cursor-pointer' onClick={() => handleUnpublish(collection.id)}>
                                                {unpublishingId === collection.id ? (
                                                    <Loader />
                                                ) : (
                                                    "Unpublish"
                                                )}
                                            </a>
                                        ) : (
                                            <a className='text-[#B5894A] underline text-[10px] sm:text-xs lg:text-sm cursor-pointer' onClick={() => handlePublish(collection.id)}>
                                                {publishingId === collection.id ? (
                                                    <Loader />
                                                ) : (
                                                    "Publish"
                                                )}
                                            </a>
                                        )
                                    }
                                    <a className='text-[#B54A4A] underline text-[10px] sm:text-xs lg:text-sm cursor-pointer' onClick={() => handleDelete(collection.id)}>
                                        {deletingId === collection.id ? (
                                            <Loader />
                                        ) : (
                                            "Delete"
                                        )}
                                    </a>
                                </div>
                            </div>
                        )
                    })) : (
                        <p
                            className="py-4 text-center text-[#8A7E6E]"
                        >
                            No collections found
                        </p>
                    )
                }
            </div>
        </div>
    )
}
