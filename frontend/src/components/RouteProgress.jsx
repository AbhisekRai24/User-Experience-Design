import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 80,

    minimum: 0.1,
});

const RouteProgress = () => {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done(true);
        };
    }, [location.pathname]);

    return null;
};

export default RouteProgress;
