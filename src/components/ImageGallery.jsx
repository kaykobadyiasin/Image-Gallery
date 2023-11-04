import { useEffect, useState } from "react";
import { Icon } from '@iconify/react'; // Icon use - @iconify/react
import 'animate.css'

const ImageGallery = () => {

    // States 
    const [images, setImages] = useState([]); // Image data state
    const [hoveredImage, setHoveredImage] = useState(null); // Image hover overlay and checkbox show state 
    const [selectedImages, setSelectedImages] = useState([]); // Selected image checkbox state

    useEffect(() => {
        // *** Use an async function to fetch and set images data
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

    // *** Move local storage logic to useEffect
    useEffect(() => {
        localStorage.setItem('imageData', JSON.stringify(images));
    }, [images]);

    // *** Handle images selected logic to arrow function
    const handleImageClick = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    // *** Handle selected images delete logic to arrow function
    const handleDeleteImages = () => {
        const newImages = images.filter((_, index) => !selectedImages.includes(index));
        setImages(newImages);
        setSelectedImages([]); // Clear selected images after deletion
    };

    // *** Handle new images upload logic to arrow function
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

        <div className="container mx-auto py-16 animate__animated animate__fadeInDown animate__slow	2s">
            <div className="bg-white rounded-lg border shadow-md xl:mx-0 mx-5">
                <div className="px-5 min-h-[70px] flex justify-between items-center">
                    <div className="flex items-center md:gap-2">
                        {!selectedImages.length > 0 ? <h2 className="font-bold text-xl text-[#00226D]">Gallery</h2> :
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
                                    className="ml-2 font-bold md:text-xl text-sm text-gray-900 dark:text-gray-300 text-[#00226D]"
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
                            className={`${index === 0 && 'col-span-2 row-span-2'} relative select-none `}
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
            <div className="my-20 text-center xl:mx-0 mx-5">
                <h3 className="md:text-4xl text-2xl font-semibold text-[#00226D] mb-5">Thank you for reviewing my completed task.</h3>
                <p className="md:text-center text-justify">I appreciate your time and effort in assessing the work. If you have any feedback or further instructions, please do not hesitate to let me know. Your guidance is invaluable</p>
            </div>
        </div>
    );
};

export default ImageGallery;
