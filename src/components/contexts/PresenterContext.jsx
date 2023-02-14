import { useState, useEffect, createContext } from 'react';

export const PresenterContext = createContext();

export const PresenterProvider = ({children}) => {
  
    const [showPresenter, setShowPresenter] = useState(false);
    const [presenterWindow, setPresenterWindow] = useState(undefined);

    const presenterFunctions = {
        show: () => {
            setShowPresenter(true);
            if (presenterWindow) {
                presenterWindow.focus();
            }
        },
        close: () => {
            setShowPresenter(false);
            setPresenterWindow(undefined);
        },
        setWindow: (windowObject) => {
            setPresenterWindow(windowObject);
        }
    }

    useEffect(() => {
        const handleUnload = () => {
            if (!presenterWindow.closed) {
                presenterWindow.close();
            }
        }
        if (presenterWindow) {
            window.addEventListener(('unload'), handleUnload);
            return () => {
                document.removeEventListener('unload', handleUnload);
            }
        }
    }, [presenterWindow])

    return (
        <PresenterContext.Provider value={[showPresenter, presenterFunctions]}>
            {children}
        </PresenterContext.Provider>
    )
}