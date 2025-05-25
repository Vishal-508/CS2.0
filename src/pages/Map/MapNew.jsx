import { Fragment, useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { OuterContainer } from "../../components/UI";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchIssues, 
  setFilters, 
  setPagination 
} from '../../features/issues/issuesSlice';
// import "./App.css";
const markers = [
  {
    id: 1,
    name: "Mumbai",
    position: { lat: 19.076, lng: 72.8777 },
    description: "Financial capital of India",
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  },
  {
    id: 2,
    name: "Delhi",
    position: { lat: 28.7041, lng: 77.1025 },
    description: "National capital territory",
    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  },
  {
    id: 3,
    name: "Bangalore",
    position: { lat: 12.9716, lng: 77.5946 },
    description: "IT hub of India",
    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  },
  // Add others similarly...
];

function MapNew() {
      const dispatch = useDispatch();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });
  const {
    issues,
    loading,
    pagination,
    filters,
    // categories,
  } = useSelector((state) => state.issues);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
    useEffect(() => {
      dispatch(fetchIssues({
        page: pagination.page,
        limit: 100,
        search: filters.search,
        category: filters.category,
        status: filters.status,
        sort: filters.sort,
      }));
    }, [dispatch, pagination.page, filters]);


 
  return (
    <OuterContainer>
    <Fragment>
      <div className="container">
        <h1 className="text-center">CivicSync | Google Map Mrkers</h1>
        <div style={{ height: "90vh", width: "100%" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: 22.9734, lng: 78.6569 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "90vh" }}
            >
               
              {issues.map(({ _id, title, latitude, longitude, description, icon }) => (
                <MarkerF
                  key={_id}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => handleActiveMarker(_id)}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                  }}
                >
                  
                  {activeMarker === _id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
    </OuterContainer>
  );
}

export default MapNew;