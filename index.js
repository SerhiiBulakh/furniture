(function(){
    const $root = $('#root')
    const $bar = $('.navbar-nav')
    const $catalog = $('#catalog')
    const $exit = $('#exit')
   
    function init () {
        $root.append(loginFormHTML)
        addEventForm()
    }
    function addEventForm() {
        const $formmaaaa = $('.formmaaaa')
        
        $formmaaaa.submit(formData)
        $catalog.on('click', showCatalog)
        $exit.on('click', onExit)
    }
    function addEventList() {
        const ul = $('#furniture-list')
        ul.on('click', getfurnitureDetails)
    }
    

    function showCatalog (){
        getMainContent () 
    }
    function onExit () {
        cleanPlace()
        addClassLink()
        init()
    }
    function formData (e) {
        e.preventDefault()
        const pass =  $('#inputPassword').val()
        if(!validPassword(pass)) return errorMessage(pass)
        removeClassLink()
        getMainContent()
        
        
    }

    async function getMainContent () {
        cleanPlace()
        const data = await $.getJSON('data.json', renderMainContent )
        addEventList()
    }
    


   function getfurnitureDetails(e) {
        $.getJSON('data.json', ( {furniture} ) => {
            const item = furniture.find( (val)=> val.id == e.target.id )
               cleanPlace()    
               $root.append(furnitureDetailsHTML(item))
            }) 
    }




    function renderMainContent({ furniture }) {
        const items = [];
        $.each( furniture, function( key, val ) {
            
          items.push( `<li id="${val.id}" class="list-group-item list-group-item-action">${val.name}</li>` );
        });
       
        $( "<ul/>", {
          "class": "list-group content",
          "id": "furniture-list",
          html: items.join( "" )
        }).appendTo( $root );
    }

    function errorMessage(pass) {
        $('.error-message').html(`Вы ввели слишком короткий пароль ${pass.length}, минимун 10 символов`)
    }

    function cleanPlace() {
        $('#root').empty()
    }
    function validPassword(pass){
        if(pass.length < 10) return false
        return true
    }
    

   function removeClassLink() {
     $bar.children()
         .each( function() {
            $(this).removeClass('disabled')
        })
    }
    function addClassLink() {
        $bar.children()
         .each( function() {
            $(this).addClass('disabled')
        })
    }
    function furnitureDetailsHTML ({color, height, id, img, name, price, type, width}) {
        const images = img.map(imgLoad).join(' ')
        return `
        <div class='card' >
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    ${images}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                 </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div> 
            <div class="card-body">
                <h5 class="card-title"><span>Модель:  </span> ${name} </h5>
            
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span>Цвет:  </span>${color}</li>
                    <li class="list-group-item"><span>Тип:  </span>${type}</li>
                    <li class="list-group-item"><span>Цена:  </span>${price}<span>грн</span></li>
                    <li class="list-group-item"><span>Ширина:  </span>${width}</li>
                    <li class="list-group-item"><span>Высота:  </span>${height}</li>
                </ul>
            </div>
  </div>
    `
    }

    function loginFormHTML() {
        return `
        <div class='text-center'>
        <form class="form-signin formmaaaa">
            <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <span class="error-message"></span>
       
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        </div>`
    }
    function imgLoad(img, i) {
        if(i == 0)  return  `<div class="carousel-item active"><img class="d-block w-100" src="${img}"></div>`
       return  `<div class="carousel-item "><img class="d-block w-100" src="${img}"></div>` 
    }
    init()
}())