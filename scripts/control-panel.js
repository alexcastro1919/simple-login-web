import { getUserFromCookie, closeSession } from "./api.js"

$(async function() {
  try {
    const user = await getUserFromCookie()
    if (user === null) {
      $("#welcome-title").text("Not logged in")
    } else {
      $("#welcome-title").text(user.name)
    }
    
  } catch (e) {
    $("#welcome-title").text("Not logged in")
  }
})

$("#close-session").on("click", function() {
  closeSession()
  document.location.reload()
})