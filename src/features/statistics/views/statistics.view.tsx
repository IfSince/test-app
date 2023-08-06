import { UserIdContext } from '../../../views/root.view.tsx';
import { useContext } from 'react';
import { useGetNutritionalMetadataByUserIdQuery } from '../../user-metadata/user-metadata-api-slice.ts';
import { getNutritionalMetadataValueObjects } from '../../user-metadata/user-metadata.utils.ts';
import { ApiErrorMessage } from '../../../common/messages/api-error-message.tsx';
import { WeightStatisticsPanel } from '../components/weight-statistics-panel.tsx';
import { CalorieStatisticsPanel } from '../components/calorie-statistics-panel.tsx';
import { MacroStatisticsPanel } from '../components/macro-statistics-panel.tsx';
import { BlurOverlay } from '../../../common/blur-overlay.tsx';


export const StatisticsView = () => {
    const userId = useContext(UserIdContext)

    const {
        data: nutritionalMetaData,
        isLoading,
        isError,
        error,
    } = useGetNutritionalMetadataByUserIdQuery(userId)

    const recordings = nutritionalMetaData?.recordings

    const data = Object.keys(recordings || {}).map((key) => {
        return {
            date: key,
            ...getNutritionalMetadataValueObjects(recordings![key], nutritionalMetaData),
        }
    })

    const calorieIntakeData = data.map(({ date, calorieData }) => (
        { date, valueObject: calorieData }
    ))

    const macroIntakeData = data.map(({ date, macroData }) => (
        { date, protein: macroData.PROTEIN, carbohydrates: macroData.CARBOHYDRATES, fats: macroData.FATS }
    ))


    return (
        <div className="w-full">
            <ApiErrorMessage apiErrorResponse={ error }/>
            <div className="relative flex flex-wrap lg:flex-row">
                <BlurOverlay visible={ isLoading || isError }/>
                <div className="flex-layout-row">
                    <WeightStatisticsPanel weightRecordings={ nutritionalMetaData?.weightRecordings } isLoading={ isLoading }/>
                    <CalorieStatisticsPanel data={ calorieIntakeData } isLoading={ isLoading }/>
                </div>
                <div className="mt-10 flex-layout-row">
                    <MacroStatisticsPanel data={ macroIntakeData } isLoading={ isLoading }/>
                </div>
            </div>
        </div>
    );
}