async function login()
{
    const result = document.getElementById("result");
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;
    if(username && password)
    {
        const resp = await fetch("/login", 
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        }).then(resp => resp.json());
        if(resp.messages.length == 0) window.location.reload();
        else 
        {
            console.log(resp.messages);
            result.innerHTML = "";
            resp.messages.forEach(msg => 
            {
                const ms = msg.split(":");
                result.innerHTML += `<li><span class="res-type">${ms[0]}:</span><span class="res-msg">${ms[1]}</span></li>`;
            });
        }
    }
}