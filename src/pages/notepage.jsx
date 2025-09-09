import { useRef, useEffect, useState } from "react"
import { Canvas, FabricText, Rect, Textbox, IText } from "fabric"
export default function NotePage() {
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    useEffect(() => {
        fabricCanvasRef.current = new Canvas(canvasRef.current, {
            width: canvasRef.current.clientWidth,
            height: canvasRef.current.clientHeight,
            backgroundColor: 'white'
        })
        const rect = new Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 200,
            height: 200
        })
        // canvas.add(rect)
        let text = new IText('Hello World', { left: 100, top: 100, editable: true, fontSize: 20 })
        fabricCanvasRef.current.add(text)

        return () => {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
        };
    }, [])
    return (
        <>
            <div style={{ width: '100vw - 17px', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, display: 'block' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', overflow: "hidden", zIndex: "1000" }}></canvas>
            </div>
        </>
    )
}