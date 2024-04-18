'use client'

import { default as ashImage, default as sandImage } from "@/assets/background/10.png";
import clearImage from "@/assets/background/111.png";
import squallImage from "@/assets/background/12.png";
import thunderstormImage from "@/assets/background/13.png";
import snowImage from "@/assets/background/14.png";
import drizzleImage from "@/assets/background/15.png";
import cloudImage from "@/assets/background/2.png";
import rainImage from "@/assets/background/3.png";
import mistImage from "@/assets/background/4.png";
import smokeImage from "@/assets/background/5.png";
import hazeImage from "@/assets/background/6.png";
import dustImage from "@/assets/background/7.png";
import fogImage from "@/assets/background/8.png";
import tornadoImage from "@/assets/background/9.png";
import CityTable from "@/components/CityTable/CityTable";
import DailyWeather from "@/components/DailyWeather/DailyWeather";
import FiveDaysUpdate from "@/components/FiveDaysForecast/FiveDaysUpdate";
import getWeatherData from "@/utils/getWeatherData";
import { useEffect, useState } from "react";

interface WeatherData {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: { lon: number; lat: number };
    main: {
        humidity: number;
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
    };
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    timezone: number;
    visibility: number;
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ];
    wind: { speed: number; deg: number; gust: number };
}

export default function Home() {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
        null
    );
    const [background, setBackground] = useState<string | undefined>("");
    
    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const data = await getWeatherData({ latitude, longitude });
                setCurrentWeather(data);
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    };

    useEffect(() => {
        if (currentWeather) {
            const weatherMain = currentWeather.weather[0].main;

            let backgroundImage;

            switch (weatherMain) {
                case "Clear":
                    backgroundImage = clearImage.src;
                    break;
                case "rain":
                    backgroundImage = rainImage.src;
                    break;
                case "Clouds":
                    backgroundImage = cloudImage.src;
                    break;
                case "Mist":
                    backgroundImage = mistImage.src;
                    break;
                case "Smoke":
                    backgroundImage = smokeImage.src;
                    break;
                case "Haze":
                    backgroundImage = hazeImage.src;
                    break;
                case "Dust":
                    backgroundImage = dustImage.src;
                    break;
                case "Fog":
                    backgroundImage = fogImage.src;
                    break;
                case "Tornado":
                    backgroundImage = tornadoImage.src;
                    break;
                case "Sand":
                    backgroundImage = sandImage.src;
                    break;
                case "Ash":
                    backgroundImage = ashImage.src;
                    break;
                case "Squall":
                    backgroundImage = squallImage.src;
                    break;
                case "Thunderstorm":
                    backgroundImage = thunderstormImage.src;
                    break;
                case "Snow":
                    backgroundImage = snowImage.src;
                    break;
                case "Drizzle":
                    backgroundImage = drizzleImage.src;
                    break;
            }
            setBackground(backgroundImage);
        }
    }, [currentWeather]);

    return (
        <main
            className="text-gray-700 bg-cover bg-center bg-no-repeat px-5 py-10 lg:px-20 h-full"
            style={{ background: `url(${background})` }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <DailyWeather />
                <FiveDaysUpdate />
            </div>
            {/* Table */}
            <CityTable />
        </main>
    );
}
