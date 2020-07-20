function add_input() {
    let p = document.createElement('p');
    p.innerHTML = "Новое поле поле";
    let input = document.createElement("INPUT");
    let date = new Date();
    input.className="text";
    input.setAttribute("type", "text");
    input.setAttribute("value",document.querySelectorAll("input[type=text]")[3].value + "Date: " + date.toLocaleDateString())
    p.appendChild(input);
    document.querySelectorAll("input[type=text]")[0].insertAdjacentElement("afterend",p);
return false;
}
function smena_zveta()
{
    // var testel = document.getElementById('test');
    // testel.style.color = "#f00";
    document.body.style.color = "#f00"
    document.querySelector('h1').style.color = '#f00';
    document.querySelector('span').style.color='#f00';
}
function reset_button() {
    let mas = document.querySelectorAll("input[type=text]").forEach(el => {
        el.value = '';
        el.disabled = true;
    });
}
function to_area() {
    let text = '';
    let mas = document.querySelectorAll("input[type=text]").forEach((el,index) => {
        if (index < 3) {
        text += el.value + '\n';
        }
    });
    document.querySelector('textarea').innerHTML = text;
    document.querySelector('textarea').style.color = document.querySelector('select').value;
}
