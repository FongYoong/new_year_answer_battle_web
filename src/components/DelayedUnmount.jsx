import { useState, useEffect } from "react";

function DelayedUnmount({show, delay, children, ...props}) {

    const [mountRound, setMountRound] = useState(true);

    // uncomment this to implement the actual feature of delayedunmount
    // useEffect(() => {
    //     let id;
    //     if (show) {
    //         setMountRound(true)
    //     }
    //     else {
    //         id = setTimeout(() => {
    //             setMountRound(false)
    //         }, delay);
    //     }
    //     return () => clearTimeout(id)
    // }, [show])

    if (mountRound) {
        return children;
    }
    else {
        return undefined;
    }
}

export default DelayedUnmount;