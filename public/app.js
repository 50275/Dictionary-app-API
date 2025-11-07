// TODO don't name variables as HTML tags li, h4, p, ul, etc. 

// document.getElementById("dialog").textContent = new Date().toString(); 
document.body.style.backgroundColor = "#FAFADF"; 
document.getElementById('button').addEventListener("click", async () => {
    // document.body.style.backgroundColor = document.body.style.backgroundColor == "white" ? "beige" : "white"; 
    let value = document.getElementById("input").value; 
    let p = document.getElementById("p"); 
    let ul = document.getElementById("ul"); 
    ul.innerHTML = ""; 
    try {
        let response = await fetch(`http://localhost:3000/api?word=${value}`);
        if (!response.ok){
            p.textContent = `Error Status: ${response.status}.`;
            document.body.style.backgroundColor = "lightcoral";
            return;
        }
        let data = await response.json(); 
        if (!data.ok){
            p.textContent = "Couldn't find that word.";
        }
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
        } 
        document.body.style.backgroundColor = "#FAFADF"; 
    } catch (error) {
        console.log(error); 
        p.textContent = "Maybe the server is down. " + error.toString();
        document.body.style.backgroundColor = "lightcoral";
    }
});