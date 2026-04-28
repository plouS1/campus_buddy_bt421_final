import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import PhoneFrame from './components/PhoneFrame';
import OnboardingScreen from './screens/OnboardingScreen';
import FeedScreen from './screens/FeedScreen';
import FinderScreen from './screens/FinderScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingScreen />} />
      <Route path="/feed" element={<ProtectedRoute><FeedScreen /></ProtectedRoute>} />
      <Route path="/find" element={<ProtectedRoute><FinderScreen /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><MessagesScreen /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <PhoneFrame>
          <AppRoutes />
        </PhoneFrame>
      </AppProvider>
    </BrowserRouter>
  );
}
