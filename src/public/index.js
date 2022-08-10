console.log(window.user);

document.getElementById("title").innerText = "Bem Vindo, " + window.user.username;

document.getElementById("last-action").innerText = window.lastaction;
const pvws = document.getElementById("pageviews")
pvws.innerHTML = '';
    
window.pageviews.forEach(pageview => 
{
    pvws.innerHTML += `<li>${pageview}</li>`
});