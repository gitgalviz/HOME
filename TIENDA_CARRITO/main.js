let articulos = [
    {
        id: 1,
        img: './IMG/cupra.jpg',
        nombre: 'Cupra',
        km: 'KM: 0',
        precio: 120000000
    },
    {
        id: 2,
        img: './IMG/sportage.png',
        nombre: 'KIA sportage',
        km: 'KM: 0',
        precio: 112000000
    },
    {
        id: 3,
        img: './IMG/aveo.png',
        nombre: 'Aveo',
        km: 'KM: 0',
        precio: 87000000
    },
    {
        id: 4,
        img: './IMG/spark-life.png',
        nombre: 'Spark',
        km: 'KM: 0',
        precio: 70000000
    },
    {
        id: 5,
        img: './IMG/KIA RIO.avif',
        nombre: 'KIA RIO',
        km: 'KM: 0',
        precio: 145000000
    },
    {
        id: 6,
        img: './IMG/picanto.webp',
        nombre: 'KIA Picanto',
        km: 'KM: 0',
        precio: 45000000
    },
    {
        id: 7,
        img:'./IMG/Toyota_Hilux.png',
        nombre: 'Hilux',
        km: 'KM: 0',
        precio: 230000000
    },
    {
        id: 8,
        img: './IMG/COROLLA PLATEADO.png',
        nombre: 'Corolla',
        km: 'KM: 0',
        precio: 97000000
    },
    {
        id: 9,
        img: './IMG/LC-300-1200X800-Pixls-Julio-30-Blanco-Mate.png',
        nombre: 'LC 300',
        km: 'KM: 0',
        precio: 430000000
    },
    {
        id: 10,
        img: './IMG/fortuner-super-blanco-1.png',
        nombre: 'Fortuner',
        km: 'KM: 0',
        precio: 280000000
    },
    {
        id: 11,
        img: './IMG/MT09.png',
        nombre: 'MT 09 V2',
        km: 'KM: 0',
        precio: 55000000
    },
    {
        id: 12,
        img: './IMG/H2R.png',
        nombre: 'H2R',
        km: 'KM: 0',
        precio: 110000000
    }
];

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    pintarProductos();
});

function pintarProductos() {
    let contenedorProductos = document.getElementById('cards');

    articulos.forEach(producto => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <img class="img_card " src="${producto.img}" alt="">
            </div>
            <h3>${producto.nombre}</h3>
            <p>${producto.km}</p>
            <p>$${producto.precio.toLocaleString()}</p>
            <div class="boton_uno">
                <button class="boton_agregar">Agregar al carrito</button>
            </div>
        `;

        let botonAgregar = card.querySelector('.boton_agregar');
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        });

        contenedorProductos.appendChild(card);
    });
}


let totalCarrito = 0;

function agregarAlCarrito(id) {
    const productoSelec = articulos.find((producto) => producto.id === id);
    const productoCarrito = carrito.find((item) => item.producto.id === id);

    if (productoCarrito) {
        productoCarrito.cantidad++;
    } else {
        carrito.push({ producto: productoSelec, cantidad: 1 });
    }
    mostrarCarrito();
  
}


function mostrarCarrito() {
    const totalCarritoElement = document.getElementById('total-carrito');
    const carritoTabla = document.getElementById('carrito-tabla');
    const contenedorCarrito = document.getElementById('body1');

    carritoTabla.innerHTML = '';

    let totalCarrito = 0;

    carrito.forEach(item => {
        const producto = item.producto;
        const cantidad = item.cantidad;
        const subtotal = producto.precio * cantidad;

        totalCarrito += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="tg-objetos tit1"><img class="img_carrito tit1" src="${producto.img}" alt=""></td>
            <td class="tg-objetos">${producto.nombre}</td>
            <td class="tg-objetos">$${producto.precio.toLocaleString()}</td>
            <td class="tg-objetos">${cantidad}</td>
            <td class="tg-objetos">$${subtotal.toLocaleString()}</td>
            <td class="tg-objetos"><div class="cont_vaciar"><button onclick="eliminarProducto(${producto.id})">Eliminar</button></div></td>
        `;
        carritoTabla.appendChild(row);
    });

    totalCarritoElement.innerHTML = `Total del carrito: $${totalCarrito.toLocaleString()}`;


    if (carrito.length > 0) {
        contenedorCarrito.style.display = 'flex';  
    } else {
        contenedorCarrito.style.display = 'none';
    }

    console.log(carrito);
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito(); 
}

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.producto.id !== id);
    mostrarCarrito();
}

