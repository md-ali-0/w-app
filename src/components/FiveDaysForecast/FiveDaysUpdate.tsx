"use client";

import getForecastData from "@/utils/getForecastData";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface forecastData {
        clouds: { all: number },
        dt: number,
        dt_txt: Date,
        main: {
            grnd_level: number,
            temp: number;
            sea_level: number;
            temp_kf: number;
            humidity: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
        },
        pop: number,
        sys: { pod: string },
        visibility: number,
        weather: [
            {
                id: number;
                main: string;
                description: string;
                icon: string;
            }
        ],
        wind: { speed: number; deg: number; gust: number }
}



const FiveDaysUpdate: FC = () => {

    const [forecastData, setForecastData] = useState<forecastData[]>([]);
    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const data = await getForecastData({ latitude, longitude });
                setForecastData(data);
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    };

    return (
        <div className="flex flex-col space-y-4 bg-white/40 px-8 rounded-xl ring-2 ring-white ring-opacity-50 py-3.5">
            {forecastData?.slice(1,6).map((item, idx) => (
                <div key={idx} className="grid items-center grid-cols-2 sm:grid-cols-4 gap-2 border-b sm:border-0">
                    <span className="font-medium text-gray-800 text-base md:text-lg">
                       {new Date(item.dt_txt).toLocaleString('en-US', { weekday: 'long' })}
                    </span>
                    <div className="flex items-center justify-end sm:justify-normal">
                        <span className="font-semibold text-gray-800">{item.main.humidity}%</span>
                        <svg
                            className="w-6 h-6 fill-current text-gray-800 ml-1"
                            viewBox="0 0 16 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="matrix(1,0,0,1,-4,-2)">
                                <path
                                    d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                                    style={{ fillRule: "nonzero" }}
                                />
                            </g>
                        </svg>
                    </div>
                    <Image src={`/icons/${item.weather[0].icon}.png`} width={40} height={40} alt=""/>
                    <span className="font-medium text-base text-gray-800 md:text-lg text-right">
                        {item.main.temp_min.toFixed()} / {item.main.temp_max.toFixed()} °C
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FiveDaysUpdate;
