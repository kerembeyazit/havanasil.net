import React from 'react';
import locationPermissionNotificationImage from '../../images/notification-popup.svg';
import humidityIcon from '../../images/humidityIcon.svg';
import Footer from "../Footer";
import SunAnimation from "../Loading";

const PermissionStatus = ({ status, weatherData, loading }) => {
    let content, title;

    if (loading) {
        return (
            <SunAnimation />
        );
    }

    switch (status) {
        case 'prompt':
            title = 'İzniniz gerekli';
            content = (
                <>
                    <img className="mb-15 w-100" src={locationPermissionNotificationImage} alt="" />
                    Konumunuzdaki hava durumu bilgilerine erişmek için sol üst taraftaki konum iznine izin veriniz.
                </>
            );
            break;
        case 'denied':
            title = 'İzniniz gerekli';
            content = (
                <>
                    <img className="mb-15 w-100" src={locationPermissionNotificationImage} alt="" />
                    Konum iznine izin vermediniz. Konumunuzdaki hava durumu bilgilerine erişmek için sol üst taraftaki konum iznine izin veriniz.
                </>
            );
            break;
        case 'error':
            title = ':(';
            content = 'Tarayıcınız konum bilgisini desteklemiyor.';
            break;
        case 'loading':
            title = '';
            content = <div className="temp">-<span>°C</span></div>;
            break;
        case 'granted':
            if (weatherData) {
                const { temperature_2m, relative_humidity_2m } = weatherData.current;
                const getTempClass = (temp) => {
                    if (temp <= 15) return "cold";
                    if (temp <= 23) return "spring";
                    if (temp >= 24) return "hot";
                    return "";
                };
                const tempClass = getTempClass(temperature_2m);
                document.body.className = tempClass;

                return (
                    <div className={`App ${tempClass}`}>
                        <div className="main-content">
                            <div className="temp" title="Sıcaklık">{temperature_2m}<span>°C</span></div>
                            <div className="humidity" title="Nem">
                                <img src={humidityIcon} alt="Nem" /><span>%</span>{relative_humidity_2m}
                            </div>
                            <Footer />
                        </div>
                    </div>
                );
            }
            return null;
        default:
            return null;
    }

    return (
        <div className="App">
            <div className="main-content text-left">
                {title && <div className="title mb-5">{title}</div>}
                <div className="content">
                    {content}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default PermissionStatus;
