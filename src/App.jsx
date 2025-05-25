import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './features/auth/authSlice';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import IssueList from './pages/Issues/IssueList';
import IssueDetail from './pages/Issues/IssueDetail';
import CreateIssue from './pages/Issues/CreateIssue';
import EditIssue from './pages/Issues/EditIssue';
import MyIssues from './pages/Issues/MyIssues';
import MapView from './pages/Map/MapView';
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import { toast } from 'react-hot-toast';
import MapNew from './pages/Map/MapNew';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in on initial load
    if (token) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          toast.error('Session expired. Please login again.');
        });
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="issues">
            <Route index element={<IssueList />} />
            <Route path="create" element={
              <ProtectedRoute>
                <CreateIssue />
              </ProtectedRoute>
            } />
            <Route path="edit/:id" element={
              <ProtectedRoute>
                <EditIssue />
              </ProtectedRoute>
            } />
            <Route path=":id" element={<IssueDetail />} />
            <Route path="my-issues" element={
              <ProtectedRoute>
                <MyIssues />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="map" element={<MapNew />} />

          <Route path="analytics" element={
            <ProtectedRoute>
              <AnalyticsDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { getCurrentUser } from './features/auth/authSlice';
// import { fetchCategories } from './features/issues/issuesSlice';
// import { ThemeProvider } from 'styled-components';
// import GlobalStyles from './styles/GlobalStyles';
// import theme from './styles/theme';
// import ProtectedRoute from './routes/ProtectedRoute';
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import IssueList from './pages/Issues/IssueList';
// import IssueDetail from './pages/Issues/IssueDetail';
// import CreateIssue from './pages/Issues/CreateIssue';
// import EditIssue from './pages/Issues/EditIssue';
// import MyIssues from './pages/Issues/MyIssues';
// import MapView from './pages/Map/MapView';
// import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
// import { toast } from 'react-hot-toast';

// const App = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Check if user is logged in on initial load
//     if (token) {
//       dispatch(getCurrentUser())
//         .unwrap()
//         .catch(() => {
//           toast.error('Session expired. Please login again.');
//         });
//     }

//     // Fetch categories needed for forms
//     dispatch(fetchCategories());
//   }, [dispatch, token]);

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyles />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
          
//           <Route path="issues">
//             <Route index element={<IssueList />} />
//             <Route path="create" element={
//               <ProtectedRoute>
//                 <CreateIssue />
//               </ProtectedRoute>
//             } />
//             <Route path="edit/:id" element={
//               <ProtectedRoute>
//                 <EditIssue />
//               </ProtectedRoute>
//             } />
//             <Route path=":id" element={<IssueDetail />} />
//             <Route path="my-issues" element={
//               <ProtectedRoute>
//                 <MyIssues />
//               </ProtectedRoute>
//             } />
//           </Route>

//           <Route path="map" element={<MapView />} />

//           <Route path="analytics" element={
//             <ProtectedRoute>
//               <AnalyticsDashboard />
//             </ProtectedRoute>
//           } />

//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Route>
//       </Routes>
//     </ThemeProvider>
//   );
// };

// export default App;