const hexInputContainer = document.querySelector("#hexInputContainer");
const hexForm = document.querySelector("#hexColorForm");

const addNew = document.querySelector("#addNewBtn");
let counter = 1;
addNew.addEventListener("click" , () => {
  counter ++;
  hexInputContainer.append(newHexColorInput(counter))
})


function newHexColorInput(itemCount){
    const newDivElement = document.createElement("div")
    newDivElement.classList.add("col-sm")

    newDivElement.innerHTML = `
    <label for="colorInput-${itemCount}" class="form-label">HEX Color</label>
    <input 
    type="text" 
    minlength="7" maxlength="7"
    class="form-control" 
    id="colorInput-${itemCount}" 
    name="color-${itemCount}"
    >
    `
    return newDivElement;
}

hexInputContainer.append(newHexColorInput(counter))
let localStorageColors = localStorage.getItem("colors") ? JSON.parse(localStorage.getItem("colors")) : []

const colorCards = document.querySelector("#colorcards")

hexForm.addEventListener("submit", (event) =>{
  event.preventDefault();

  //renk paletine yenilerini ekleyebilmek için renk dizilerini bir daha diziye aldım.

  //forma yazdıklarımı bir array in içine aldım.
  let colors = [];
  Array.from(event.target.elements).forEach(item => {
    if(item.type==="text"){
      colors.push(item.value)
    }
  })
  localStorageColors.push(colors)
  colorCards.append(addColorPalette(colors))

  localStorage.setItem("colors", JSON.stringify(localStorageColors))
  hexForm.reset();
  
})


if(localStorageColors.length >0){
  localStorageColors.forEach((colors) =>{
    colorCards.append(addColorPalette(colors))
  })
}

function addColorPalette(items) {
  const rowElement = document.createElement("div")
  rowElement.classList.add("row", "gap-3")

  items.forEach((item) =>{
    const cardItem = document.createElement("div")
    cardItem.classList.add("col-sm", "card", "my-2", "colorCard")
    cardItem.style.backgroundColor = item
    rowElement.append(cardItem)
  })
  return rowElement;
}

const colorCardItems = document.querySelectorAll(".colorCard")
colorCardItems.forEach(card => {
  card.addEventListener("click", () => {
    console.log(card.style.backgroundColor)
    navigator.clipboard.writeText(card.style.backgroundColor)
    alert("renk kopyalandı.")
  })
})