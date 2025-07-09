// 人玉をカーソルにするJS

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('blueFireCanvas');
    const ctx = canvas.getContext('2d');
    let particles = []; // Canvasパーティクル用の配列

    // Canvasの設定
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // 初期ロード時にもCanvasサイズを設定

    // --- DOM要素を使ったカスタムカーソルと残像エフェクトの初期設定 ---
    const customCursor = document.getElementById('custom-cursor');
    const body = document.body;
    const trailLength = 10; // 残像の数
    const trailElements = []; // DOM要素自体を格納する配列

    // 残像要素を初期化してDOMに追加
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.opacity = '0'; // 最初は透明
        body.appendChild(trail);
        trailElements.push(trail);
    }

    // --- マウスイベントリスナーを一つにまとめる ---
    document.addEventListener('mousemove', (e) => {
        // --- 1. カスタムカーソルの位置更新 ---
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;

        // --- 2. 残像（DOM要素）の位置と透明度更新 ---
        // 既存の残像要素を一つずつ後ろにずらす
        for (let i = trailLength - 1; i > 0; i--) {
            const prevElement = trailElements[i - 1];
            const currentElement = trailElements[i];
            currentElement.style.left = prevElement.style.left;
            currentElement.style.top = prevElement.style.top;
            currentElement.style.opacity = prevElement.style.opacity;
            currentElement.style.transform = prevElement.style.transform;
        }

        // 最も新しい残像（配列の先頭）を現在のマウス位置に設定
        const firstTrail = trailElements[0];
        firstTrail.style.left = `${e.clientX}px`;
        firstTrail.style.top = `${e.clientY}px`;
        firstTrail.style.opacity = `0.5`; // 初期透明度
        firstTrail.style.transform = `translate(-50%, -50%) scale(1)`; // 初期スケール

        // 各残像の透明度とスケールをインデックスに基づいて調整
        trailElements.forEach((element, index) => {
            const opacity = 0.6 * (1 - index / trailLength);
            const scale = 1 - 0.05 * index;
            element.style.opacity = `${opacity}`;
            element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });

        // --- 3. Canvasパーティクル生成 ---
        for (let i = 0; i < 4; i++) { // マウス移動ごとに6個のパーティクルを生成
            particles.push({
                baseX: e.clientX,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 10 + 8,
                speedY: Math.random() * -1.2 - 0.3,
                alpha: 1,
                life: 0,
                swing: Math.random() * 3 + 1,
                frequency: Math.random() * 0.1 + 0.03,
                rotation: Math.random() * Math.PI * 2,
                color: `hsl(${Math.random() * 10 + 200}, 100%, ${Math.random() * 20 + 60}%)`
            });
        }
    });

    // --- Canvasパーティクルアニメーションループ ---
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvasをクリア

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.life += 1;
            p.x = p.baseX + Math.sin(p.life * p.frequency) * p.swing;
            p.y += p.speedY;
            p.alpha -= 0.01;
            p.size *= 0.98;

            if (p.alpha <= 0.02 || p.size <= 0.5) {
                particles.splice(i, 1);
                i--;
                continue;
            }

            ctx.save();
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 25;

            ctx.translate(p.x, p.y);
            ctx.rotate(Math.sin(p.life * 0.1) * 0.5);

            // 放射状グラデーションの作成
            const gradient = ctx.createRadialGradient(
                0,
                p.size * 0.35,
                p.size * 0.1,
                0,
                p.size * 0.35,
                p.size * 0.6
            );

            const [h, s, l] = p.color.match(/\d+/g).map(Number);
            gradient.addColorStop(0, `hsl(${h}, ${s}%, 98%)`);
            gradient.addColorStop(0.3, `hsl(${h}, ${s}%, ${l + 10}%)`);
            gradient.addColorStop(0.7, `hsl(${h}, ${s}%, ${l}%)`);
            gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l * 0.5}%, 0)`);

            ctx.fillStyle = gradient;

            // 人魂の本体部分
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.ellipse(0, p.size * -0.2, p.size * 0.2, p.size * 1.0, 0, 0, Math.PI * 2);
            ctx.fill();

            // 下部の揺らぎや炎の尾の部分
            ctx.globalAlpha = p.alpha * 0.3;
            ctx.beginPath();
            ctx.ellipse(0, p.size * 0.25, p.size * 0.15, p.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    animate(); // アニメーションを開始
});