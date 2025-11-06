// document.getElementById("dialog").textContent = new Date().toString(); 
document.getElementById('button').addEventListener("click", async () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor == "white" ? "beige" : "white"; 
    let value = document.getElementById("input").value; 
    let p = document.getElementById("p"); 
    try {
        let response = await fetch(`http://localhost:3000/api?word=${value}`);
        if (!response.ok){
            p.textContent = `Error Status: ${response.status}. Check your spelling or server logs.`;
            document.body.style.backgroundColor = "lightcoral";
            return;
        }
        let data = await response.json(); 
        if (Array.isArray(data) && data.length > 0) {
            // let text = JSON.stringify(data[0]); 
            // p.textContent = text; 
            p.textContent = data[0]["phonetic"]; 

            let meanings = data[0]["meanings"]; 
            meanings.forEach(u => {
                let li = document.createElement('li');
                ul.appendChild(li); 
                let h4 = document.createElement("h4");
                h4.textContent = u.partOfSpeech;    
                li.appendChild(h4); 
                let nestedUl = document.createElement("ul"); 
                li.appendChild(nestedUl); 
                u.definitions.forEach(v => {
                    let nestedLi = document.createElement("li");
                    nestedLi.textContent = v.definition; 
                    nestedUl.appendChild(nestedLi); 
                });
            });
            // dialogElement.textContent = "clueless " + text.word + " " + text.meanings.; 
        } else {
            p.textContent = "No definition found.";
        }
    } catch (error) {
        p.textContent = `Network Error: Could not connect to server.`;
        document.body.style.backgroundColor = "coral";
        console.error("Fetch failed:", error); // (don't) allow it
    }
});