"use client";

import {
    default as ashImage,
    default as sandImage,
} from "@/assets/background/10.png";
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
import humidityImage from "@/assets/images/humidity.png";
import sunriseImage from "@/assets/images/sunrise.svg";
import sunsetImage from "@/assets/images/sunset.svg";
import windImage from "@/assets/images/wind.png";
import getWeatherData from "@/utils/getWeatherData";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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

const CityWeatherUpdate = () => {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
        null
    );
    const [background, setBackground] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const longitude = parseInt(searchParams.get("lon") || "0", 10);
    const latitude = parseInt(searchParams.get("lat") || "0", 10);

    useEffect(() => {
        fetchData();
    }, [longitude, latitude]);

    useEffect(() => {
        if (currentWeather) {
            const weatherMain = currentWeather.weather[0].main;

            let backgroundImage;

            switch (weatherMain) {
                case "Clear":
                    backgroundImage = clearImage.src;
                    break;
                case "Rain":
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

    const fetchData = async () => {
        const data = await getWeatherData({ latitude, longitude });
        setCurrentWeather(data);
    };

    const getTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        const min = date.getMinutes();
        let time = ``;
        if (hour > 12) {
            time = `${hour - 12} : ${min} PM`;
        } else {
            time = `${hour} : ${min} AM`;
        }
        return time;
    };
    return (
        <div
            className="flex flex-col justify-center items-center text-gray-700 bg-cover bg-center bg-no-repeat px-5 py-10 lg:px-20 h-screen"
            style={{ background: `url(${background})` }}
        >
        <div className="bg-white/40 px-8 rounded-xl ring-2 ring-white ring-opacity-50 py-5 md:w-3/4 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold">
                        {currentWeather
                            ? currentWeather?.main?.temp.toFixed()
                            : "0"}{" "}
                        °C
                    </span>
                    <span className="font-semibold mt-1 text-gray-800">
                        {currentWeather
                            ? currentWeather?.name +
                              ", " +
                              currentWeather?.sys?.country
                            : "Loading..."}
                    </span>
                </div>
                {currentWeather && <Image
                    src={`/icons/${currentWeather.weather[0].icon}.png`}
                    width={120}
                    height={120}
                    alt="Weather Icon"
                    priority={true}
                />
                }
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex flex-col justify-center items-center">
                    <Image src={humidityImage} alt="Humidity" height={45} className="py-3.5"/>
                    <h4 className="text-lg font-medium text-gray-800">{currentWeather ? currentWeather?.main.humidity : 0} %</h4>
                    <h3 className="text-lg text-gray-800">Humidity</h3>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Image src={windImage} alt="Humidity" height={50} className="py-3.5"/>
                    <h4 className="text-lg font-medium text-gray-800">{currentWeather ? currentWeather?.wind.speed : 0} km/h</h4>
                    <h3 className="text-lg text-gray-800">Wind</h3>
                </div>
                {currentWeather ? (
                    <div className="flex flex-col justify-center items-center">
                        <Image src={sunriseImage} alt="Sunrise" height={80} />
                        <h4 className="text-lg font-medium text-gray-800">{getTime(currentWeather.sys.sunrise)}</h4>
                        <h3 className="text-lg text-gray-800">Sunrise</h3>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Image src={sunriseImage} alt="Sunrise" height={80} />
                        <h4 className="text-lg font-medium text-gray-800">00.00</h4>
                        <h3 className="text-lg text-gray-800">Sunrise</h3>
                    </div>
                )}
                {currentWeather ? (
                    <div className="flex flex-col justify-center items-center">
                        <Image src={sunsetImage} alt="Sunset" height={80} />
                        <h4 className="text-lg font-medium text-gray-800">{getTime(currentWeather.sys.sunset)}</h4>
                        <h3 className="text-lg text-gray-800">Sunset</h3>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Image src={sunsetImage} alt="Sunset" height={80} />
                        <h4 className="text-lg font-medium text-gray-800">00.00</h4>
                        <h3 className="text-lg text-gray-800">Sunset</h3>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default CityWeatherUpdate;
