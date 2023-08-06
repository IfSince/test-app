import { MealItem } from '../../meal/models/meal-item.ts';
import { SEARCH_FAVORITES, SEARCH_POPULAR, SEARCH_YOUR_MEALS } from '../meal-search-categories.ts';
import { useContext } from 'react';
import { MealSearchListItem } from './meal-search-list-item.tsx';
import { UserIdContext } from '../../../pages/root.view.tsx';
import { SearchCategory } from '../../../common/form/components/search-input/models/search-category.ts';

export const MealSearchList = ({ items, filterText, filterCategory }: { items: MealItem[], filterText: string, filterCategory: SearchCategory }) => {
    const userId = useContext(UserIdContext)

    const categoryFilterFunctions = {
        [SEARCH_YOUR_MEALS.description]: (item: MealItem) => item.userId === userId,
        [SEARCH_FAVORITES.description]: (item: MealItem) => item,
        [SEARCH_POPULAR.description]: (item: MealItem) => item,
    }

    return (
        <ul className="flex flex-col gap-2">
            {
                items
                    .filter(categoryFilterFunctions[filterCategory.description])
                    .filter(item => item.description.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
                    .map(mealItem => <MealSearchListItem key={ mealItem.id } mealItem={ mealItem }/>)
            }
        </ul>
    )
}