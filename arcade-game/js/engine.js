var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        context = canvas.getContext('2d'),
        startTime,
        lastTime;

    var playedTime = 0;
  
    canvas.width = 909;
    canvas.height = 850;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        var msPlayedTime = 0;
        update(dt);
        render(context);
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        startTime = Date.now();
        lastTime = Date.now();
        playedTime = 0;
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt,enemySpeed,player,gameLife);
        });
        player.update(gameLife);
        gem.update(gemPosX,posY,gemImages,player,gameScore,gameLife);
    }

    function render(ctx) {
        var rowImages = [
            'images/water-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/grass-block.png',
            'images/grass-block.png'
        ],
        numRows = 6,
        numCols = 9,
        row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        ctx.drawImage(Resources.get('images/background.png'), 0, 10);
        ctx.drawImage(Resources.get('images/background.png'), 0, 590);
        displayTime(ctx);
        renderEntities(ctx);
    }

    function displayTime(ctx) {
        ctx.textAlign = "left";
        ctx.font="30px Calibri";
        ctx.fillStyle ="#f67841";
        ctx.strokeStyle = "#67200a";
        ctx.lineWidth = 2;

        playedTime = Date.now() - startTime;
        msPlayedTime = parseInt(playedTime, 10);
        playedTime = msToTime(msPlayedTime);
        
        ctx.fillText("Time:",700, 40);
        ctx.strokeText("Time:",700, 40);
        ctx.fillText(playedTime, 780, 40);
        ctx.strokeText(playedTime, 780, 40);
    }

    function renderEntities(ctx) {
        allEnemies.forEach(function(enemy) {
            enemy.render(ctx);
        });
        player.render(ctx);
        gem.render(ctx);
        gameScore.render(ctx);
        gameLife.render(ctx);
    }

    function reset() {
        // noop
    }

    function msToTime(s) {

        function addZ(n) {
            return (n<10? '0':'') + n;
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s;

        return  addZ(mins) + ':' + addZ(secs) + '.' + Math.floor(ms/100.0);
    }

    Resources.load([
        'images/background.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Gem-Orange.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Purple.jpg',
        'images/Heart-small.png',
        'images/gameover.png'
    ]);
    Resources.onReady(init);

    global.context = context;
})(this);
