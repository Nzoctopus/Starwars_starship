import React, { useRef, useEffect } from "react";

export default function SatelliteCanva() {
    let pos = { x: 0, y: 0 };
    const target = { x: 150, y: 170 };
    const canvasRef = useRef(null);
    const squareSize = 10;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const CanvasLoop = () => {
            const delta = {
                x: target.x - pos.x,
                y: target.y - pos.y,
            };
            const dist = Math.sqrt(delta.x ** 2 + delta.y ** 2);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "blue";
            ctx.fillRect(pos.x, pos.y, squareSize, squareSize);
            if (dist > 1) {
                pos.x += delta.x / dist;
                pos.y += delta.y / dist;
                requestAnimationFrame(CanvasLoop);
            } else {
                pos.x = target.x;
                pos.y = target.y;
            }
        };
        CanvasLoop();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={200}
            height={200}
            style={{ border: "1px solid black" }}
        />
    );
}
