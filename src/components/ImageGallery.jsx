import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        // Use an async function to fetch and set images data
        const fetchImages = async () => {
            try {
                const response = await fetch('imagesData.json');
                if (!response.ok) {
                    throw new Error("Failed to fetch images.");
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // Move local storage logic to useEffect
    useEffect(() => {
        localStorage.setItem('imageData', JSON.stringify(images));
    }, [images]);

    const handleImageClick = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    const handleDeleteImages = () => {
        const newImages = images.filter((_, index) => !selectedImages.includes(index));
        setImages(newImages);
        setSelectedImages([]); // Clear selected images after deletion
    };

    const handleImageUpload = (event) => {
        const newImages = [...images];
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = URL.createObjectURL(files[i]);
            newImages.push({ image: file });
        }

        setImages(newImages);
    };

    return (
        <div className="bg-[#E1E6EA]">
            <div className="container mx-auto py-10">
                <div className="bg-white rounded-lg border">
                    <div className="px-5 min-h-[70px] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {!selectedImages.length > 0 ? <h2 className="font-bold text-xl">Gallery</h2> :
                                <>
                                    <input
                                        id="selected-item"
                                        type="checkbox"
                                        checked={selectedImages.length > 0}
                                        value=""
                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="selected-item"
                                        className="ml-2 font-bold text-xl text-gray-900 dark:text-gray-300"
                                    >
                                        {selectedImages.length} {selectedImages.length <= 0 ? '' : selectedImages.length === 1 ? 'Selected File' : 'Selected Files'}
                                    </label>
                                </>
                            }
                        </div>
                        <button
                            className="text-red-700 rounded-md px-3 py-2 font-semibold "
                            onClick={handleDeleteImages}
                        >
                            {selectedImages.length <= 0 ? '' : selectedImages.length === 1 ? 'Delete File' : 'Delete Files'}
                        </button>
                    </div>
                    <hr />
                    <div className="p-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                        {images.map((imageItem, index) => (
                            <div
                                key={index}
                                className={`${index === 0 && 'col-span-2 row-span-2'} relative select-none`}
                                onMouseEnter={() => setHoveredImage(index)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <input
                                    key={`checkbox-${index}`}
                                    id={`selected-item-${index}`}
                                    type="checkbox"
                                    value=""
                                    className={`w-5 h-5 cursor-pointer absolute z-50 top-5 left-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 ${hoveredImage === index || selectedImages.includes(index) ? 'block' : 'hidden'
                                        }`}
                                    checked={selectedImages.includes(index)}
                                    onChange={() => handleImageClick(index)}
                                />

                                <img
                                    src={imageItem?.image}
                                    className={`border rounded-lg cursor-pointer w-full h-full object-cover image ${selectedImages.includes(index) ? "opacity-50" : ""
                                        }`}
                                    alt="Image Gallery"
                                    onClick={() => handleImageClick(index)}
                                />
                                <div
                                    className={`w-full h-full bg-black opacity-50 cursor-pointer absolute top-0 rounded-lg ${hoveredImage === index ? 'block' : 'hidden'
                                        }`}
                                ></div>
                            </div>
                        ))}
                        <div className="flex items-center justify-center w-full col-span-1 row-span-1">
                            <label htmlFor="dropzone-file" className="select-none flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#FAFBFB] hover:bg-opacity-50 hover:bg-gray-300 transition-all duration-300">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Icon icon="fa6-regular:image" className="text-2xl" />
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400"><span className="font-bold text-sm">Add Image</span></p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
