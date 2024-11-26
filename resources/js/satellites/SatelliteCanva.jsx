import React, { useRef, useEffect } from "react";
import { filterSatelliteListAtom } from "../atoms";
import { useAtom } from "jotai";

export default function SatelliteCanva() {
    const canvasRef = useRef(null);
    const [list, setList] = useAtom(filterSatelliteListAtom);

    useEffect(() => {
        let timeOutID;
        let intervalID;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let satellites = list.map((item) => ({
            name: item.name,
            size: item.size,
            speed: item.speed,
            pos: { x: item.posX, y: item.posY },
            start: { x: item.posX, y: item.posY },
            target: { x: item.targetX, y: item.targetY },
            vel: { x: 0, y: 0 },
            faction: item.faction,
            img: new Image(),
            catImg: new Image(),
            imgRect: { x: 0, y: 0, width: 300, height: 138, max_width: 1500 },
            catState: 0,
            catVel: { x: 0, y: 0 },
            catPos: { x: 0, y: 0 },
            state: 1, // 1 for normal dest | 2 for attacking | 3 for fleeing
            targetIndex: 0,
        }));
        satellites.forEach((element) => {
            element.img.src =
                element.faction == 1
                    ? "/images/Rebel_emblem.png"
                    : "/images/Empire_emblem.png";
            element.catImg.src = "/images/cat.gif";
        });

        const setupProjectile = (item) => {
            item.catState = 1;
            item.catPos.x = item.pos.x;
            item.catPos.y = item.pos.y;
            const targetPos = {
                x:
                    satellites[item.targetIndex].pos.x -
                    satellites[item.targetIndex].size / 2,
                y:
                    satellites[item.targetIndex].pos.y -
                    satellites[item.targetIndex].size / 2,
            };
            const diff = {
                x: targetPos.x - item.pos.x,
                y: targetPos.y - item.pos.y,
            };
            const dist = Math.sqrt(diff.x ** 2 + diff.y ** 2);
            item.catVel.x = diff.x / dist;
            item.catVel.y = diff.y / dist;
        };

        const setupAttack = (item) => {
            const delta = {
                x: satellites[item.targetIndex].pos.x - item.pos.x,
                y: satellites[item.targetIndex].pos.y - item.pos.y,
            };
            const dist = Math.sqrt(delta.x ** 2 + delta.y ** 2);
            item.vel.x = delta.x / dist;
            item.vel.y = delta.y / dist;
        };

        const setupEscape = (item) => {
            const delta = {
                x: item.pos.x - satellites[item.targetIndex].pos.x,
                y: item.pos.y - satellites[item.targetIndex].pos.y,
            };
            const dist = Math.sqrt(delta.x ** 2 + delta.y ** 2);
            item.vel.x = delta.x / dist;
            item.vel.y = delta.y / dist;
        };

        const manageCat = () => {
            satellites.forEach((element) => {
                element.imgRect.x += 300;
                if (element.imgRect.x >= element.imgRect.max_width)
                    element.imgRect.x = 0;
            });
        };

        const setupVelocity = (item) => {
            const delta = {
                x: item.target.x - item.pos.x,
                y: item.target.y - item.pos.y,
            };
            const dist = Math.sqrt(delta.x ** 2 + delta.y ** 2);
            if (dist > 1.5) {
                item.vel.x = delta.x / dist;
                item.vel.y = delta.y / dist;
            } else {
                item.vel.x = 0;
                item.vel.y = 0;
                item.target.x = item.start.x;
                item.target.y = item.start.y;
                item.start.x = item.pos.x;
                item.start.y = item.pos.y;
            }
        };

        const manageCollisionSmooth = (item, index) => {
            for (let j = 0; j < satellites.length; j++) {
                if (index == j) continue;
                const diff = {
                    x: item.pos.x - satellites[j].pos.x,
                    y: item.pos.y - satellites[j].pos.y,
                };
                const dist = Math.sqrt(diff.x ** 2 + diff.y ** 2);
                const radius = item.size * 1.5 + satellites[j].size * 1.5;
                if (dist < radius) {
                    item.vel.x = (diff.x / dist) * 2.5;
                    item.vel.y = (diff.y / dist) * 2.5;
                    if (
                        item.faction != satellites[j].faction &&
                        item.speed != satellites[j].speed
                    ) {
                        if (timeOutID && item.vel.target != j) {
                            clearTimeout(timeOutID);
                            timeOutID = null;
                        }
                        item.targetIndex = j;
                        satellites[j].targetIndex = index;
                        if (item.speed > satellites[j].speed) {
                            item.state = 3;
                            satellites[j].state = 2;
                        } else {
                            item.state = 2;
                            satellites[j].state = 3;
                        }
                        if (!item.catState && item.state == 2) {
                            setupProjectile(item);
                            intervalID = setInterval(() => {
                                setupProjectile(item);
                            }, 1000);
                        }
                        timeOutID = setTimeout(() => {
                            item.state = 1;
                            satellites[j].state = 1;
                            item.catState = 0;
                            if (intervalID) {
                                clearInterval(intervalID);
                                intervalID = null;
                            }
                        }, 5000);
                    }
                }
                item.vel.x *= item.speed / 5;
                item.vel.y *= item.speed / 5;
            }
        };
        setInterval(manageCat, 50);
        const CanvasLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            satellites.forEach((element, index) => {
                if (element.state == 1) setupVelocity(element);
                if (element.state == 2) setupAttack(element);
                if (element.state == 3) setupEscape(element);
                manageCollisionSmooth(element, index);
                element.pos.x += element.vel.x;
                element.pos.y += element.vel.y;
                if (element.pos.x < 0) element.pos.x = 0;
                if (element.pos.y < 0) element.pos.y = 0;
                if (element.pos.x > 1920) element.pos.x = 1920;
                if (element.pos.y > 1080) element.pos.y = 1080;

                ctx.fillStyle = "white";
                ctx.font = "15px Arial";
                ctx.fillText(
                    element.name,
                    element.pos.x * (window.innerWidth / 1920),
                    element.pos.y * (window.innerHeight / 1080) +
                        element.size +
                        5
                );
                ctx.drawImage(
                    element.img,
                    (element.pos.x - element.size / 2) *
                        (window.innerWidth / 1920),
                    (element.pos.y - element.size / 2) *
                        (window.innerHeight / 1080),
                    element.size,
                    element.size
                );
                if (element.catState) {
                    element.catPos.x += element.catVel.x * 30;
                    element.catPos.y += element.catVel.y * 30;
                    ctx.drawImage(
                        element.catImg,
                        element.imgRect.x,
                        element.imgRect.y,
                        element.imgRect.width,
                        element.imgRect.height,
                        element.catPos.x * (window.innerWidth / 1920),
                        element.catPos.y * (window.innerHeight / 1080),
                        element.imgRect.width * 0.3,
                        element.imgRect.height * 0.3
                    );
                }
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
