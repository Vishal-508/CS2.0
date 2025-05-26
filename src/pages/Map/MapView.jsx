import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { fetchIssues } from '../../features/issues/issuesSlice'; // Changed from fetchMapIssues
import { Loading, Card } from '../../components/UI';
import { FaMapMarkerAlt } from 'react-icons/fa';
import OuterContainer from '../../components/UI/OuterContainer';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = () => {
  const dispatch = useDispatch();
  const { issues, loading } = useSelector((state) => state.issues);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    dispatch(fetchIssues({
      page: 1,
      limit: 100, // Fetch more issues for the map view
      sort: '-1' // Optional: sort by creation date
    }))
    .unwrap()
    .catch((error) => {
      toast.error(error.message || 'Failed to load map data');
    });
  }, [dispatch]);

  // Calculate bounds to fit all markers
  useEffect(() => {
    if (issues?.length > 0) {
      const latitudes = issues.map(issue => issue.latitude).filter(lat => lat);
      const longitudes = issues.map(issue => issue.longitude).filter(lng => lng);
      
      if (latitudes.length > 0 && longitudes.length > 0) {
        const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
        const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
        setCenter([avgLat, avgLng]);
        setZoom(12);
      }
    }
  }, [issues]);

  // Custom marker icon
  const createMarkerIcon = (status) => {
    let color;
    switch (status) {
      case 'Pending':
        color = '#FFA500'; // Orange
        break;
      case 'In Progress':
        color = '#1E90FF'; // Dodger Blue
        break;
      case 'Resolved':
        color = '#32CD32'; // Lime Green
        break;
      default:
        color = '#FF0000'; // Red
    }

    return new L.DivIcon({
      html: `<div style="color: ${color}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg></div>`,
      className: 'custom-marker-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });
  };

  if (loading && !issues?.length) {
    return <Loading />;
  }
console.log("Mapissues",issues)
  return (
    <OuterContainer>
      <Container>
        <MapCard>
          <h2>Issues Map View</h2>
          <p>Showing {issues?.length || 0} issues</p>
          <MapWrapper>
            <MapContainer 
              center={center} 
              zoom={zoom} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {issues?.map((issue) => (
                issue.latitude && issue.longitude && (
                  <Marker
                    key={issue._id}
                    position={[issue.latitude, issue.longitude]}
                    icon={createMarkerIcon(issue.status)}
                  >
                    <Popup>
                      <PopupContent>
                        <h3>{issue.title}</h3>
                        <p><strong>Status:</strong> {issue.status}</p>
                        <p><strong>Category:</strong> {issue.category}</p>
                        <p><strong>Votes:</strong> {issue.voteCount || 0}</p>
                        <p><strong>Location:</strong> {issue.location}</p>
                        {issue.imageUrl && (
                          <img 
                            src={issue.imageUrl} 
                            alt={issue.title}
                            style={{ width: '100%', margin: '0.5rem 0', borderRadius: '4px' }}
                          />
                        )}
                        <ViewButton to={`/issues/${issue._id}`}>
                          <FaMapMarkerAlt /> View Details
                        </ViewButton>
                      </PopupContent>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </MapWrapper>
        </MapCard>
      </Container>
    </OuterContainer>
  );
};


const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MapCard = styled(Card)`
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

const PopupContent = styled.div`
  padding: 0.5rem;
  min-width: 200px;
  max-width: 300px;

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radii.sm};
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

// ... (keep all your existing styled components)

export default MapView;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Link } from 'react-router-dom';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { toast } from 'react-toastify';
// import styled from 'styled-components';
// import { fetchMapIssues } from '../../features/issues/issuesSlice';
// import { Loading, Card } from '../../components/UI';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import OuterContainer from '../../components/UI/OuterContainer';

// // Fix for default marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const MapView = () => {
//   const dispatch = useDispatch();
//   const { issues, loading } = useSelector((state) => state.issues);
//   const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)
//   const [zoom, setZoom] = useState(5);

//   useEffect(() => {
//     dispatch(fetchMapIssues())
//       .unwrap()
//       .catch((error) => {
//         toast.error(error.message || 'Failed to load map data');
//       });
//   }, [dispatch]);

//   // Calculate bounds to fit all markers
//   useEffect(() => {
//     if (issues.length > 0) {
//       const latitudes = issues.map(issue => issue.latitude).filter(lat => lat);
//       const longitudes = issues.map(issue => issue.longitude).filter(lng => lng);
      
//       if (latitudes.length > 0 && longitudes.length > 0) {
//         const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
//         const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
//         setCenter([avgLat, avgLng]);
//         setZoom(12);
//       }
//     }
//   }, [issues]);

//   // Custom marker icon
//   const createMarkerIcon = (status) => {
//     let color;
//     switch (status) {
//       case 'Pending':
//         color = '#FFA500'; // Orange
//         break;
//       case 'In Progress':
//         color = '#1E90FF'; // Dodger Blue
//         break;
//       case 'Resolved':
//         color = '#32CD32'; // Lime Green
//         break;
//       default:
//         color = '#FF0000'; // Red
//     }

//     return new L.DivIcon({
//       html: `<div style="color: ${color}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg></div>`,
//       className: 'custom-marker-icon',
//       iconSize: [24, 24],
//       iconAnchor: [12, 24],
//     });
//   };

//   if (loading && !issues.length) {
//     return <Loading />;
//   }

//   return (
//     <OuterContainer>
//       <Container>
//         <MapCard>
//           <h2>Issues Map View</h2>
//           <MapWrapper>
//             <MapContainer 
//               center={center} 
//               zoom={zoom} 
//               style={{ height: '100%', width: '100%' }}
//               scrollWheelZoom={true}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               {issues.map((issue) => (
//                 issue.latitude && issue.longitude && (
//                   <Marker
//                     key={issue._id}
//                     position={[issue.latitude, issue.longitude]}
//                     icon={createMarkerIcon(issue.status)}
//                   >
//                     <Popup>
//                       <PopupContent>
//                         <h3>{issue.title}</h3>
//                         <p><strong>Status:</strong> {issue.status}</p>
//                         <p><strong>Category:</strong> {issue.category}</p>
//                         <p><strong>Votes:</strong> {issue.voteCount || 0}</p>
//                         <p><strong>Location:</strong> {issue.location}</p>
//                         {issue.imageUrl && (
//                           <img 
//                             src={issue.imageUrl} 
//                             alt={issue.title}
//                             style={{ width: '100%', margin: '0.5rem 0', borderRadius: '4px' }}
//                           />
//                         )}
//                         <ViewButton to={`/issues/${issue._id}`}>
//                           <FaMapMarkerAlt /> View Details
//                         </ViewButton>
//                       </PopupContent>
//                     </Popup>
//                   </Marker>
//                 )
//               ))}
//             </MapContainer>
//           </MapWrapper>
//         </MapCard>
//       </Container>
//     </OuterContainer>
//   );
// };

// const Container = styled.div`
//   padding: 1rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const MapCard = styled(Card)`
//   padding: 1rem;

//   h2 {
//     margin-bottom: 1rem;
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const MapWrapper = styled.div`
//   height: 600px;
//   width: 100%;
//   border-radius: ${({ theme }) => theme.radii.md};
//   overflow: hidden;
// `;

// const PopupContent = styled.div`
//   padding: 0.5rem;
//   min-width: 200px;
//   max-width: 300px;

//   h3 {
//     margin: 0 0 0.5rem 0;
//     color: ${({ theme }) => theme.colors.primary};
//     font-size: 1rem;
//   }

//   p {
//     margin: 0.25rem 0;
//     font-size: 0.9rem;
//   }
// `;

// const ViewButton = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   margin-top: 0.5rem;
//   padding: 0.25rem 0.5rem;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border-radius: ${({ theme }) => theme.radii.sm};
//   text-decoration: none;
//   font-size: 0.8rem;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primaryDark};
//   }
// `;

// export default MapView;



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Link } from 'react-router-dom';  // This is the missing import
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// // import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
// import styled from 'styled-components';
// import { fetchMapIssues } from '../../features/issues/issuesSlice';
// import { Loading, Card } from '../../components/UI';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import OuterContainer from '../../components/UI/OuterContainer';
// // Fix for default marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const MapView = () => {
//   const dispatch = useDispatch();
//   const { issues, loading } = useSelector((state) => state.issues);
//   const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)
//   const [zoom, setZoom] = useState(5);

//   useEffect(() => {
//     dispatch(fetchMapIssues())
//       .unwrap()
//       .catch((error) => {
//         toast.error(error.message || 'Failed to load map data');
//       });
//   }, [dispatch]);

//   // Custom marker icon
//   const createMarkerIcon = (status) => {
//     let color;
//     switch (status) {
//       case 'Pending':
//         color = '#FFA500'; // Orange
//         break;
//       case 'In Progress':
//         color = '#1E90FF'; // Dodger Blue
//         break;
//       case 'Resolved':
//         color = '#32CD32'; // Lime Green
//         break;
//       default:
//         color = '#FF0000'; // Red
//     }

//     return new L.DivIcon({
//       html: `<div style="color: ${color}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg></div>`,
//       className: 'custom-marker-icon',
//       iconSize: [24, 24],
//       iconAnchor: [12, 24],
//     });
//   };

//   if (loading && !issues.length) {
//     return <Loading />;
//   }

//   return (
//     <OuterContainer>
//     <Container>
//       <MapCard>
//         <h2>Issues Map View</h2>
//         <MapWrapper>
//           <MapContainer 
//             center={center} 
//             zoom={zoom} 
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {issues.map((issue) => (
//               issue.locationCoords && (
//                 <Marker
//                   key={issue._id}
//                   position={[
//                     issue.locationCoords.latitude,
//                     issue.locationCoords.longitude
//                   ]}
//                   icon={createMarkerIcon(issue.status)}
//                 >
//                   <Popup>
//                     <PopupContent>
//                       <h3>{issue.title}</h3>
//                       <p><strong>Status:</strong> {issue.status}</p>
//                       <p><strong>Votes:</strong> {issue.votes || 0}</p>
//                       <p><strong>Location:</strong> {issue.location}</p>
//                       <ViewButton to={`/issues/${issue._id}`}>
//                         View Details
//                       </ViewButton>
//                     </PopupContent>
//                   </Popup>
//                 </Marker>
//               )
//             ))}
//           </MapContainer>
//         </MapWrapper>
//       </MapCard>
//     </Container>
//     </OuterContainer>
//   );
// };

// const Container = styled.div`
//   padding: 1rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const MapCard = styled(Card)`
//   padding: 1rem;

//   h2 {
//     margin-bottom: 1rem;
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const MapWrapper = styled.div`
//   height: 600px;
//   width: 100%;
//   border-radius: ${({ theme }) => theme.radii.md};
//   overflow: hidden;
// `;

// const PopupContent = styled.div`
//   padding: 0.5rem;
//   min-width: 200px;

//   h3 {
//     margin: 0 0 0.5rem 0;
//     color: ${({ theme }) => theme.colors.primary};
//     font-size: 1rem;
//   }

//   p {
//     margin: 0.25rem 0;
//     font-size: 0.9rem;
//   }
// `;

// const ViewButton = styled(Link)`
//   display: inline-block;
//   margin-top: 0.5rem;
//   padding: 0.25rem 0.5rem;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border-radius: ${({ theme }) => theme.radii.sm};
//   text-decoration: none;
//   font-size: 0.8rem;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primaryDark};
//   }
// `;

// export default MapView;