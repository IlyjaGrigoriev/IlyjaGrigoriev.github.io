// это корзина

const products = document.querySelectorAll('.product');
const cartItems = document.getElementById('cart-items');
let total = 0;



products.forEach(product => {
    product.addEventListener('click', () => {
        const name = product.getAttribute('data-name');
        const price = +product.dataset.price;
        const item = document.createElement('li');
        item.innerHTML = `<span>${name} - ${price} руб.</span>`;

        const removeButton = document.createElement('button');
        removeButton.textContent = '❌';
        removeButton.addEventListener('click', () => {
            total -= price;
            document.getElementById('total').textContent = `Итого: ${total} руб.`;
            item.remove();
            localStorage.setItem('cash', total);
        });

        item.append(removeButton);
        cartItems.append(item);
        total += price;
        document.getElementById('total').textContent = `Итого: ${total} руб.`;
        localStorage.setItem('cash', total);
    });
});

/// Перенос из памяти в страницу заказа

// "голый тотал" - вызывал ошибку

// document.addEventListener('DOMContentLoaded', () => {
//     const total = localStorage.getItem('cash');
//     if (total) {
//         document.getElementById('total').textContent = 'Сумма покупки: ' + total + ' руб.';
//     }
// });

// этот проверяет не только наличие значения total в localStorage, но и наличие элемента с идентификатором total на странице
document.addEventListener('DOMContentLoaded', () => {
    const total = localStorage.getItem('cash');
    if (total) {
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = 'Сумма покупки: ' + total + ' руб.';
        }
    }
}); 


/// валидация номера

function checkForm() {

    let nameForm = document.getElementById("name").value;
    let t1 = /^[A-Z][a-z]*(-[A-Z][a-z]*)*$/;
    let t2 = /^[А-ЯЁ][а-яё]*(-[А-ЯЁ][а-яё]*)*$/;
    if (!t1.test(nameForm) && !t2.test(nameForm)) {
        alert("Имя введено неверно");
        return false;
    }

    let eMail = document.getElementById("email").value;
    let eM = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!eM.test(eMail)) {
        alert("адрес электронной почты неверен");
        return false;
    }
    let phone = document.getElementById("phone").value;
    if (! /^\+?\d{6,12}$/.test(phone)) {
        alert("телефонный номер введен неверно");
        return false;
    }
    return nameForm; // возвращаем значение имени пользователя для alert

}


///очистка корзины методом отправки

let sbros = document.getElementById('clearP');

if (sbros) { //обертка проверяет есть ли конпка на странице иначе ступор
    sbros.addEventListener('click', function () {
        localStorage.clear();
        let userName1 = checkForm();
        alert(userName1 + ", ваш заказ принят в обработку!");
    }); // не подхватывает имя в алерт(
}

// sbros.addEventListener('click', function(){
//     localStorage.clear();
// }); работало только на родительской странице


// мобильная адаптация

let burger = document.querySelector('.burger');
let side = document.querySelector('.side');
let lines = document.querySelectorAll('.burger__line');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    side.classList.toggle('active');

});


// игра

let bulletX = 150;
let onFly = false;
let n = 0;

function moveBullet() {
    if (n < 3) {
        if (onFly) {
            bulletX += 10;
            if (bulletX > (380 + ((n - 1) * 30))) {
                document.querySelector('.bullet').classList.remove('bullet')
                onFly = false;
                bulletX = 150;
                if (n < 2) {
                    let newBullet = document.createElement('div');
                    newBullet.classList.add('stoping');
                    newBullet.classList.add('bullet');

                    let img = document.createElement('img');
                    img.src = 'images/shampur2.png';
                    img.alt = 'шампур';

                    newBullet.append(img)
                    newBullet.style.position = 'absolute';
                    newBullet.style.top = '170px';
                    newBullet.style.width = '17%';
                    newBullet.style.left = '150px';
                    document.querySelector('.game').append(newBullet);
                    
                }
                n++;

            } else {
                setTimeout(moveBullet, 40);

            }

            document.querySelector('.bullet').style.left = bulletX + "px";
        }
    } else {

        alert("Отличная работа! 👌")
        document.querySelector('.fire').style.position = 'absolute'
        const audio = new Audio(src = 'mp3/raging-fire.mp3');
        // audio.loop = true;
        audio.play();
    }
}
function keyHandler(e) {
    console.log(e);
    if (e.code == "Space" && !onFly) {
        onFly = true;
        moveBullet();
    }
    // if (e.code == "Escape" && !onFly) {
    //     onFly = false;
    //     bulletX = 150; 
    //     document.querySelector('.stoping').style.left = bulletX + "px";
    // }
}