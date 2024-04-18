"use client";

import clearImage from "@/assets/images/clear-day.svg";
import drizzleImage from "@/assets/images/drizzle.svg";
import ashImage from "@/assets/images/dust-wind.svg";
import dustImage from "@/assets/images/dust.svg";
import fogImage from "@/assets/images/fog.svg";
import hazeImage from "@/assets/images/haze.svg";
import humidityImage from "@/assets/images/humidity.png";
import mistImage from "@/assets/images/mist.svg";
import cloudImage from "@/assets/images/partly-cloudy-day.svg";
import rainImage from "@/assets/images/rain.svg";
import smokeImage from "@/assets/images/smoke.svg";
import snowImage from "@/assets/images/snow.svg";
import sunriseImage from "@/assets/images/sunrise.svg";
import sunsetImage from "@/assets/images/sunset.svg";
import thunderstormImage from "@/assets/images/thunderstorms-rain.svg";
import tornadoImage from "@/assets/images/tornado.svg";
import windImage from "@/assets/images/wind.png";
import getWeatherData from "@/utils/getWeatherData";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

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

const DailyWeather: FC = () => {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
        null
    );
    const [weatherIcon, setWeatherIcon] = useState<string>(clearImage);

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (currentWeather) {
            const weatherMain = currentWeather.weather[0].main;

            let weatherIcon;

            switch (weatherMain) {
                case "Clear":
                    weatherIcon = clearImage;
                    break;
                case "Rain":
                    weatherIcon = rainImage;
                    break;
                case "Clouds":
                    weatherIcon = cloudImage;
                    break;
                case "Mist":
                    weatherIcon = mistImage;
                    break;
                case "Smoke":
                    weatherIcon = smokeImage;
                    break;
                case "Haze":
                    weatherIcon = hazeImage;
                    break;
                case "Dust":
                    weatherIcon = dustImage;
                    break;
                case "Fog":
                    weatherIcon = fogImage;
                    break;
                case "Tornado":
                    weatherIcon = tornadoImage;
                    break;
                case "Sand":
                    weatherIcon = tornadoImage;
                    break;
                case "Ash":
                    weatherIcon = ashImage;
                    break;
                case "Squall":
                    weatherIcon = ashImage;
                    break;
                case "Thunderstorm":
                    weatherIcon = thunderstormImage;
                    break;
                case "Snow":
                    weatherIcon = snowImage;
                    break;
                case "Drizzle":
                    weatherIcon = drizzleImage;
                    break;
                case "mist":
                    weatherIcon = mistImage;
                    break;
            }
            setWeatherIcon(weatherIcon);
        }
    }, [currentWeather]);

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
        <div className="bg-white/40 px-8 rounded-xl ring-2 ring-white ring-opacity-50 py-5">
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
                <Image
                    src={weatherIcon}
                    width={120}
                    height={120}
                    alt="Weather Icon"
                    priority={true}
                />
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
    );
};

export default DailyWeather;
