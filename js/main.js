const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

  // VARIABLES

  let description = document.querySelector("#description");
  let calories = document.querySelector("#calories");
  let carbs = document.querySelector("#carbs");
  let protein = document.querySelector("#protein");

  let list = []

    // Otra manera de remover la clase is-invalid
  // description.onkeypress = () => {
  //   description.classList.remove('is-invalid')
  // }
  // calories.onkeypress = () => {
  //   calories.classList.remove('is-invalid')
  // }
  // carbs.onkeypress = () => {
  //   carbs.classList.remove('is-invalid')
  // }
  // protein.onkeypress = () => {
  //   protein.classList.remove('is-invalid')
  // }


  // FUNCIONES

  const validatorInput = () => {
    description.value 
    ? description.classList.remove('is-invalid')
    : description.classList.add('is-invalid')
    calories.value 
    ? calories.classList.remove('is-invalid') 
    : calories.classList.add('is-invalid')
    carbs.value 
    ? carbs.classList.remove('is-invalid') 
    : carbs.classList.add('is-invalid')
    protein.value 
    ? protein.classList.remove('is-invalid') 
    : protein.classList.add('is-invalid')

    if(description.value && calories.value && carbs.value && protein.value) {
      addObject()
    }
  }

  const addObject = () => {
    newItem = {
      description: description.value,
      calories: Number(calories.value),
      carbs: Number(carbs.value),
      protein: Number(protein.value)
    }
    list.push(newItem) // Agrega newItem al array list
    cleanInputs()
    updateTotals()
    renderItems()  
  }

  const updateTotals = () => {
    let calories = 0, carbs = 0, protein = 0

    list.map(item => {
      calories += item.calories,
      carbs += item.carbs,
      protein += item.protein
    })
    document.querySelector('#totalCalories').textContent = calories
    document.querySelector('#totalCarbs').textContent = carbs
    document.querySelector('#totalProtein').textContent = protein
  }
  
  const renderItems = () => {
    // otra manera de poder obtener un elemento por el name TAG
    // solo que este metodo consigue un arreglo de elementos
    const $CONTAINER = document.getElementsByTagName("tbody")[0];
    $CONTAINER.innerHTML = "";
    const ROWS = list.map((item) => {
        const {
            calorias, description,
            carboidratos, proteinas,
        } = item;
        return tableRow([description, calorias, carboidratos, proteinas]);
    });
    $CONTAINER.innerHTML = ROWS.join("");
};

  const cleanInputs = () => {
    description.value = ''
    calories.value = ''
    carbs.value = ''
    protein.value = ''
  }

  const attrsToString = (obj = {}) => {
    const keys = Object.keys(obj)
    const attrs = []

    for(let i = 0; i < keys.length; i++) {
      const attr = keys[i]
      attrs.push(`${attr}="${obj[attr]}"`)
    }
    const string = attrs.join('')
    return string
  }

  const tagAttrs = (obj, content) => `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

  const tag = t => {
    if(typeof t === 'string'){
     tagAttrs({tag: t})
    } else tagAttrs(t)
  }

  const tableRowTag = tag('tr')
  const tableRow = items => tableRowTag(tableCells(items))

  const tableCell = tag('td')
  const tableCells = items => items.map(tableCell).join('')

  