interface getForecastDataProps {
    latitude: number;
    longitude: number;
}

const getForecastData = async ({ latitude, longitude }: getForecastDataProps) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=40&units=metric&appid=${process.env.API_KEY}`;

    let response = await fetch(url);
    let data = await response.json();

    const uniqueForecastDays: any = [];
    const fiveDaysForecast = data.list.filter((forecast: { dt_txt: string | number | Date; }) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
        }
    });

    return fiveDaysForecast;
};

export default getForecastData;
