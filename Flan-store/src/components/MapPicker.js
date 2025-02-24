import React, { useEffect, useRef, useState } from "react";

const MapPicker = ({ setAddress }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.ymaps) {
        const script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=073432a6-5cf6-48b1-87fb-8b6da762d859";
        script.async = true;
        document.body.appendChild(script);
        script.onload = initMap;
      } else {
        initMap();
      }
    };

    const initMap = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [54.314192, 48.403132],
          zoom: 10,
          controls: ["zoomControl", "fullscreenControl"],
        });

        const placemark = new window.ymaps.Placemark(
          map.getCenter(),
          {},
          {
            preset: "islands#redDotIcon",
            draggable: true,
          }
        );

        map.geoObjects.add(placemark);
        setMarker(placemark);

        const updateAddress = (coords) => {
          window.ymaps.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
              setAddress(firstGeoObject.getAddressLine());
            } else {
              setAddress("Адрес не найден");
            }
          });
        };


        map.events.add("click", (e) => {
          const coords = e.get("coords");
          placemark.geometry.setCoordinates(coords);
          updateAddress(coords);
        });

        map.events.add("tap", (e) => {
          const coords = e.get("coords");
          placemark.geometry.setCoordinates(coords);
          updateAddress(coords);
        });

        placemark.events.add("dragend", () => {
          const coords = placemark.geometry.getCoordinates();
          updateAddress(coords);
        });


        placemark.events.add("mouseenter", () => {
          const coords = placemark.geometry.getCoordinates();
          updateAddress(coords);
        });
      });
    };

    loadMap();
  }, [setAddress]);

  return <div ref={mapRef} style={{ height: "300px", width: "100%", marginTop: "10px" }} />;
};

export default MapPicker;
