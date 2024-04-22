import { useEffect, useRef } from "react"; // Rozszerzenie interfejsu Window o właściwość afterPointSelected

// Rozszerzenie interfejsu Window o właściwość afterPointSelected
declare global {
  interface Window {
    afterPointSelected?: (point: any) => void;
  }
}

type InPostWidgetProps = {
  handleInpostSelect: (point: any) => void;
  initialPosition?: {
    latitude: number;
    longitude: number;
  };
};

const InPostWidget = (props: InPostWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let geowidget: HTMLElement;
    const widgetRef = ref.current;

    // Definicja funkcji obsługującej zdarzenie onpoint
    window.afterPointSelected = (point: any) => {
      props.handleInpostSelect(point);
    };

    const script = document.createElement("script");
    script.src = "https://geowidget.inpost.pl/inpost-geowidget.js";
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (widgetRef) {
        geowidget = document.createElement("inpost-geowidget");
        geowidget.setAttribute("token", import.meta.env.VITE_INPOST_TOKEN);
        geowidget.setAttribute("language", "pl");
        geowidget.setAttribute("config", "parcelCollect");

        // Ustawienie funkcji afterPointSelected jako callback dla onpoint
        geowidget.setAttribute("onpoint", "afterPointSelected");
        geowidget.addEventListener("inpost.geowidget.init", (event: any) => {
          const api = event.detail.api;
          if (props.initialPosition)
            api.changePosition({
              longitude: props.initialPosition.longitude,
              latitude: props.initialPosition.latitude,
            });
        });
        widgetRef.appendChild(geowidget);
      }
    };

    return () => {
      document.body.removeChild(script);
      if (widgetRef && geowidget) widgetRef.removeChild(geowidget);

      // Usunięcie funkcji afterPointSelected z obiektu window
      if (window.afterPointSelected) {
        delete window.afterPointSelected;
      }
    };
  }, [ref, props]);

  return <div id="inpost-geowidget-container" ref={ref}></div>;
};

export default InPostWidget;
