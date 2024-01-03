let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let extra_costs = document.getElementById('extra_costs');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'creat'
let tm;
// getTotal
function gettotal(){
    if(price.value != ' ' )
    {
        let result = (+price.value + +taxes.value ) ;//+ +extra_costs.value   -- - +discount.value
        total.innerHTML = result;
        total.style.background = 'rgb(231, 31, 31)';
    }
    else
    {
        total.innerHTML = '';
        total.style.background = 'rgb(213, 172, 172)';
    }
    }
 // create product
let datapro;
if(localStorage.product != null ){
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro = [];
}
submit.onclick = function()
    {
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        extra_costs:extra_costs.value,
        //discount:discount.value,
        total:total.innerHTML,
        //count:count.value,
        category:category.value,
    }
 
    if(mood === 'creat'){
        if(newpro.count > 1){
        for(let i = 0; i < newpro.count;i++){   datapro.push(newpro)}
    }else{
       datapro.push(newpro)
    }
    }else
    {datapro[   tm   ] = newpro;
        mood = 'creat';
        submit.innerHTML ='إنـشـاء'
        count.style.display = 'block';
    } 
    
   //save localstorage
    localStorage.setItem('product',     JSON.stringify(datapro)      ) 
    showdata()
    cleardata()
}
  
// clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    extra_costs.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    
    }
    // read
function showdata(){
    gettotal()
    let table = '';
    for(let i =0; i < datapro.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].extra_costs}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
    
        <td><button onclick="updateData(${i})" id="update">update</button></td> 
        <td><button  onclick="deletedata( ${i} )" id="Delete">Delete</button></td> 
    
    </tr> 
        `
        
    //datapro[i]
    }
    
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteALL()"> حذف الكل(${datapro.length}) </button>
        `
        }else{
            btnDelete.innerHTML = '';
        }
}
    showdata()
    // delete

function deletedata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro);
    showdata()
    }
    function deleteALL(){
        localStorage.clear()
        datapro.splice(0)
        showdata()
    }
    // update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    extra_costs.value = datapro[i].extra_costs;
    discount.value = datapro[i].discount;
    gettotal()
    count.style.display ='none';
    category.value = datapro[i].category;
    submit.innerHTML = 'تحديث';
    mood= 'update';
    tm = i;
scroll({top:0,
behavior:'smooth'
})
}
// search
let searchMood = 'title';
function getSearchMood(id)
{
 if(id == 'searchTitele')
 {
    searchMood = 'title';
 }else{
     
    searchMood = 'Category';
 }

}