import { useState, useEffect, useRef } from "react";
import { Portal } from "@chakra-ui/react";
import { createPortal } from "react-dom";

function copyStyles(src, dest) {
    Array.from(src.styleSheets).forEach(styleSheet => {
        const styleElement = styleSheet.ownerNode.cloneNode(true);
        styleElement.href = styleSheet.href;    
        dest.head.appendChild(styleElement)
    })
    Array.from(src.fonts).forEach(font => dest.fonts.add(font))
}

const RenderInWindow = ({show, children, ...props}) => {
    const [container, setContainer] = useState(null);
    const containerRef = useRef(null);
    containerRef.current = container
    const newWindow = useRef(null);
  
    useEffect(() => {
      // Create container element on client-side
      setContainer(document.createElement("div"));
    }, []);
  
    useEffect(() => {
      // When container is ready
      if (container && show) {
        // Create window
        newWindow.current = window.open(
          "",
          "",
          "width=600,height=400,left=200,top=200"
        );
        // Append container
        newWindow.current.document.body.appendChild(container);

        copyStyles(window.document, newWindow.current.document);
  
        // Save reference to window for cleanup
        const curWindow = newWindow.current;
  
        // Return cleanup function
        return () => curWindow.close();
      }
    }, [container, show]);
    
    // return container && createPortal(children, container);
    return container &&
        <Portal containerRef={containerRef}>
            {children}
        </Portal>
  ;
};

export default RenderInWindow;