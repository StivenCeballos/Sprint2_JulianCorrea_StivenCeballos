var body = document.querySelector("body");
var imgMain = document.querySelector(".imgPrincipal");
var personas = document.getElementById('persona');


let arregloDeLista;
let celda;
let fila;

var informacion = [];


//Cargar el archivo
$.ajax({
  url: "./datos.csv",
  dataType: "text"
}).done(successFunction);

function successFunction(data) {
  //Division por saltos de linea
  var datosFila = data.split("\n");
  //Arreglo donde se guarda la nueva información

  for (let index = 1; index < datosFila.length; index++) {
    //Lectura de una linea
    let dataLinea = datosFila[index];

    //Creacion de fila Crea la tabla
    fila = document.createElement("tr");

    //Division por ;
    arregloDeLista = dataLinea.split(",");

    for (let indice = 0; indice < arregloDeLista.length; indice++) {
      //Lectura de celda
      let dataCelda = arregloDeLista[indice];

      if (!isNaN(parseInt(dataCelda))) {
        arregloDeLista[indice] = parseInt(dataCelda);
      }

    }



    //AQUI SE LE AGREGAN POSICIONES
    var usuario = { nombre: arregloDeLista[0], edad: arregloDeLista[1], peso: arregloDeLista[2], altura: arregloDeLista[3], mascotas: arregloDeLista[4] }
    informacion.push(usuario);


    //AGREGAR OPCIONES A LA LISTA DEL SELECCIONADO

    
    var opt = document.createElement('option');
    opt.innerText = usuario.nombre;
    opt.value = index - 1;
    personas.appendChild(opt);
    
  }

  imgMain.src = "/Fotos/"+ informacion[0].nombre + ".jpg";
    personas.addEventListener('change', (e)=> {
    imgMain.src = "/Fotos/"+ informacion[e.target.value].nombre + ".jpg";
      
    console.log(e);
    });

  console.log(informacion)



  //LAS VARIABLES PORCENTAJE-TIPODEVARIABLE SON LAS QUE USARE CUANDO LE DE CLICK AL BOTON DE CALCULAR DESPUES
  var porcentajeEdad;
  var porcentajePeso;
  var porcentajeAltura;
  var porcentajeMascotas;

  //OBTENGO EL VALOR DE LAS VARIABLES PARA MI 
  var valorEdad = document.getElementById('edad');

  var valorPeso = document.getElementById('peso');

  var valorAltura = document.getElementById('altura');

  var valorMascotas = document.getElementById('mascotas');


  porcentajeEdad = parseFloat(valorEdad.value) //gets the oninput
  porcentajePeso = parseFloat(valorPeso.value) //gets the oninput value
  porcentajeAltura = parseFloat(valorAltura.value) //gets the oninput value
  porcentajeMascotas = parseFloat(valorMascotas.value) //gets the oninput value



  valorEdad.addEventListener("input", (e) => {

    porcentajeEdad = parseFloat(valorEdad.value) //gets the oninput
    calcularSimilitud();

  });
  valorPeso.addEventListener("input", function () {
    porcentajePeso = parseFloat(valorPeso.value) //gets the oninput value
    calcularSimilitud();

  });
  valorAltura.addEventListener("input", function () {
    porcentajeAltura = parseFloat(valorAltura.value) //gets the oninput value
    calcularSimilitud();

  });
  valorMascotas.addEventListener("input", function () {
    porcentajeMascotas = parseFloat(valorMascotas.value) //gets the oninput value
    calcularSimilitud();

  });

 



  var calcularPersonaSeleccionada = document.getElementById('btn_calcular');
  calcularPersonaSeleccionada.addEventListener("click", () => { calcularSimilitud() });

  

  var calcularSimilitud = () => {

    var listaOrdenada = [];

    var lista = document.querySelector('.lista');

    lista.innerHTML = (' ');

    var personaSeleccionada = document.getElementById('persona');

    var indexPersonaSeleccionada = parseInt(personaSeleccionada.value);

    var datosPersonaSeleccionada = [4];

    //BUSCO LA INFO DE MI SELECCIONADO QUE SERA UNA MAS QUE MIS OTROS POR TENER NOMBRE
    datosPersonaSeleccionada[0] = informacion[indexPersonaSeleccionada].nombre;
    datosPersonaSeleccionada[1] = informacion[indexPersonaSeleccionada].edad;
    datosPersonaSeleccionada[2] = informacion[indexPersonaSeleccionada].peso;
    datosPersonaSeleccionada[3] = informacion[indexPersonaSeleccionada].altura;
    datosPersonaSeleccionada[4] = informacion[indexPersonaSeleccionada].mascotas;



    //INFORMACION DE LAS OTRAS PERSONAS



    console.log(informacion)

    for (let indexOtros = 0; indexOtros < informacion.length; indexOtros++) {

      if (indexOtros != indexPersonaSeleccionada) {

        var datosOtraPersona = [4];


        datosOtraPersona[0] = informacion[indexOtros].nombre;
        datosOtraPersona[1] = informacion[indexOtros].edad;
        datosOtraPersona[2] = informacion[indexOtros].peso;
        datosOtraPersona[3] = informacion[indexOtros].altura;
        datosOtraPersona[4] = informacion[indexOtros].mascotas;


        //COMPARO ESAS DOS PERSONAS CON MI SELECCIONADO
        //console.log(datosPersonaSeleccionada+" /// "+datosOtraPersona);



        var cosinesim = (A, B) => {
          var productoPunto = 0;
          var mA = 0;
          var mB = 0;

          for (i = 1; i < A.length; i++) {
            //CALCULO EL PRODUCTO PUNTO EN FUNCION DE MIS PORCENTAJES ASIGNADOS 
            switch (i) {
              case 1:
                productoPunto += (((A[i] - 19) * porcentajeEdad) / 23) * (((B[i] - 19) * porcentajeEdad) / 23);

                mA += (((A[i] - 19)) / 23) * (((A[i] - 19)) / 23);
                mB += (((B[i] - 19)) / 23) * (((B[i] - 19)) / 23);

                break;
              case 2:

                productoPunto += (((A[i] - 45) * porcentajePeso) / 80) * (((B[i] - 45) * porcentajePeso) / 80);

                mA += (((A[i] - 45)) / 80) * (((A[i] - 45)) / 80);
                mB += (((B[i] - 45)) / 80) * (((B[i] - 45)) / 80);

                break;
              case 3:
                productoPunto += (((A[i] - 150) * porcentajeAltura) / 195) * (((B[i] - 150) * porcentajeAltura) / 195);

                mA += (((A[i] - 150)) / 195) * (((A[i] - 150)) / 195);
                mB += (((B[i] - 150)) / 195) * (((B[i] - 150)) / 195);

                break;
              case 4:
                productoPunto += (((A[i] - 0) * porcentajeMascotas) / 16) * (((B[i] - 0) * porcentajeMascotas) / 16);

                mA += (((A[i] - 0)) / 16) * (((A[i] - 0)) / 16);
                mB += (((B[i] - 0)) / 16) * (((B[i] - 0)) / 16);

                break;
            }

          }
          mA = Math.sqrt(mA);
          mB = Math.sqrt(mB);


          var similitud = (productoPunto) / ((mA) * (mB));
          return similitud;
        }

        var p = cosinesim(datosPersonaSeleccionada, datosOtraPersona);

        var p2 = p * 100;
        //PRINTEO EL PARECIDO DE MI PERSONA SELECCIONADA CON TODOS
        console.log(datosPersonaSeleccionada[0] + " Y " + datosOtraPersona[0] + " son así de parecidos:  " + parseInt(p2) + "%");

        var similitud = parseInt(p2);

        

          listaOrdenada.push({nombre:datosOtraPersona[0], similitud});



        
      }
    }

    listaOrdenada.sort((A,B) => {
      if(A.similitud < B.similitud){
        return 1;
      }else{
        return -1;
      }

    }
    );

    listaOrdenada.forEach(user => {
      var personaView = document.createElement("div");
    personaView.className = "personaV";
    personaView.style.marginBottom = `${user.similitud*4}px`

    personaView.style.backgroundImage = 'url("./Fotos/' + user.nombre + '.jpg")';



    lista.appendChild(personaView)
    });

  

    

  }

  calcularSimilitud();


  /*
  $(document).click(function(event){
    var alumno=$(event.target);
    console.log(alumno);
  })*/

}

