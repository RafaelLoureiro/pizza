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
        closeModal();
    }
})