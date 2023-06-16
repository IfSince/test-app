import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeView } from './views/home.view.tsx';
import { DiaryView } from './views/diary.view.tsx';
import { RootView } from './views/root.view.tsx';
import { NotFoundView } from './views/error.view.tsx';
import { DIARY_ROUTE, HOME_ROUTE, PROFILE_ROUTE, STATISTICS_ROUTE } from './routes.ts';
import { StatisticsView } from './views/statistics.view.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootView/>,
        errorElement: <NotFoundView/>,
        children: [
            { index: true, element: <Navigate to={ HOME_ROUTE } replace/> },
            { path: HOME_ROUTE, element: <HomeView/> },
            { path: DIARY_ROUTE, element: <DiaryView/> },
            { path: STATISTICS_ROUTE, element: <StatisticsView/> },
            { path: PROFILE_ROUTE, element: <DiaryView/> },
        ],
    },
])