import { useRef, useEffect, useState, useContext } from "react"
import ImgContext from "../context/ImageReduction";

const Canvas = () => {
    const { setPolygonFrame,inputsRef,imagePath } = useContext(ImgContext);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState([]);
    const [src, setSrc] = useState("")


    useEffect(() => {
        setSrc(imagePath);
    }, [imagePath]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const loadImage = () => {
            const imgOnCanvas = new Image();
            imgOnCanvas.src = src;
            imgOnCanvas.onload = () => {
                context.drawImage(imgOnCanvas, 0, 0, canvas.width, canvas.height);
            };
        };
        if (src) {
            loadImage();
            setLastPoint([]);
        }
    }, [src]);


    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setLastPoint([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
    };

    const draw = (e) => {
        if (imagePath) {
            if (!isDrawing) return;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            setLastPoint([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.stroke();
            setPolygonFrame((prevPoints) => [...prevPoints, lastPoint]);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return <>
        <div ref={inputsRef}>
            <canvas ref={canvasRef} id="canvas" src={src} height={200}
                onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseOut={stopDrawing} />
        </div>
    </>
}

export default Canvas;