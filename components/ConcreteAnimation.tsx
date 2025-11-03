import React, { useRef, useEffect } from 'react';

const ConcreteAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let fillHeight = 0;

        interface AnimatedPatent {
            x: number;
            y: number;
            width: number;
            height: number;
            speed: number;
            stuck: boolean;
            rotation: number;
        }

        const patents: AnimatedPatent[] = [];
        const NUM_PATENTS = 8;

        const resetPatent = (patent: AnimatedPatent, canvasHeight: number, canvasWidth: number) => {
            patent.y = -patent.height - Math.random() * canvasHeight;
            patent.x = Math.random() * (canvasWidth - patent.width);
            patent.stuck = false;
            patent.speed = 1 + Math.random() * 1.5;
        };
        
        const initPatents = (canvasWidth: number, canvasHeight: number) => {
            patents.length = 0;
            for (let i = 0; i < NUM_PATENTS; i++) {
                patents.push({
                    x: Math.random() * canvasWidth,
                    y: -Math.random() * canvasHeight,
                    width: 30,
                    height: 40,
                    speed: 1 + Math.random() * 1.5,
                    stuck: false,
                    rotation: (Math.random() - 0.5) * 0.4
                });
            }
        };

        const drawPatent = (ctx: CanvasRenderingContext2D, p: AnimatedPatent) => {
            ctx.save();
            ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
            ctx.rotate(p.rotation);
            ctx.translate(-(p.x + p.width / 2), -(p.y + p.height / 2));

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#a0aec0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.width, p.height);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const lineY = p.y + 12 + i * 7;
                ctx.beginPath();
                ctx.moveTo(p.x + 6, lineY);
                ctx.lineTo(p.x + p.width - 6, lineY);
                ctx.stroke();
            }
            ctx.restore();
        };

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                fillHeight = 0;
                initPatents(canvas.width, canvas.height);
            }
        };

        const drawTruck = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);

            // Wheels
            ctx.fillStyle = '#2d3748';
            ctx.beginPath();
            ctx.arc(50, -25, 25, 0, Math.PI * 2);
            ctx.arc(190, -25, 25, 0, Math.PI * 2);
            ctx.fill();

            // Inner wheels
            ctx.fillStyle = '#a0aec0';
            ctx.beginPath();
            ctx.arc(50, -25, 10, 0, Math.PI * 2);
            ctx.arc(190, -25, 10, 0, Math.PI * 2);
            ctx.fill();

            // Chassis
            ctx.fillStyle = '#718096';
            ctx.fillRect(10, -50, 220, 20);

            // Cab
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(160, -50);
            ctx.lineTo(160, -120);
            ctx.lineTo(220, -120);
            ctx.lineTo(235, -50);
            ctx.closePath();
            ctx.fill();
            
            // Window
            ctx.fillStyle = '#4a5568';
            ctx.beginPath();
            ctx.moveTo(170, -110);
            ctx.lineTo(210, -110);
            ctx.lineTo(218, -60);
            ctx.lineTo(170, -60);
            ctx.closePath();
            ctx.fill();

            // Mixer Drum
            const drumGradient = ctx.createLinearGradient(50, -150, 150, -50);
            drumGradient.addColorStop(0, '#f6ad55');
            drumGradient.addColorStop(1, '#dd6b20');
            ctx.fillStyle = drumGradient;
            ctx.beginPath();
            ctx.ellipse(95, -110, 60, 50, -Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw concrete
            ctx.fillStyle = '#d1d5db';
            ctx.fillRect(0, canvas.height - fillHeight, canvas.width, fillHeight);

            // 2. Update and draw patents
            patents.forEach(p => {
                if (!p.stuck) {
                    p.y += p.speed;
                    const concreteSurface = canvas.height - fillHeight;
                    if (p.y + p.height > concreteSurface) {
                        p.stuck = true;
                        p.y = concreteSurface - p.height;
                    }
                }

                if (p.y > canvas.height) {
                    resetPatent(p, canvas.height, canvas.width);
                }
                
                drawPatent(ctx, p);
            });

            // 3. Draw truck
            const scale = canvas.width / 400;
            const truckBaseY = canvas.height - 5;
            const truckX = (canvas.width - 250 * scale) / 2;
            drawTruck(ctx, truckX, truckBaseY, scale);

            // 4. Update concrete level
            fillHeight += 0.3;
            if (fillHeight > canvas.height + 200) {
                fillHeight = 0;
                // Reset stuck patents so they fall again
                patents.forEach(p => {
                    if (p.stuck) resetPatent(p, canvas.height, canvas.width)
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="p-4 bg-white h-full w-full">
            <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
        </div>
    );
};

export default ConcreteAnimation;