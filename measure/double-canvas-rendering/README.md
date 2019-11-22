# Measure double-canvas-rendering

The performance test was about using a using drawRect on a buffer canvas, before
drawing it to the screen, rather than using drawRect directly on the front canvas.

The result was that using a buffer canvas made the whole operation less than
half as fast. Just buffering the operation does not provide any performance advantage.

(Window 1520x970)

Performance test drawing one rectangle per pixel

Direct drawing
100x100 -> 0.56ms / drawing
10x10 -> 26ms / drawing
1x1 -> 3300ms / drawing

Buffered drawing
100x100 -> 1.8ms / drawing
10x10 -> 80ms / drawing
1x1 -> 8300ms / drawing
