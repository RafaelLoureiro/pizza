let modalQT = 1;

const c = (el) => document.querySelector(el);//return item
const cs = (el) => document.querySelectorAll(el);//return array

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

        c('pizzaInfo--qt').innerHTML = modalQT;

        c('.pizzaWindowArea').style.opacity = 0;//add animation tansition
        c('.pizzaWindowArea').style.display = 'flex';//add modal
        setTimeout(() => { c('.pizzaWindowArea').style.opacity = 1; }, 225)//add animation tansition
    })//aad event tag (a)

    c('.pizza-area').append(pizzaItem);//add pizzas
});