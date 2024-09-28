
import React from 'react'
import { MdManageSearch } from "react-icons/md";
import { GiTakeMyMoney, GiConfirmed } from "react-icons/gi";
import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeading, PopoverAction } from 'keep-react'

export const PopoverComponent1 = () => {
    return (
        <Popover placement="right">
            <PopoverAction>étape 1</PopoverAction>
            <PopoverContent className="z-20 max-w-xs rounded-xl bg-white p-6 dark:border-metal-800 dark:bg-metal-900 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
                    <MdManageSearch  size={24}  />
                </div>
                <div className="space-y-2 pt-4">
                    <PopoverHeading className="text-body-2 font-semibold">1-Choissiser votre Offre</PopoverHeading>
                    <PopoverDescription>
                        Choissiser l'offre d'abonnement qui correspond le mieux à vos besoins parmis nos 3 offres.
                    </PopoverDescription>
                </div>
            </PopoverContent>
        </Popover>


    )
}

export const PopoverComponent2 = () => {
    return (
        <Popover placement="left">
            <PopoverAction>étape 2</PopoverAction>
            <PopoverContent className="z-20 max-w-xs rounded-xl bg-white p-6 dark:border-metal-800 dark:bg-metal-900 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
                    <GiTakeMyMoney size={24}  />
                </div>
                <div id='step2' className="space-y-2 pt-4">
                    <PopoverHeading className="text-body-2 font-semibold">2-Effectuer le payment</PopoverHeading>
                    <PopoverDescription>
                        Une fois l'offre choisis, effectuer le payment via l'un des moyens fournis.
                    </PopoverDescription>
                </div>
            </PopoverContent>
        </Popover>

    )
}

export const PopoverComponent3 = () => {
    return (
        <Popover placement="right">
            <PopoverAction>étape 3</PopoverAction>
            <PopoverContent className="z-20 max-w-xs rounded-xl bg-white p-6 dark:border-metal-800 dark:bg-metal-900 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
                    <GiConfirmed size={24} />
                </div>
                <div id='step3' className="space-y-2 pt-4">
                    <PopoverHeading className="text-body-2 font-semibold">3-Preuve de payment</PopoverHeading>
                    <PopoverDescription>
                        Aprés avoir effectuer le payment veuillez fournir la preuve de ce dernier, and enjoy ;).
                    </PopoverDescription>
                </div>            
            </PopoverContent>
        </Popover>

    )
}
