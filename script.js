const dataKey = "persons"



function Person(firstName , lastName , age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}


function init() {
    const entryElement = document.getElementById("table").getElementsByTagName("tbody")[0];
    entryElement.innerHTML = ''
    getTableEntries().forEach( (e) => entryElement.append(e))
}

init()

function getTableEntries() {
    const personData = getData()
   
    const tableEntryElements = personData.map((person, index) =>generateRow(person, index))
    return tableEntryElements   
}


function addPerson() {
    const personData = getData()
    const firstName = document.getElementById("FirstName").value.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\B\w/g, (match) => match.toLowerCase());
    const lastName =  document.getElementById("LastName").value.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\B\w/g, (match) => match.toLowerCase());
    const age = document.getElementById("Age").value
    
    const person = new Person(firstName, lastName, age)

    
    personData.push(person)
    setData(personData)
}



function setData(persons) {
    localStorage.setItem(dataKey, JSON.stringify(persons))
    init()
    // entryElement.innerHTML = getTableEntries() + entryElement.innerHTML 
}

function getData()
{
    const content = localStorage.getItem(dataKey) 
    return  ( content != null ? JSON.parse(content)  : [] );
}



function generateRow(person, id) {
    console.log(person, id)
    const tr = document.createElement('tr');
    tr.setAttribute("key", id)
    const firtsName = document.createElement('td')
    firtsName.innerHTML = person.firstName
    const lastName = document.createElement('td')
    lastName.innerHTML = person.lastName
    const age = document.createElement('td')
    age.innerHTML = person.age

    const deletion = document.createElement('td');
    const button = document.createElement('button')
    button.addEventListener("click", () => deletePerson(id))
    button.type = "submit"
    const image = document.createElement('img');
    image.className = "delete-icon"

    button.appendChild(image)
    deletion.append(button)
   

    tr.appendChild(firtsName)
    tr.appendChild(lastName)
    tr.appendChild(age)
    tr.appendChild(deletion)
    return tr;
    
}

function deletePerson(id) {
    
    const personData = getData()
    personData.splice(id, 1) 
    setData(personData)
}