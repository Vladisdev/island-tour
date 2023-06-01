'use strict';
$(document).ready(function () {

    new WOW().init();

//header menu
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };

    document.getElementById('menu').onclick = function (e) {
        if (e.target.classList.contains('menu__close')
            || e.target.classList.contains('menu__close--img')
            || e.target.classList.contains('nav__link')
            || e.target.classList.contains('nav')
        ) {
            document.getElementById('menu').classList.remove('open');
        }
    };

//блок feature
    let featureButtons = document.querySelectorAll('.feature__circle');

    function checkButton(e) {
        for (let i = 0; i < featureButtons.length; i++) {
            featureButtons[i].classList.contains('active');
            featureButtons[i].classList.remove('active');
            e.target.classList.add('active');
        }
    }

    $('.feature__circle:first-child').click(function (e) {
        $('.feature__about').hide();
        $('.feature__about:nth-child(2)').show();
        checkButton(e);
    })

    $('.feature__circle:nth-child(2)').click(function (e) {
        $('.feature__about').hide();
        $('.feature__about:nth-child(3)').show();
        checkButton(e);
    })

    $('.feature__circle:nth-child(3)').click(function (e) {
        $('.feature__about').hide();
        $('.feature__about:nth-child(4)').show();
        checkButton(e);
    })

    $('.feature__circle:nth-child(4)').click(function (e) {
        $('.feature__about').hide();
        $('.feature__about:nth-child(5)').show();
        checkButton(e);
    })

    $('.feature__circle:last-child').click(function (e) {
        $('.feature__about').hide();
        $('.feature__about:last-child').show();
        checkButton(e);
    })

    $('.program__info').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        initialSlide: 2
    });

    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 400
        }
    });

    $('.feedback__info').slick({
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });

    $('.gallery__block').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        initialSlide: 1,
    });

    if (window.innerWidth <= 1138) {
        setTimeout(() => {
            $('.gallery__container').css('display', 'flex')
            $('.gallery__container').css('align-items', 'center')
            $('.gallery__container').css('justify-content', 'center')
            $('.gallery__container').css('flex-direction', 'column')
        }, 100)
    }

    //video
    $('#video-play').click(function () {
        $('#video').css('background', 'rgb(44, 44, 44)');
        $('#video').css('z-index', '-10');
        $('.iframe__wrapper').css('z-index', '10');
        $('#video-play').hide();
        $('.video').css('background-color', 'rgb(44, 44, 44)');
    })

    $("#telephone").mask("+375 (99) 99-99-999");

    //форма order
    let loader = $('.loader');

    $('#submit').click(function () {

        let name = $('#name');
        let phone = $('#telephone');
        let hasError = false;

        $('.error__button').hide();
        $('.error__input').hide();
        name.css('border-color', 'rgb(255, 255, 255)');
        phone.css('border-color', 'rgb(255, 255, 255)');

        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'rgb(255, 0, 0)');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'rgb(255, 0, 0)');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.order__header').hide();
                        $('.form').hide();
                        $('.modal__wrapper').css('display', 'flex');
                        $('.order__success').show();
                        $('.order').css("background-color", "rgba(0, 0, 0, 0.53)");
                        name.val('');
                        phone.val('');
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.");
                    }
                    console.log(msg);
                });
        }
        return false;
    })

// нажатие на крестик
    function closeModal() {
        document.getElementById('success').style.display = "none";
        document.querySelector('.modal__wrapper').style.display = "none";
        document.querySelector('.order__header').style.display = "block";
        document.querySelector('.form').style.display = "block";
    }

    document.querySelector('.success__close').onclick = function () {
        closeModal();
    };

    document.querySelector('.success__btn').onclick = function () {
        closeModal();
    }
});