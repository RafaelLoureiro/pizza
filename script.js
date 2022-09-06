const c = (el) => document.querySelector(el);//return item
const cs = (el) => document.querySelectorAll(el);//return array

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);//trazendo a div(html) (takind tht (div in html))
    //add information in -pizzaitem-
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//Add (to.price(2) case R$)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        c('.pizzaWindowArea').style.opacity = 0;//add animation tansition
        c('.pizzaWindowArea').style.display = 'flex';//add modal
        setTimeout(() => { c('.pizzaWindowArea').style.opacity = 1; }, 225)//add animation tansition
    })//aad event tag (a)

    c('.pizza-area').append(pizzaItem);//add pizzas
});