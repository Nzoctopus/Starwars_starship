import React, { useRef, useEffect } from "react";
import { filterSatelliteListAtom } from "../atoms";
import { useAtom } from "jotai";

export default function SatelliteCanva() {
    const canvasRef = useRef(null);
    const [list, setList] = useAtom(filterSatelliteListAtom);

    useEffect(() => {
        const canvas = canvasRef.current;
        let satellites = list.map((item) => ({
            name: item.name,
            size: item.size,
            speed: item.speed,
            pos: { x: item.posX, y: item.posY },
            start: { x: item.posX, y: item.posY },
            target: { x: item.targetX, y: item.targetY },
            vel: { x: 0, y: 0 },
            faction: item.faction,
        }));
        const manageCollisionSmooth = () => {
            for (let i = 0; i < satellites.length; i++)
                for (let j = 0; j < satellites.length; j++) {
                    if (i == j) continue;
                    const diff = {
                        x: satellites[i].pos.x - satellites[j].pos.x,
                        y: satellites[i].pos.y - satellites[j].pos.y,
                    };
                    const dist = Math.sqrt(diff.x ** 2 + diff.y ** 2);
                    const radius =
                        satellites[i].size * 1.5 + satellites[j].size * 1.5;
                    if (dist < radius) {
                        satellites[i].vel.x = (diff.x / dist) * 2.5;
                        satellites[i].vel.y = (diff.y / dist) * 2.5;
                    }
                    satellites[i].vel.x *= satellites[i].speed / 5;
                    satellites[i].vel.y *= satellites[i].speed / 5;
                }
        };
        const setupVelocity = () => {
            satellites.forEach((element) => {
                const delta = {
                    x: element.target.x - element.pos.x,
                    y: element.target.y - element.pos.y,
                };
                const dist = Math.sqrt(delta.x ** 2 + delta.y ** 2);
                if (dist > 1) {
                    element.vel.x = delta.x / dist;
                    element.vel.y = delta.y / dist;
                } else {
                    element.vel.x = 0;
                    element.vel.y = 0;
                    element.target.x = element.start.x;
                    element.target.y = element.start.y;
                    element.start.x = element.pos.x;
                    element.start.y = element.pos.y;
                }
            });
        };
        const ctx = canvas.getContext("2d");
        const CanvasLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setupVelocity();
            manageCollisionSmooth();
            satellites.forEach((element) => {
                element.pos.x += element.vel.x;
                element.pos.y += element.vel.y;
                if (element.faction == 1) ctx.fillStyle = "blue";
                else ctx.fillStyle = "red";
                ctx.fillRect(
                    (element.pos.x - element.size / 2) *
                        (window.innerWidth / 1920),
                    (element.pos.y - element.size / 2) *
                        (window.innerHeight / 1080),
                    element.size,
                    element.size
                );
                ctx.fillStyle = "white";
                ctx.font = "15px Arial";
                ctx.fillText(
                    element.name,
                    element.pos.x * (window.innerWidth / 1920),
                    element.pos.y * (window.innerHeight / 1080) + 30
                );
            });
            requestAnimationFrame(CanvasLoop);
        };
        CanvasLoop();
    }, [list]);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className="fixed left-0 top-0 opacity-80 z-[-1]"
        />
    );
}
