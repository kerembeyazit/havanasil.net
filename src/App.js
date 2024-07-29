import './App.css';
import {useEffect, useState} from "react";
import locationPermissionNotificationImage from './images/notification-popup.svg'; // Tell webpack this JS file uses this image
import githubIcon from './images/github-mark-white.svg';
import humidityIcon from './images/humidityIcon.svg';

// Tell webpack this JS file uses this image
function App() {
    const [manager, setManager] = useState({
        locationPermission: 'prompt',
        dataFetched: false,
        weatherData: undefined,
        dataLoaded: false
    });

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        let crd = pos.coords;

        setManager(prevState => ({
            ...prevState,
            locationPermission: 'granted',
            dataFetched: true
        }))

        if (!manager.dataFetched) {
            getWeather(crd.latitude, crd.longitude);
        }
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function getWeather(lat, long) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m&forecast_days=1`)
            .then(response => response.json())
            .then(data =>
                setManager(prevState => ({
                    ...prevState,
                    weatherData: data,
                    dataLoaded: true
                }))
            )
            .catch(error => console.error(error));
    }

    function Footer() {
        return <footer>
            <div><a href="https://github.com/kerembeyazit" style={{marginRight: "16px"}}><img width={16}
                                                                                              src={githubIcon}
                                                                                              alt=""/>kerembeyazit</a>
            </div>
            <div className={"meteo"} style={{display:"flex"}}>Veri kaynağı: <a
                href="https://open-meteo.com"><strong style={{marginLeft: "6px"}}>OpenMeteo</strong></a></div>
        </footer>
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then(function (result) {
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                });
        } else {
            setManager(prevState => ({
                ...prevState,
                locationPermission: 'error'
            }))
        }
    }, []);

    function returnTempClass(temp) {
        if (temp <= 15) {
            return "App cold"
            document.querySelector("body").className = "cold"
        } else if (temp <= 23) {
            document.querySelector("body").className = "spring"
            return "App spring"
        } else if (temp >= 24) {
            document.querySelector("body").className = "hot"
            return "App hot"
        } else {
            return "App"
        }
    }

    switch (manager.locationPermission) {
        case "prompt":
            return (
                <div className="App">
                    <div className="main-content text-left">
                        <div className="image"><img className={"mb-15 w-100"} src={locationPermissionNotificationImage}
                                                    alt=""/></div>
                        <div className="title mb-5">İzniniz gerekli</div>
                        <div className="content">Konumunuzdaki hava durumu bilgilerine erişmek için sol üst taraftaki
                            konum iznine izin veriniz.
                        </div>
                        <Footer/>
                    </div>
                </div>
            );
        case "granted":
            if (manager.dataLoaded) {
                let data = manager.weatherData;

                return (
                    <div className={returnTempClass(data.current.temperature_2m)}>
                        <div className="main-content">
                            <div className={"temp"} title={"Sıcaklık"}>{data.current.temperature_2m}<span>°C</span>
                            </div>
                            <div className={"humidity"} title={"Nem"}><img src={humidityIcon} alt="Nem"/>
                                <span>%</span>{data.current.relative_humidity_2m}</div>
                            <Footer/>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={"App"}>
                        <div className="main-content">
                            <div className={"temp"}>-<span>°C</span></div>
                            <Footer/>
                        </div>
                    </div>
                );
            }
        case "denied":
            return (
                <div className="App">
                    <div className="main-content">
                        <div className="image"><img className={"mb-15 w-100"} src={locationPermissionNotificationImage}
                                                    alt=""/></div>
                        <div className="title mb-5">İzniniz gerekli</div>
                        <div className="content">Konum iznine izin vermediniz. Konumunuzdaki hava durumu bilgilerine erişmek için sol üst taraftaki
                            konum iznine izin veriniz.
                            <Footer/>
                        </div>
                    </div>
                </div>
            );
        case "error":
            return (
                <div className="App">
                    <div className="main-content">
                        <div className="title mb-5">:(</div>
                        <div className="content">Tarayıcınız konum bilgisini desteklemiyor.
                            <Footer/>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="App">
                    <div className="main-content">
                        <div className="image"><img className={"mb-15 w-100"} src={locationPermissionNotificationImage}
                                                    alt=""/></div>
                        <div className="title mb-5">İzniniz gerekli</div>
                        <div className="content">Konumunuzdaki hava durumu bilgilerine erişmek için sol üst taraftaki
                            konum iznine izin veriniz.
                        </div>
                        <Footer/>
                    </div>
                </div>
            );
    }
}

export default App;
