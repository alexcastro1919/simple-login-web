// Función para obtener las cookies almacenadas.
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

// Función para (iniciar sesión) obtener la key de un usuario a partir de su email y password.
export async function getKey(email, password) {
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


// Función
export async function getUserFromCookie() {
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
      return null
    }
}

export async function register(email, password, name, lastName) {
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

export async function closeSession() {
  document.cookie = "key=" + null
  document.cookie = "baseId=" + null
}

