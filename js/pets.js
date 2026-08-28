(function () {
    var colors = ["#ff8fb8", "#e4c4ff", "#ffe08a", "#ffd3e2", "#ff6b9d"];
    var layer = document.querySelector(".petals");
    var hugScene = document.getElementById("hug-scene");
    var balloonLayer = document.getElementById("party-balloons");
    var chicken = document.getElementById("chicken");
    var goat = document.getElementById("goat");
    var i;
    var petal;

    var smallScreen = window.innerWidth < 700 || window.innerHeight < 700;
    var petalCount = smallScreen ? 8 : 18;

    if (layer) {
        for (i = 0; i < petalCount; i += 1) {
            petal = document.createElement("span");
            petal.className = "petal";
            petal.style.left = (Math.random() * 100) + "%";
            petal.style.background = colors[i % colors.length];
            petal.style.animationDuration = (7 + Math.random() * 7) + "s";
            petal.style.animationDelay = (-Math.random() * 8) + "s";
            petal.style.transform = "scale(" + (0.7 + Math.random() * 0.8) + ")";
            layer.appendChild(petal);
        }
    }

    function sendBalloons() {
        var balloonColors = ["#ff6b9d", "#ffd166", "#9b7ed9", "#7ec8e3"];
        var count = 3 + Math.floor(Math.random() * 2);
        var used = [];
        var balloon;
        var left;
        var n;

        if (!balloonLayer) {
            return;
        }

        for (n = 0; n < count; n += 1) {
            left = 8 + Math.random() * 84;
            if (used.some(function (spot) { return Math.abs(spot - left) < 10; })) {
                left = 8 + Math.random() * 84;
            }
            used.push(left);

            balloon = document.createElement("div");
            balloon.className = "party-balloon";
            balloon.style.left = left + "%";
            balloon.style.background = balloonColors[n % balloonColors.length];
            balloon.style.animationDuration = (5 + Math.random() * 2.2) + "s";
            balloon.style.animationDelay = (n * 0.18) + "s";
            balloon.innerHTML = '<span class="shine"></span>';
            balloonLayer.appendChild(balloon);

            balloon.addEventListener("animationend", function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            });
        }
    }

    function startBalloons() {
        sendBalloons();
        window.setInterval(sendBalloons, 3000);
    }

    function walkLane(el, options) {
        var x = options.x;
        var y = options.y;
        var dir = options.dir;
        var speed = options.speed;

        function face(movingLeft) {
            if (movingLeft) {
                el.classList.add("flip");
            } else {
                el.classList.remove("flip");
            }
        }

        function tick() {
            var width = el.offsetWidth || 70;
            var minX = 8;
            var maxX = Math.max(40, window.innerWidth - width - 8);

            x += dir * speed;

            if (x <= minX) {
                x = minX;
                dir = 1;
            } else if (x >= maxX) {
                x = maxX;
                dir = -1;
            }

            face(dir < 0);
            el.style.left = x + "px";
            el.style.bottom = y + "px";
            window.requestAnimationFrame(tick);
        }

        face(dir < 0);
        window.requestAnimationFrame(tick);
    }

    function releasePet(el) {
        var rect = el.getBoundingClientRect();
        var x = rect.left;
        var y = window.innerHeight - rect.bottom;

        document.body.appendChild(el);
        el.style.left = x + "px";
        el.style.bottom = y + "px";
        el.style.transform = "";
        el.classList.remove("flip");

        return { x: x, y: Math.max(10, y) };
    }

    function startWalking() {
        var row1 = smallScreen ? 10 : 14;
        var row2 = smallScreen ? 48 : 58;

        if (!chicken || !goat) {
            return;
        }

        releasePet(chicken);
        releasePet(goat);

        walkLane(chicken, {
            x: 12,
            y: row1,
            dir: 1,
            speed: smallScreen ? 0.7 : 0.9
        });

        walkLane(goat, {
            x: Math.max(12, window.innerWidth - (goat.offsetWidth || 70) - 12),
            y: row2,
            dir: -1,
            speed: smallScreen ? 0.55 : 0.72
        });
    }

    window.setTimeout(startBalloons, 3000);

    if (hugScene && chicken && goat) {
        window.setTimeout(function () {
            hugScene.classList.remove("hugging");
            hugScene.classList.add("releasing");

            window.setTimeout(function () {
                startWalking();
                hugScene.classList.remove("releasing");
                hugScene.classList.add("released");
            }, 700);
        }, 3600);
    }
}());
