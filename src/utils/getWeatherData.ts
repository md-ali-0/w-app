interface getWeatherDataProps {
    latitude: number;
    longitude: number;
}

const getWeatherData = async ({ latitude, longitude }: getWeatherDataProps) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${process.env.API_KEY}`;

    let response = await fetch(url);
    let data = await response.json();
    return data;
};

export default getWeatherData;
