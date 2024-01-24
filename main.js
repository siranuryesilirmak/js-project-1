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

hexForm.addEventListener("submit", (event) =>{
  event.preventDefault();

  //renk paletine yenilerini ekleyebilmek için renk dizilerini bir daha diziye aldım.
  let localStorageColors = localStorage.getItem("colors") ? JSON.parse(localStorage.getItem("colors")) : []

  //forma yazdıklarımı bir array in içine aldım.
  let colors = [];
  Array.from(event.target.elements).forEach(item => {
    if(item.type==="text"){
      colors.push(item.value)
    }
  })
  localStorageColors.push(colors)

  localStorage.setItem("colors", JSON.stringify(localStorageColors))
  hexForm.reset();
})


