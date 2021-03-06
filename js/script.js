window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2020-11-21';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    //Form
    let loading = {
        message: 'Загрузка...',
        success: 'Спасибо!Скоро мы с Вами свяжемся!',
        failure: 'Что то пошло не так'
    };

    let form = document.querySelector(".main-form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

        statusMessage.classList.add("status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", 'server.php');
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener("readystatechange", function() {
            if(request.readyState < 4) {
                statusMessage.innerHTML = loading.message;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = loading.success;
            } else {
                statusMessage.innerHTML = loading.failure;
            }
        });

        for(let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    });

    //Contact Form

    let formContact = document.getElementById("form");

    formContact.addEventListener("submit", function() {
        event.preventDefault();
        formContact.appendChild(statusMessage);

        let req = new XMLHttpRequest();
        req.open("POST", 'server.php');
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let data = new FormData(formContact);
        req.send(data);

        req.addEventListener("readystatechange", function() {
            if(req.readyState < 4) {
                statusMessage.innerHTML = loading.message;
            } else if (req.readyState === 4 && req.status == 200) {
                statusMessage.innerHTML = loading.success;
            } else {
                statusMessage.innerHTML = loading.failure;
            }
        });

        for(let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    });

    //slider

    let slideIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");


    showSlide(slideIndex);
    function showSlide(n) {
        if(n > slides.length) {
            slideIndex = 1;
        } else if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display='none');
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlide(slideIndex += n);
    }

    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    prev.addEventListener("click", function() {
        plusSlides(-1);
    });
    next.addEventListener("click", function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", function(event) {
        let target = event.target;

        for (let i = 0; i < dots.length + 1; i++) {
            if(target.classList.contains("dot") && target == dots[i-1] ) {
                currentSlide(i);
            }
        }
    });

    //calculator 

    let inputs = document.querySelectorAll(".counter-block-input"),
        persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML =  0;

    persons.addEventListener("change", function() {
        personsSum = this.value;
        total = (daysSum + personsSum) * 4000;

        if(restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener("change", function() {
        daysSum = this.value;
        total = (daysSum + personsSum) * 4000;

        if(persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener("change", function() {
        if(restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        }
        else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});

