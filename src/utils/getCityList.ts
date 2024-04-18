interface City {
    name: string;
    ascii_name: string;
    alternate_names: string[];
    feature_class: string;
    feature_code: string;
    country_code: string;
    cou_name_en: string;
    admin1_code: string;
    admin2_code: string;
    population: number;
    dem: number;
    timezone: string;
    label_en: string;
    coordinates: {
        lon: number;
        lat: number;
    };
}

interface results {
    total_count: number;
    results: City[];
}

const getCityList = async (): Promise<City[]> => {
    const res = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100')
    const result:results = await res.json()
    return result.results
}

export default getCityList