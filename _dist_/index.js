const API = "https://platzi-avo.vercel.app/api/avo";
const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.getElementById('container');
appNode.addEventListener('click', (event) => {

    if (event.target.nodeName === 'H2') {

        window.alert("Hola");
        
    }
    
}); 

const formatPrice = (price) => {

    const newPrice = new window.Intl.NumberFormat('en-EN', {

        style: 'currency',
        currency: 'USD'

    }).format(price);
    
    return newPrice;

}

async function fetchData(urlApi){

    const response = await fetch(urlApi); //Conectarnos al servidor
    let data = await response.json(); //procesar la respuesta y convertirla en json
    return data

}

// JSON -> Data -> Renderizar info en browser

let allItems = []; 

fetchData(API)
    .then(items =>{

        items.data.forEach(item => {

            const img = document.createElement('img');
            img.src = baseUrl+`${item.image}`;
            img.className =
      "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            const title = document.createElement('h2');
            title.textContent = `${item.name}`;
            //title.style.fontSize = "3rem";
            //title.style = "font-size: 2rem;";
            title.className = "text-lg";

            const price = document.createElement("div");
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);

            const priceANdTitle = document.createElement("div");
            priceANdTitle.className = "text-center md:text-left";
            priceANdTitle.appendChild(title);
            priceANdTitle.appendChild(price);
            
            const container = document.createElement("div");
            container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            container.appendChild(img);
            container.appendChild(priceANdTitle);
            allItems.push(container);
            
        });

        appNode.append(...allItems);

    });