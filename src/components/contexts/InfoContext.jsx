import { useState, useEffect, createContext, useContext } from 'react';
import { useDisclosure } from "@chakra-ui/react"
import { ConfigContext } from './ConfigContext';
import FaqModal from "../info/FaqModal";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { home_steps, normal_round_steps, lightning_round_steps, editor_steps } from '../info/steps';

export const InfoContext = createContext();

export const InfoProvider = ({children}) => {
    
    const [config, configFunctions] = useContext(ConfigContext);
    const faqModalFunctions = useDisclosure();
    const [runTour, setRunTour] = useState(false);
    const [tourCurrentStep, setTourCurrentStep] = useState(0);
    const [tourSteps, setTourSteps] = useState(home_steps);

    const joyrideCallback = (state) => {
        // action, index, status, type or (event)
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(state.type)) {
            if (state.action === ACTIONS.NEXT) {
                setTourCurrentStep(Math.max(0, tourCurrentStep + 1));
            }
            else if (state.action === ACTIONS.PREV) {
                setTourCurrentStep(Math.max(0, tourCurrentStep - 1));
            }
            else if (state.action === ACTIONS.CLOSE) {
                setRunTour(false);
            }
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR].includes(state.status) || [ACTIONS.RESET].includes(state.action)) {
            setRunTour(false);
            setTourCurrentStep(0);
        }
    };

    const infoFunctions = {
        showFaq: () => {
            faqModalFunctions.onOpen();
        },
        startTour: () => {
            switch (config.currentPage) {
                case 'home':
                    setTourSteps(home_steps)
                    break;
                case 'round':
                    if (config.rounds[config.currentRound].type == 'normal') {
                        setTourSteps(normal_round_steps)
                    }
                    else {
                        setTourSteps(lightning_round_steps)
                    }
                    break;
                case 'editor':
                    setTourSteps(editor_steps)
                    break;
            }
            setTourCurrentStep(0);
            setRunTour(true);
        }
    }

    const tour = {
        runTour,
        tourSteps,
        tourCurrentStep,
        joyrideCallback
    }

    return (
        <InfoContext.Provider value={[infoFunctions, tour]}>
            <>
                <FaqModal modalFunctions={faqModalFunctions} />
                <Joyride
                    run={runTour}
                    steps={tourSteps}
                    stepIndex={tourCurrentStep}
                    callback={joyrideCallback}
                    scrollToFirstStep
                    scrollOffset={100}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    locale={{
                        last: "End Guide",
                    }}
                    styles={{
                        options: {
                            zIndex: 1000
                        },
                    }}
                />
                {children}
            </>
        </InfoContext.Provider>
    )
}