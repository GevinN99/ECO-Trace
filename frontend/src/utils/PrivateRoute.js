import { Outlet, Navigate } from "react-router-dom";

const PrivateRouteAdmin = () => {
    const userId = localStorage.getItem('userId');
    return (userId && userId.startsWith('AD')) ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRouteCEA = () => {
    const userId = localStorage.getItem('userId');
    return (userId && userId.startsWith('CEA')) ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRouteMRF = () => {
    const userId = localStorage.getItem('userId');
    return (userId && userId.startsWith('MRF')) ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRouteAdmin, PrivateRouteCEA, PrivateRouteMRF };
