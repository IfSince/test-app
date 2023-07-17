import { PrimaryIconButton } from '../../../common/button/components/icon/primary-icon-button.tsx';
import { ProgressLinear } from '../../../common/progress/components/progress-linear.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { goToStep, selectRegister, submitStep } from '../../../redux/slices/register-slice.ts';
import { PrimaryButton } from '../../../common/button/components/primary-button.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { RegisterData } from '../../../redux/models/register/register-data.ts';
import { useRef } from 'react';

export const RegisterLayoutView = () => {
    const submit = (data: RegisterData) => {
        dispatch(submitStep(data))
        navigate(`/register/${ registerState.steps[registerState.currentStepIndex + 1].route }`)
    }

    const goBack = () => {
        dispatch(goToStep(registerState.currentStepIndex - 1))
        navigate(-1)
    }

    const updateRegisterRef = (data: Partial<RegisterData>) => registerDataRef.current = { ...registerDataRef.current, ...data }

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const registerState = useAppSelector(selectRegister)
    const registerDataRef = useRef(registerState.data)

    return (
        <div className="flex min-h-screen justify-center lg:min-h-fit">
            <div className="mb-10 flex w-full max-w-5xl flex-col justify-between px-5 pt-10 pb-0">
                <div>
                    <div className="flex items-center justify-between gap-14">
                        <PrimaryIconButton icon="arrow_back" action={ () => goBack() }/>
                        <div className="w-full max-w-sm self-start justify-self-center">
                            <ProgressLinear width={ 10 }
                                            valueObject={ { value: registerState.currentStepIndex + 1, total: registerState.steps.length } }/>
                        </div>
                        <PrimaryIconButton icon="settings" action={ () => console.log(registerState) }/>
                        {/*<div className="w-12"></div>*/ }
                    </div>

                    <h4 className="mt-10 text-center font-medium uppercase text-cyan-300 lg:mt-14 lg:text-lg">
                        Step <span className="tracking-wide"> { `${ registerState.currentStepIndex + 1 }/${ registerState.steps.length }` }
                    </span>
                    </h4>

                    <div className="mt-2 flex flex-col items-center lg:mt-4">
                        <div className="flex w-full max-w-xl flex-col items-center">
                            <Outlet context={ [registerDataRef, updateRegisterRef] }/>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex w-full justify-center lg:mt-14 xl:mt-20">
                    <PrimaryButton action={ () => submit(registerDataRef.current) } className="w-full max-w-md">
                        <span className="font-medium whitespace-nowraptext-base">Continue</span>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}