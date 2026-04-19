import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let theta = 0.2;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let rafId: number;

    const globe = createGlobe(canvas, {
      width: 600,
      height: 600,
      devicePixelRatio: 2,
      mapSamples: 16000,
      phi,
      theta,
      mapBrightness: 1,
      dark: 0,
      diffuse: 0.2,
      baseColor: [1, 1, 1],
      glowColor: [0.8, 0.8, 0.8],
      markerColor: [0, 0, 0],
      markers: [],
    });

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      lastX = e.clientX;
      lastY = e.clientY;

      phi += deltaX * 0.002;
      theta += deltaY * 0.002;
      theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta));

      globe.update({ phi, theta });
    }

    function onPointerUp() {
      isDragging = false;
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    function animate() {
      if (!isDragging) {
        phi += 0.002;
        globe.update({ phi, theta });
      }
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();

      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div className='max-w-150'>
      <canvas
        ref={canvasRef}
        className='w-full cursor-grab active:cursor-grabbing'
      />
    </div>
  );
}
