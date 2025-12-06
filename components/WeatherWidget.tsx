"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Moon } from "lucide-react";

interface WeatherData {
    temperature: number;
    isDay: boolean;
    weatherCode: number;
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        // Bangalore Coordinates: 12.9716° N, 77.5946° E
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,is_day,weather_code&timezone=auto"
                );
                const data = await res.json();
                setWeather({
                    temperature: Math.round(data.current.temperature_2m),
                    isDay: data.current.is_day === 1,
                    weatherCode: data.current.weather_code,
                });
            } catch (error) {
                console.error("Failed to fetch weather", error);
            }
        };

        fetchWeather();
    }, []);

    if (!weather) return null;

    const getWeatherIcon = () => {
        // Simple mapping for Open-Meteo WMO codes
        // 0: Clear sky
        // 1, 2, 3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog
        // 51-55: Drizzle
        // 61-65: Rain
        const { weatherCode, isDay } = weather;

        if (weatherCode <= 1) return isDay ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4 text-blue-300" />;
        if (weatherCode <= 3) return <Cloud className="w-4 h-4 text-gray-400" />;
        if (weatherCode >= 51) return <CloudRain className="w-4 h-4 text-blue-400" />;

        return <Sun className="w-4 h-4 text-orange-400" />;
    };

    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1">
            {getWeatherIcon()}
            <span>Bengaluru, {weather.temperature}°C</span>
        </div>
    );
}
