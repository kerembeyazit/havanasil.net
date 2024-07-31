import './App.css';
import { useEffect, useState } from "react";
import PermissionStatus from "./components/PermissionStatus";

const App = () => {
    const [manager, setManager] = useState({
        locationPermission: 'prompt',
        dataFetched: false,
        weatherData: null,
        dataLoaded: false,
        loading: false,
    });

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const success = (pos) => {
        const { latitude, longitude } = pos.coords;

        if (!manager.dataFetched) {
            setManager(prevState => ({ ...prevState, loading: true }));
            getWeather(latitude, longitude);
        }

        setManager(prevState => ({
            ...prevState,
            locationPermission: 'granted',
            dataFetched: true,
        }));
    };

    const errors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const getWeather = async (lat, long) => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m&forecast_days=1`);
            const data = await response.json();
            setManager(prevState => ({
                ...prevState,
                weatherData: data,
                dataLoaded: true,
                loading: false,
            }));
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setManager(prevState => ({
                ...prevState,
                loading: false,
            }));
        }
    };

    useEffect(() => {
        const checkGeolocation = async () => {
            if (navigator.geolocation) {
                try {
                    const result = await navigator.permissions.query({ name: "geolocation" });
                    if (result.state === "granted" || result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        setManager(prevState => ({
                            ...prevState,
                            locationPermission: 'denied',
                        }));
                    }
                } catch (error) {
                    console.error('Error querying geolocation permissions:', error);
                }
            } else {
                setManager(prevState => ({
                    ...prevState,
                    locationPermission: 'error',
                }));
            }
        };

        checkGeolocation();
    }, [options]);

    return (
        <PermissionStatus
            status={manager.locationPermission}
            weatherData={manager.weatherData}
            loading={manager.loading}
        />
    );
};

export default App;
