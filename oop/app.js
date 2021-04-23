//ОСНОВНОЙ

//Фейковое хранилище
let vacationsArray = [
  // {
  //   id: 0,
  //   name: 'Гарик Мартиросян',
  //   range: "2021-04-06 - 2021-04-22",
  //   accepted: false
  // },
  // {
  //   id: 1,
  //   name: 'Гарик Бульдог Харламов',
  //   range: "2021-04-06 - 2021-04-22",
  //   accepted: false
  // },
  // {
  //   id: 2,
  //   name: 'Леди Гага',
  //   range: "2021-04-22 - 2021-04-24",
  //   accepted: false
  // },
  // {
  //   id: 3,
  //   name: 'Гуси Га-га-га',
  //   range: "2021-04-24 - 2021-04-26",
  //   accepted: false
  // }
]

let calendarEventsArray = [
  {
    id: 0,
    name: 'Google I/O',
    location: 'San Francisco, CA',
    startDate: new Date(2021, 4, 28),
    endDate: new Date(2021, 4, 29)
  }
]

//КЛАССЫ

class Store {
  //В будущем локальное хранилище
}

class UI {
  static showAllVacations(){ // обновление всех заявок
    const vacationsDiv = document.querySelector(".all-vacations")
    vacationsDiv.innerHTML= ''

      vacationsArray.forEach((e, i) =>{
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add('col-md-12')

        card.innerHTML = `
            <div class="vacations-item card-body">
              <h5 class="vacations-item-name card-title">${vacationsArray[i].name}</h5>
              <p class="vacations-item-range card-text">Даты: <span>${vacationsArray[i].range}</span></p>
              <p class="vacations-item-range card-text">Статус: <span>${vacationsArray[i].accepted}</span></p>
              <button class="btn btn-success btnAccepted">Одобрить :)</button>
              <button class="btn btn-danger btnDelete">Удалить :(</button>
            </div>
        `
        vacationsDiv.appendChild(card)

        const allBtnSuccess = document.querySelectorAll('.btnAccepted') // кнопки Одобрить :)
        allBtnSuccess[i].addEventListener('click', () =>{ // при нажатии на Одобрить :)
          vacationsArray[i].toggle() //Меняем .accepted на противоположное

          UI.showAllVacations() // Подгружаем результат
        })

        const allBtnDelete = document.querySelectorAll('.btnDelete') // кнопки Удалить :(
        allBtnDelete[i].addEventListener('click', ()=>{
          vacationsArray.splice(i, 1);
          console.log('Удален ' + i);

          UI.showAllVacations() // Подгружаем результат
        })
      })
  }

  static showCalendarEvents(){
    const eventsDiv = document.querySelector(".all-accepted-vacations") //все принятые заявки в этом диве
    eventsDiv.innerHTML= ''

    calendarEventsArray.forEach((e,i) =>{
      const card = document.createElement('div')
      card.classList.add('card')
      card.classList.add('col-md-12')

      card.innerHTML = `
            <div class="vacations-item card-body">
              <h5 class="vacations-item-name card-title">${calendarEventsArray[i].name}</h5>
              <p class="vacations-item-range card-text">Даты: начало - <span>${calendarEventsArray[i].startDate}, окончание - ${calendarEventsArray[i].endDate}</span></p>
              <button class="btn btn-danger btnDelete">Удалить</button>
            </div>
        `
      eventsDiv.appendChild(card)
    })
  }

  static clearVacationInputs(){ // очистка полей ввода в форме заявки
    document.querySelector('#worker-name').value = ''
  }
}

class Vacation {
  constructor(name, range) {
    this.id = vacationsArray.length
    this.name = name
    this.range = range
    this.accepted = false
  }
  toggle(){
    this.accepted = !this.accepted
    if (this.accepted === true){
      const newCalendarEvent = new CalendarEvent(this.name, this.range)
      vacationsArray.splice(this.id, 1);
      console.log(this.name + ' одобрен и нужно перекинуть его в календарь')
      calendarEventsArray.push(newCalendarEvent)
      UI.showCalendarEvents()
    }
  }
}

class CalendarEvent {
  constructor(name, range) {
    const startYear = Number(range.split('-')[0].split('/')[2])
    const startMonth = Number(range.split('-')[0].split('/')[1])
    const startDay = Number(range.split('-')[0].split('/')[0])

    const endYear = Number(range.split('-')[1].split('/')[2])
    const endMonth = Number(range.split('-')[1].split('/')[1])
    const endDay = Number(range.split('-')[1].split('/')[0])

    this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    this.id = calendarEventsArray.length
    this.name = name
    this.location = ''
    this.startDate = new Date(startYear, startMonth, startDay)
    this.endDate = new Date(endYear, endMonth, endDay)
  }
}

// ИВЕНТЫ
document.addEventListener('DOMContentLoaded', UI.showAllVacations) //после загрузки DOM рендерит карточки заявок из списка

document.querySelector('#vacation').addEventListener('submit', (e)=>{ // форма создания заявки
  e.preventDefault()

  const name = document.querySelector('#worker-name')
  const range = document.querySelector('#date-range')
    const nameHelp = document.querySelector('#workerNameHelp')

  if(name.value.length < 10){

    nameHelp.classList.remove("text-muted")
    nameHelp.classList.add("text-danger")
    nameHelp.innerText = 'Имя должно содержать более 10 символов'
    return
  }else{
    nameHelp.classList.remove("text-danger")
    nameHelp.classList.add("text-muted")
    nameHelp.innerText = 'Введите Ваше имя'
  }

  const vacation = new Vacation(name.value, range.value)
  vacationsArray.push(vacation)

  UI.clearVacationInputs()
  UI.showAllVacations()
  UI.showCalendarEvents()
})