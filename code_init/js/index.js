  // ITERATION 1
// En esta función se extraen los datos que serán de utilidad para calcular el total por cada producto e imprimirlo
function updateSubtotal(product) {

  console.log('Calculating subtotal, yey!');
  const price = product.querySelector(`.pu span`).innerHTML;
  
  const quantity = product.querySelector(`.qty input`).value;
  console.log(quantity);
  
  const subtotal = product.querySelector(`.subtot span`)
  
  const total = parseFloat(price).toFixed(2) * parseFloat(quantity)
  
  subtotal.innerHTML = total;
  console.log(total)

  return total
  }
  
    // ITERATION 2
  // Esta función recorre el arreglo donde se encuentran los productos y por cada uno manda a llamar a la función updateSubtotal
  // de la cual recibe el total de cada producto y lo acumula en una variable. Imprime, además, el total de compra por todos los productos
  function calculateAll(product) {
    //const elementProduct = document.getElementsByClassName(`product`);  // Comentado

    //console.log(elementProduct)

    let totalTotal = 0;

  //    for (const elem of elementProduct){
  //      console.log(elem)
  //      totalTotal = totalTotal + updateSubtotal(elem) 
  //  } 
  //  for(let i = 0 ; i<= elementProduct.length ; i++){

  //    totalTotal = totalTotal + updateSubtotal(elementProduct[i])
  // }
   const products = document.querySelectorAll('.product');

   products.forEach(function(product) {
     totalTotal += updateSubtotal(product);
 });

    // ITERATION 3

    let total_i = document.getElementById("impresion-total"); // Agregado

    //let grandTotal = document.querySelector(`#total-value span`).innerHTML; // Comentado
    
    //const collection = document.querySelectorAll(`.product`);
  
    //let totalArr = Array.from(collection)
  
    //totalArr = totalArr.reduce(function (acc,product) { 
    //  return acc += updateSubtotal(product)}, 0);
    //console.log(totalArr);

    //grandTotal = Number(totalArr).toFixed(2); // Comentado

    total_i.textContent = totalTotal; // Agregado

    return totalTotal;
    }
  
  // ITERATION 4
  // Esta función se encarga de eliminar productos, mediante la eliminación de nodo. Vuelve a calcular los precios
  // después de eliminar el producto
  function removeProduct(event) {

    const target = event.currentTarget;
    console.log('The target in remove is:', target.parentNode.parentNode);       
    
    target.parentNode.parentNode.remove();
    calculateAll();
  }
  
  // ITERATION 5
  // Esta función se encarga de la creación de un nuevo producto, que es añadido mediante input. Se le otorgan las mismas
  // propiedades que a los productos ingresados por el programa y se añade como hijo del nodo que engloba la tabla
  function createProduct() {
    const mainProductsTable = document.querySelector(`tbody`);
    const newProductName = document.querySelector(`input[placeholder= "Product Name"]`);
    const newProductPrice = document.querySelector(`input[placeholder="Product Price"]`);
  
    //console.log({mainProductsTable, newProductName, newProductPrice});
  
    const newProductItem = document.createElement(`tr`);
    newProductItem.innerHTML = `
    <tr class="product">
            <td class="name">
              <span>${newProductName.value}</span>
            </td>
            <td class="pu">$<span>${newProductPrice.value}</span></td>
            <td class="qty">
              <input type="number" value="0" min="0" placeholder="Quantity" />
            </td>
            <td class="subtot">$<span>0</span></td>
            <td class="rm">
              <button class="btn btn-delete">Delete</button>
            </td>
          </tr>
    `;

    newProductItem.classList.add('product');
    mainProductsTable.appendChild(newProductItem);
  
    newProductItem.querySelector(`.btn-delete`).addEventListener(`click`, removeProduct);  // Cambio btn-remove -> btn-delete. Nombre de clase erróneo. 
  }
  
  // C U E R P O   P R I N C I P A L
  // A los botontes se les añade un evento, a cada uno le corresponde alguna función. 
  window.addEventListener('load', () => {

    const calculatePricesBtn = document.getElementById('calc');
    
    calculatePricesBtn.addEventListener('click', calculateAll);
  
    let removeButton = document.querySelectorAll(`.btn-delete`);  // Cambio de const -> let
    console.log(removeButton);
    
    removeButton.forEach(button => { 
      button.addEventListener(`click`, removeProduct)
    });
  
    const createButton = document.getElementById(`create`);
    createButton.addEventListener(`click`, createProduct);
  });