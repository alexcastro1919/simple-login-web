$(function() {
    $(document).keydown(function (e) { 
        
   
        var correu =  $("#inputCorreu").val()

        if (correu.includes("@")){
            $("#inputCorreu").css("box-shadow", "0px 0px 49px -6px rgba(23, 150, 11, 0.678)");
        }
       
        
    })

    $("#iniciarSesioButton").hover(function () {
        $("#crearCompteRedirect").css("animation","shake 0.5s");
        $("#crearCompteRedirect").css("animation-iteration-count","3");
    })

    $("#crearButton").hover(function () {
        $("#iniciarSesioRedirect").css("animation","shake 0.5s");
        $("#iniciarSesioRedirect").css("animation-iteration-count","3");
    })
    
    $('#crearCompteRedirect').click(function(){
        window.location.href='/text/crear-sesion.html';
     })

     $('#iniciarSesioRedirect').click(function(){
        window.location.href='/text/iniciar-sesion.html';
     })

     $("#inputContraRepit").keydown(function (e) { 
        if ($("#inputContra").val()===$("#inputContraRepit").val()){
            $("#inputContra").css("box-shadow", "0px 0px 22px 9px rgba(16,201,59,1)");
            $("#inputContraRepit").css("box-shadow", "0px 0px 22px 9px rgba(16,201,59,1)");  
        }
    })

  















    $("#iniciarSesioButton").click(async function() {
        var correu =  $("#inputCorreu").val()
        var password = $("#inputContra").val()
    
        const key = await getKey(correu, password)
        document.cookie = "key=" + key.key
        document.cookie = "baseId=" + key.baseId

        const user = await getUserFromCookie()
        console.log(user)
    })
    
    async function register(email, password, name, lastName) {
        const payload = {
            email: email,
            password: password,
            name: name,
            lastName: lastName
        };
      
        const registerResponse = await fetch('http://192.168.5.5:8080/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        try {
            return await registerResponse.json()
        } catch (e) {
            console.error(e)
        }
    }
    
    async function getUserFromCookie() {
        const key = getCookie("key")
        const baseId = getCookie("baseId")
        const url = "http://192.168.5.5:8080/api/user/get?key=" + key + "&baseId=" + baseId
        const getResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        try {
          return await getResponse.json()
        } catch (e) {
            console.error(e)
        }
    }
    
    async function getKey(email, password) {
        const payload = {
            email: email,
            password: password,
        };
    
        const keyResponse = await fetch('http://192.168.5.5:8080/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        try {
            return await keyResponse.json()
        } catch (e) {
            console.error(e)
        }
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
})



