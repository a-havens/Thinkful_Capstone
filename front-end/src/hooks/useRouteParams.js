import { useLocation } from 'react-router-dom';

export const useRouteParams = () => new URLSearchParams(useLocation().search);
