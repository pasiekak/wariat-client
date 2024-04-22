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
        geowidget.setAttribute(
          "token",
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMjg5MDE4MzgsImlhdCI6MTcxMzU0MTgzOCwianRpIjoiYzlmMGRmMDktNTA1MC00MDc4LThlNGYtMzEyYTZhNTEwYTU4IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpPU2MzYTBMV05qUHZIbmlFb2UzSFlNVkVzMzhpN3Y5Ui14VzcxbDBaYk1BIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiY2U4YWNjZTEtMjNiNS00MjI4LWJjOWMtMTMwNWIxODlhYzQ1Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImNlOGFjY2UxLTIzYjUtNDIyOC1iYzljLTEzMDViMTg5YWM0NSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6ImNlMmNjY2FiLWM3OWItNDdkYi1iMDZlLWI5MTgwZjU5MzExYyJ9.CuV0PZmBD-PJkW40vCWxE02n7ggg5IXX60w1-iEOc0yhdtf5G243Kzq1oj3kFPLlex_tdjlpi9BqlddQ8Mdu6HyoF0puawrgwd3S-5akP3VMr4a2rpcBfXS5dcZL4d6jRXvrFNQSg-8nt_3IjKiLHVyZjjzTS2NV1xIYkJxA7HAb0ImMY2xujxrPTI5a6rMe29a_XBeOVJUs0OfnLfi__v7O6TA5tDiKPG42lSn4vaBbO9SG-Jz_LHW0ajfg513Owv_gHxfrbW-icx-gwZDFtkWv3fWU6ELU_9y8t4mGeN6TTSUr2AON01nL2fHopfRUjNPvcsKf97jt9E-nCFcWHQ",
        );
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
