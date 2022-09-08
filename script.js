let modalQT = 1;
let cart = [];
let modalKey = 0;

const c = (el) => document.querySelector(el);//return item
const cs = (el) => document.querySelectorAll(el);//return array

//List Products//
pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);//trazendo a div(html) (takind tht (div in html))
    //add information in -pizzaitem-

    pizzaItem.setAttribute('data-key', index);//Add data-key (div-pizza--are)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//Add (to.price(2) case R$)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');//select atribute key in (pizza-itme)
        modalQT = 1;
        modalKey = key;

        console.log(pizzaJson[key]);
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {//select size product
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQT;

        c('.pizzaWindowArea').style.opacity = 0;//add animation tansition
        c('.pizzaWindowArea').style.display = 'flex';//add modal
        setTimeout(() => { c('.pizzaWindowArea').style.opacity = 1; }, 225)//add animation tansition
    })//aad event tag (a)

    c('.pizza-area').append(pizzaItem);//add pizzas
});

//Events Modal
function closeModal() {

    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => { c('.pizzaWindowArea').style.display = 'none'; }, 225);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => { item.addEventListener('click', closeModal); });
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQT > 1) {
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
});
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//check out

c(".pizzaInfo--addButton").addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log('Tamanho:' + size);
    let indentifire = pizzaJson[modalKey].id + '@' + size; //id size item
    let key = cart.findIndex((item) => item.indentifire == indentifire);
    if (key > -1) {
        cart[key].qt += modalQT;
    } else {
        cart.push({//select product
            indentifire,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQT
        })
    }
    updateCart();
    closeModal();
})

//cart - mobile actions
c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '0';
    }
})
c('.menu-closer').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '100vw';
    }

});

//cart - price
function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'Pequena';
                    break;
                case 1:
                    pizzaSizeName = 'Média';
                    break;
                case 2:
                    pizzaSizeName = 'Grande';
                    break;

            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });
            c('.cart').append(cartItem);

        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }

}