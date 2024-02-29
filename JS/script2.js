function startCountdown() {

    const countdownInterval = setInterval(() => {

        const currentTime = new Date().getTime();

        const targetDate = new Date(new Date().getFullYear(), 2, 9, 0, 0, 0).getTime();

        const timeDiff = targetDate - currentTime;


        // const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);


        // const formattedMonth = months < 10 ? `0${months}` : months;
        const formattedDays = days < 10 ? `0${days}` : days;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        // document.getElementById("months").querySelector(".count-value").innerText = formattedMonth;
        document.getElementById("days").querySelector(".count-value").innerText = formattedDays;
        document.getElementById("hours").querySelector(".count-value").innerText = formattedHours;
        document.getElementById("minutes").querySelector(".count-value").innerText = formattedMinutes;
        document.getElementById("seconds").querySelector(".count-value").innerText = formattedSeconds;


        if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerText = "акция в честь 8го марта завершена";
        }
    }, 1000);
}
startCountdown();