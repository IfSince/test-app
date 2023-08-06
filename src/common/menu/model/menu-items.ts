import {
    DIARY_ROUTE,
    HOME_ROUTE,
    PROFILE_ALLERGENICS_ROUTE,
    PROFILE_MEAL_PREFIX_ROUTE,
    PROFILE_NUTRITIONAL_DATA_ROUTE,
    PROFILE_PERSONAL_DATA_ROUTE,
    PROFILE_ROUTE,
    STATISTICS_ROUTE,
} from '../../../routes.ts';

export interface MenuItemInterface {
    name: string
    link: string
    icon: string
    children?: MenuItemInterface[]
}

export const MENU_ITEMS: MenuItemInterface[] = [
    { name: 'home', link: HOME_ROUTE, icon: 'home' },
    { name: 'diary', link: DIARY_ROUTE, icon: 'article' },
    { name: 'statistics', link: STATISTICS_ROUTE, icon: 'bar_chart' },
    {
        name: 'profile',
        link: PROFILE_ROUTE,
        icon: 'person',
        children: [
            {
                name: 'personal',
                link: PROFILE_PERSONAL_DATA_ROUTE,
                icon: 'person',
            },
            {
                name: 'nutrition',
                link: PROFILE_NUTRITIONAL_DATA_ROUTE,
                icon: 'person',
            },
            {
                name: 'allergies',
                link: PROFILE_ALLERGENICS_ROUTE,
                icon: 'person',
            },
            {
                name: 'meals',
                link: PROFILE_MEAL_PREFIX_ROUTE,
                icon: 'person',
            },
        ],
    },
]