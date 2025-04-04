import { useEffect, useState } from "react";

const Banner = () => {
    const slides = [
        {
            title: "Empowering Lives Through Free Checkups",
            description: "Over 500 patients benefited from our health checkups and consultations.",
            image: "/images/health.jpeg",
        },
        {
            title: "Providing Access to Vital Care",
            description: "Our mobile medical camps reached remote areas, offering essential services.",
            image: "/images/health2.jpg",
        },
        {
            title: "Healing Communities Together",
            description: "Collaboration with local volunteers to deliver impactful care.",
            image: "/images/gambia.png",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 h-[400px] relative"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 campFees bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-6">
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                            <p className="text-sm md:text-lg">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
