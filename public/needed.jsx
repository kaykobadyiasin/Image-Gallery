import { useEffect, useState } from "react";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [indexImageChecked, setIndexImageChecked] = useState(false); // State for index image checkbox

    useEffect(() => {
        fetch('imagesData.json')
            .then((res) => res.json())
            .then((data) => setImages(data));
    }, []);

    const handleImageClick = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    // Function to handle the index image checkbox change
    const handleIndexImageCheckboxChange = () => {
        setIndexImageChecked(!indexImageChecked);
    };

    return (
        <div className="bg-[#E1E6EA]">
            <div className="container mx-auto py-10">
                <div className="bg-white rounded-lg border">
                    <div className="px-5 py-3">
                        <h2 className="font-bold text-xl">Gallery</h2>
                        <div className="flex items-center">
                            <div>
                                <input
                                    id="selected-item"
                                    type="checkbox"
                                    checked={selectedImages.length > 0}
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="selected-item"
                                    className="ml-2 font-bold text-gray-900 dark:text-gray-300"
                                >
                                    {selectedImages.length} Files Selected
                                </label>
                            </div>
                            <div>
                                <input
                                    id="index-image-checkbox"
                                    type="checkbox"
                                    checked={indexImageChecked}
                                    onChange={handleIndexImageCheckboxChange} // Handle checkbox change
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="index-image-checkbox"
                                    className="ml-2 font-bold text-gray-900 dark:text-gray-300"
                                >
                                    Index Image
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="p-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                        {images.map((imageItem, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredImage(index)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <input
                                    id={`selected-item-${index}`}
                                    type="checkbox"
                                    value=""
                                    className={`w-5 h-5 absolute z-50 top-5 left-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 ${
                                        hoveredImage === index || selectedImages.includes(index) || (indexImageChecked && index === 0) ? 'block' : 'hidden'
                                    }`}
                                />
                                <img
                                    src={imageItem?.image}
                                    className={`border rounded-lg cursor-pointer col-span-2 row-span-2 image ${
                                        (selectedImages.includes(index) || (indexImageChecked && index === 0)) ? "opacity-50" : ""
                                    }`}
                                    alt="Image Gallery"
                                    onClick={() => handleImageClick(index)}
                                />
                                <div
                                    className={`w-full h-full bg-black opacity-50 absolute top-0 rounded-lg ${
                                        hoveredImage === index ? 'block' : 'hidden'
                                    }`}
                                ></div>
                            </div>
                        ))}
                        <input
                            type="file"
                            className="border rounded-lg hover:opacity-50 cursor-pointer hoverOnOverlay"
                            alt="Image Gallery"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;





***************
import { useEffect, useState } from "react";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        fetch('imagesData.json')
            .then((res) => res.json())
            .then((data) => setImages(data));
    }, []);

    const handleImageClick = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    return (
        <div className="bg-[#E1E6EA]">
            <div className="container mx-auto py-10">
                <div className="bg-white rounded-lg border">
                    <div className="px-5 py-3 flex justify-between items-center">
                        <h2 className="font-bold text-xl">Gallery</h2>
                        <button className="text-white rounded-md px-3 py-2 font-semibold bg-red-700">Delete Images</button>
                    </div>
                    <hr />
                    <div className="p-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                        {images.map((imageItem, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredImage(index)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <input
                                    id={`selected-item-${index}`}
                                    type="checkbox"
                                    value=""
                                    className={`w-5 h-5 absolute z-50 top-5 left-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 ${hoveredImage === index ? 'block' : 'hidden'
                                        }`}
                                />
                                <img
                                    src={imageItem?.image}
                                    className={`border rounded-lg cursor-pointer col-span-2 row-span-2 image ${selectedImages.includes(index) ? "opacity-50" : ""
                                        }`}
                                    alt="Image Gallery"
                                    onClick={() => handleImageClick(index)}
                                />
                                <div
                                    className={`w-full h-full bg-black opacity-50 absolute top-0 rounded-lg ${hoveredImage === index ? 'block' : 'hidden'
                                        }`}
                                ></div>
                            </div>
                        ))}
                        <input
                            type="file"
                            className="border rounded-lg hover:opacity-50 cursor-pointer hoverOnOverlay"
                            alt="Image Gallery"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
*******






import { useEffect, useState } from "react";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        fetch('imagesData.json')
            .then((res) => res.json())
            .then((data) => setImages(data));
    }, []);

    const handleImageClick = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    return (
        <div className="bg-[#E1E6EA]">
            <div className="container mx-auto py-10">
                <div className="bg-white rounded-lg border">
                    <div className="px-5 py-3 flex justify-between items-center">
                        <h2 className="font-bold text-xl">Gallery</h2>
                        <button className="text-white rounded-md px-3 py-2 font-semibold bg-red-700">Delete Images</button>
                    </div>
                    <hr />
                    <div className="p-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                        {images.map((imageItem, index) => (
                            <div key={index} className="relative">
                                <input
                                    id={`selected-item-${index}`}
                                    type="checkbox"
                                    value=""
                                    className={`w-5 h-5 absolute z-50 top-5 left-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}
                                    checked={selectedImages.includes(index)}
                                    onChange={() => handleImageClick(index)}
                                />
                                <img
                                    src={imageItem?.image}
                                    className={`border rounded-lg cursor-pointer col-span-2 row-span-2 image ${selectedImages.includes(index) ? "opacity-50" : ""}`}
                                    alt="Image Gallery"
                                />
                            </div>
                        ))}
                        <input type="file" className="border rounded-lg cursor-pointer hover:opacity-50" alt="Image Gallery" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
