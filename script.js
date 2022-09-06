const c = (el) => document.querySelector(el);//return item
const cs = (el) => document.querySelectorAll(el);//return array

pizzaJson.map((item, index) => {
    let pizzaitem = c('.models .pizza-item').cloneNode(true);//trazendo a div(html) (takind tht (div in html))
    //add information in -pizzaitem-

    c('.pizza-area').append(pizzaitem);//add pizzas
});