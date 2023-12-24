let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let mood = "create";
let tmp;

// get  price
function getPrice() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }
    else {
        total.innerHTML = '';
        total.style.background = "red";

    }
}
// get  create
let collectionProduct;
if (localStorage.Product != null) {
    collectionProduct = JSON.parse(localStorage.Product)
}
else {
    collectionProduct = [];

}

create.onclick = function () {
    getPrice();
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    //  count تكرار
    if (title.value != "" && price.value != "" && ads.value != "" && discount.value != "" && category.value != "" && taxes.value != "") {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    collectionProduct.push(newProduct);
                }
            }
            else {
                collectionProduct.push(newProduct);
            }
        }
        else {
            collectionProduct[tmp] = newProduct;
            mood = "create";
            count.style.display = "block";
        }
        clearInput();

    }


    create.innerHTML = "create";
    localStorage.setItem('Product', JSON.stringify(collectionProduct))
    showData();
}
// get  clear input 
function clearInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// get  Show data
function showData() {
    let table = ``;
    for (let i = 0; i < collectionProduct.length; i++) {
        table += `<tr>
        <td>${i}</td>
        <td>${collectionProduct[i].title}</td>
        <td>${collectionProduct[i].price}</td>
        <td>${collectionProduct[i].taxes}</td>
        <td>${collectionProduct[i].ads}</td>
        <td>${collectionProduct[i].discount}</td>
        <td>${collectionProduct[i].total}</td>
        <td>${collectionProduct[i].category}</td>
        <td><button id="update"  onclick="updateData(${i})"">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
       </tr>` ;

    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");

    if (collectionProduct.length > 0) {
        deleteAll.innerHTML = `<button  onclick ="deleteAllData()" > delete all</button>`;
    }
    else {
        deleteAll.innerHTML = "";
    }

}

// delete data
function deleteData(i) {
    collectionProduct.splice(i, 1);
    localStorage.Product = JSON.stringify(collectionProduct);
    showData();
}
// delete data All 
function deleteAllData() {
    localStorage.clear;
    collectionProduct.splice(0);
    showData();

}
// Update data

// Update data
function updateData(i) {
    title.value = collectionProduct[i].title;
    price.value = collectionProduct[i].price;
    taxes.value = collectionProduct[i].taxes;
    ads.value = collectionProduct[i].ads;
    discount.value = collectionProduct[i].discount;
    getPrice();
    count.style.display = "none"
    category.value = collectionProduct[i].category;
    create.innerHTML = "update Data ";
    mood = "updata";
    tmp = i;
    scroll({
        top: 0,
        scrollBehavior: 'smooth'



    });




}
// searchTitle

let searchMode = "title";
function getsearchMood(id) {
    let search = document.getElementById("search");
    if (id === "searchTitle") {
        searchMode = "title";
        search.placeholder = "search Title";
    }
    else {
        searchMode = "category";
        search.placeholder = "search category";
    }
    search.focus()
    search.value = '';
    showData();


}
// searchTitle
function getsearchData(value) {
    let table = '';
    for (let i = 0; i < collectionProduct.length; i++) {
        if (searchMode === "title") {
            if (collectionProduct[i].title.includes(value)) {
                table +=
                    `<tr>
                    <td>${i}</td>
                    <td>${collectionProduct[i].title}</td>
                    <td>${collectionProduct[i].price}</td>
                    <td>${collectionProduct[i].taxes}</td>
                    <td>${collectionProduct[i].ads}</td>
                    <td>${collectionProduct[i].discount}</td>
                    <td>${collectionProduct[i].total}</td>
                    <td>${collectionProduct[i].category}</td>
                    <td><button id="update"  onclick="updateData(${i})"">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>` ;
            }



        }
        else {

            if (collectionProduct[i].category.includes(value)) {
                table +=
                    `<tr>
                    <td>${i}</td>
                    <td>${collectionProduct[i].title}</td>
                    <td>${collectionProduct[i].price}</td>
                    <td>${collectionProduct[i].taxes}</td>
                    <td>${collectionProduct[i].ads}</td>
                    <td>${collectionProduct[i].discount}</td>
                    <td>${collectionProduct[i].total}</td>
                    <td>${collectionProduct[i].category}</td>
                    <td><button id="update"  onclick="updateData(${i})"">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>` ;
            }




        }
        document.getElementById("tbody").innerHTML = table;

    }
}
//call back 
showData();

