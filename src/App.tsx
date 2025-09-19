import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AppProvider } from './contexts/AppContext';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const IdentityCapture = React.lazy(() => import('./pages/IdentityCapture').then(module => ({ default: module.IdentityCapture })));
const Verification = React.lazy(() => import('./pages/Verification').then(module => ({ default: module.Verification })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="font-sans antialiased">
            <Suspense fallback={<LoadingSpinner fullScreen text="Loading CryptoID..." />}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  } 
                />
                <Route 
                  path="/capture" 
                  element={
                    <ErrorBoundary>
                      <IdentityCapture />
                    </ErrorBoundary>
                  } 
                />
                <Route 
                  path="/verification" 
                  element={
                    <ErrorBoundary>
                      <Verification />
                    </ErrorBoundary>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <ErrorBoundary>
                      <NotFound />
                    </ErrorBoundary>
                  } 
                />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;