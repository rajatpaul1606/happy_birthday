(function () {
    var stars = document.getElementById("stars");
    var intro = document.getElementById("midnight-intro");
    var countdown = document.getElementById("countdown");
    var countNum = document.getElementById("count-num");
    var veil = document.getElementById("veil");
    var html = "";
    var i;

    for (i = 0; i < 90; i += 1) {
        html += '<span class="star" style="' +
            "left:" + (Math.random() * 100) + "%;" +
            "top:" + (Math.random() * 72) + "%;" +
            "width:" + (Math.random() * 2.4 + 0.6) + "px;" +
            "height:" + (Math.random() * 2.4 + 0.6) + "px;" +
            "animation-delay:" + (Math.random() * 4) + "s;" +
            "animation-duration:" + (Math.random() * 2.4 + 1.8) + "s" +
            '"></span>';
    }
    stars.innerHTML = html;

    new Snowflakes({
        color: "#e8f4ff",
        minSize: window.innerWidth < 600 ? 8 : 10,
        maxSize: window.innerWidth < 600 ? 16 : 28,
        count: window.innerWidth < 600 ? 28 : 50
    });

    function birthdayUrl() {
        var params = new URLSearchParams(window.location.search);
        var name = params.get("name");
        var url = "birthday.html";
        if (name) {
            url += "?name=" + encodeURIComponent(name);
        }
        return url;
    }

    function pop(n) {
        countNum.classList.remove("pop");
        countNum.textContent = n;
        void countNum.offsetWidth;
        countNum.classList.add("pop");
    }

    function goToBirthday() {
        veil.classList.add("show");
        window.setTimeout(function () {
            window.location.href = birthdayUrl();
        }, 700);
    }

    window.setTimeout(function () {
        intro.classList.add("hide");
        countdown.classList.add("show");

        var numbers = [5, 4, 3, 2, 1];
        var index = 0;

        function next() {
            if (index >= numbers.length) {
                goToBirthday();
                return;
            }
            pop(numbers[index]);
            index += 1;
            window.setTimeout(next, 1000);
        }

        next();
    }, 3000);
}());
