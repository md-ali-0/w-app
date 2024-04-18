"use client";

import getCityList from "@/utils/getCityList";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

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

const CityTable: FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await getCityList();
        setCities(data);
    };
    
    return (
        <>
            {/* Search */}
            <div className="relative mx-auto text-gray-600 w-2/4 md:w-1/4 my-5">
                <input
                    className="bg-white/40 placeholder:text-gray-700 text-gray-800 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full ring-2 ring-white ring-opacity-50"
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <span
                    className="absolute right-0 top-0 mt-2.5 mr-3"
                >
                    <svg
                        className="text-gray-400 h-4 w-4  fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        xmlSpace="preserve"
                        width="512px"
                        height="512px"
                    >
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </span>
            </div>
            <section className="bg-white/40 sm:px-10 rounded-xl ring-2 ring-white ring-opacity-50 py-5">
                <div className="p-3">
                    <div className="overflow-x-auto h-[300px] overflow-y-scroll">
                        <table className="w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-800 bg-white/40 rounded-md">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            City Name
                                        </div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Country Name
                                        </div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Timezone
                                        </div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Population
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {cities
                                    ?.filter((city) => {
                                        if (searchValue == "") {
                                            return city;
                                        }
                                        if (
                                            city.name.toLocaleLowerCase().includes(
                                                searchValue.toLocaleLowerCase()
                                            )
                                        ) {
                                            return city;
                                        }
                                    })
                                    .map((city, idx) => (
                                        <tr key={idx}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-medium text-gray-800">
                                                    <Link target="_blank" href={`/weather/${city.name}?lon=${city.coordinates.lon}&lat=${city.coordinates.lat}`} >{city.name}</Link>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left text-gray-800">
                                                    {city.cou_name_en}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-gray-800">
                                                    {city.timezone}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-lg text-center text-gray-800">
                                                    {city.population}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CityTable;
