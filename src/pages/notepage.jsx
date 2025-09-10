import { useRef, useEffect, useState } from "react"
import { Canvas, FabricText, Rect, Textbox, IText } from "fabric"
import textBoxChange from "./notepageHelpers/textBoxChange";
"∫"

function newTextBox(fabricCanvasRef,innerText, options={}) {
    let text = new IText(innerText, options)
    text.on('changed', () => {
        textBoxChange(text, fabricCanvasRef)
        fabricCanvasRef.current.renderAll();
    });
    fabricCanvasRef.current.add(text)
    return text;
}

function onClick(options, fabricCanvasRef) {
    if (options.target) return;
    if (fabricCanvasRef.current.getActiveObject()) {
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.renderAll();
        return;
    }
    if (options.e.button === 2) return;
    const x = options.e.clientX;
    const y = options.e.clientY;
    let text = newTextBox(fabricCanvasRef,'', { left: x, top: y, editable: true, fontSize: 20 })
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
    text.enterEditing();
    text.selectAll();
}

function onRightClick(options, fabricCanvasRef) {

}

function onSelect(options, fabricCanvasRef) {
    const selectedObject = options.target;
}

export default function NotePage() {
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    const wrapperRef = useRef(null)
    useEffect(() => {
        fabricCanvasRef.current = new Canvas(canvasRef.current, {
            width: canvasRef.current.clientWidth,
            height: canvasRef.current.clientHeight,
            backgroundColor: 'white',
            fireRightClick: true,
            stopContextMenu: true,
        })
        // canvasRef.current.addEventListener('contextmenu', (e) => e.preventDefault());
        // wrapperRef.current.addEventListener('contextmenu', (e) => e.preventDefault());

        fabricCanvasRef.current.on('mouse:down', (options) => onClick(options, fabricCanvasRef))
        fabricCanvasRef.current.on('mouse2:down', (options) => onRightClick(options, fabricCanvasRef))
      

        let text = newTextBox(fabricCanvasRef, 'Hello World', { left: 100, top: 100, editable: true, fontSize: 20 })
        
        return () => {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
        };
    }, [])
    return (
        <>
            <div ref={wrapperRef} style={{ width: '100vw - 17px', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, display: 'block' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', overflow: "hidden", zIndex: "1000" }}></canvas>
            </div>
        </>
    )
}