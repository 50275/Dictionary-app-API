// document.getElementById("dialog").textContent = new Date().toString(); 
document.getElementById('button').addEventListener("click", async () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor == "white" ? "beige" : "white"; 
    let value = document.getElementById("input").value; 
    let dialogElement = document.getElementById("dialog"); 
    try {
        let response = await fetch(`http://localhost:3000/api?word=${value}`);
        if (!response.ok){
            dialogElement.textContent = `Error Status: ${response.status}. Check your spelling or server logs.`;
            document.body.style.backgroundColor = "lightcoral";
            return;
        }
        let data = await response.json(); 
        if (Array.isArray(data) && data.length > 0) {
            let text = JSON.stringify(data[0]); 
            dialogElement.textContent = text; 
            // dialogElement.textContent = "clueless " + text.word + " " + text.meanings.; 
        } else {
            dialogElement.textContent = "No definition found.";
        }
    } catch (error) {
        dialogElement.textContent = `Network Error: Could not connect to server.`;
        document.body.style.backgroundColor = "coral";
        console.error("Fetch failed:", error); // (don't) allow it
    }
});