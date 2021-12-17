const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const controller = {
    // Root - Show all products
    index: (req, res) => {
      res.render('products', { products });
    },

    detail: (req, res) => {
    // Aca necesitamos recibir un objeto de tipo producto
    // Primero buscamos el producto correspondiente
    const requiredId = req.params.id;

    const requiredProduct = products.find((prod) => {
      /* El primer elemento que devuelva true se guarda como resultado */
      const condition = prod.id == requiredId;
      return condition;
    });

    // Calculo el final price en el controlador para que la vista quede mas limpia
 
     res.render('productDetailIndividual', { products: requiredProduct});
    },

    edit: (req, res) => {
      // Solo falta autocompletar los inputs y el action y method del form
      const requiredId = req.params.id;
      const productToEdit = products.find((prod) => {
        /* El primer elemento que devuelva true se guarda como resultado */
        const condition = prod.id == requiredId;
        return condition;
      });
   
      res.render('editProduct', { productToEdit });
    },

    update: (req, res) => {
      // Leemos el id que viene por url
      const productId = req.params.id;
      // buscamos la posicion del producto que queremos editar
      const productIndex = products.findIndex((p) => p.id == productId);
  
      // Generamos el producto actualizado
      const updatedProduct = {
        ...products[productIndex],
        ...req.body,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        name: req.body.name,
        image: req.file ? req.file.filename : products[productIndex].image
      };
  
      // Reemplazamos el objeto en el array
      products[productIndex] = updatedProduct;
  
      // Escribimos en el JSON para persistir
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
  
      // Volvemos a la pagina de productos
      res.redirect('/products');
    },


    create: (req, res) => {
      // Renderizar el formulario de create
      // No necesita parametros
      res.render('newProduct');
    },

    store: (req, res) => {
      // ✓ Acceder a nuestro archivo JSON
      // ✓ Leer los datos y convertirlos en un array para modificarlo
      // Leer los datos que vienen en la request (req.body)
      const fechaCita =(req.body.fechaCitacion).split("-");
      const vencimientoPagare = (req.body.vencimientoPagare).split("-");
      const fechaRebeldia = (req.body.fechaRebeldia).split("-");
      const MESES = [
        "Nada",
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];      
      const newProduct = {
        id: products[products.length - 1].id + 1,
        ...req.body,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        otracosa: "buenas",
        autos: (req.body.autos).toUpperCase(),
        monto: Number(req.body.monto).toLocaleString(),
        fechaCitacion: fechaCita[2] + " de " + (MESES[fechaCita[1]]) + " de " + fechaCita [0],
        vencimientoPagare: vencimientoPagare[2] + " de " + (MESES[vencimientoPagare[1]]) + " de " + vencimientoPagare [0],
        fechaRebeldia: fechaRebeldia[2] + " de " + (MESES[fechaRebeldia[1]]) + " de " + fechaRebeldia [0]
      };
      // Modificar el arreglo para agregar el nuevo producto
      const newProductList = [...products, newProduct];
  
      // Escribir en el JSON el nuevo arreglo actualizado
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(newProductList, null, ' ')
      );
  
      // res.redirect('index');
      console.log(req.body)
      console.log(newProduct)

      
      res.render('sentencia',{ products: newProduct});
    },

    destroy: (req, res) => {
      // Leer el id
      const productId = req.params.id;
      // Buscar la posicion actual del producto a eliminar
      const productIndex = products.findIndex((p) => p.id == productId);
      // Recortar el array sin ese producto
      products.splice(productIndex, 1);
      // Guardar en el json el nuevo array
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
  
      res.redirect('/products');
    }
    
};



module.exports = controller;
