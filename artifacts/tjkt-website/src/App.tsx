import { type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import NotFound from '@/pages/not-found';
import { AboutPage, ContactPage, FacilitiesPage, HomePage, LearningPage } from '@/pages';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Shell } from '@/components/site-shell';

function Router() {
  return (
    <RoutedErrorBoundary>
      <Shell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/tentang" component={AboutPage} />
          <Route path="/pembelajaran" component={LearningPage} />
          <Route path="/fasilitas" component={FacilitiesPage} />
          <Route path="/kontak" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </>
  );
}

export default App;