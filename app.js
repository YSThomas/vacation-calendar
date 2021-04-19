// селекторы глобальные переменные
const formVacation = document.querySelector('#formVacation'); // форма
const workerName = document.querySelector('#nameVacation'); // поле с именем
const allVacations = document.querySelector('.allVacations');
const dateRangeVacation = document.querySelector('#dateRange');
const btnAccept = document.querySelector('#acceptBtn');

//класс
class Vacation { // класс заявки
  constructor(dateRange, name) {
    this.name = name
    this.dateRange = dateRange
    this.accepted = false
  }
}

class CalendarEvent { //класс ивента
  constructor(title, start, end) {
    this.title = title
    this.start = start
    this.end = end
  }
}

// массивы и хранилища
let vacationArray

if(localStorage.getItem('allVacationsArray') === null){
  vacationArray = [];
}else{
  vacationArray = JSON.parse(localStorage.getItem('allVacationsArray'))
}

let eventsCalendarArray

if(localStorage.getItem('eventsCalendarArray') === null){
  eventsCalendarArray = [];
}else{
  eventsCalendarArray = JSON.parse(localStorage.getItem('eventsCalendarArray'))
}

//слушатели

try {
  formVacation.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(workerName.value === ''){
      console.error('Заполните все поля')
      return;
    } else {
      const vac = new Vacation(dateRangeVacation.value, workerName.value)
      vacationArray.push(vac);
      localStorage.setItem('allVacationsArray', JSON.stringify(vacationArray))
      // console.log(vacTest)
      workerName.value = ''
    }
  }) // отправка формы
}catch (e) {
  console.error(`Забей. На этой странице просто нет некоторых элементов. Ошибка подробнее: ${e}`);
}

btnAccept.addEventListener('click', (e) =>{

  let question = confirm('Убедитесь, что выбраны все необходимые заявки. Подтвердите, если всё верно.')
  if(question === true){
    let i = vacationArray.length;
    while (i--){
      if(vacationArray[i].accepted === true){ //если совпало
        //определяем стартовую дату
        let dateStart = new Date(vacationArray[i].dateRange.split('-')[0])
        let dateStartNew = new Date(dateStart.getTime() - (dateStart.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        //определяем финальную дату
        let dateEnd = new Date(vacationArray[i].dateRange.split('-')[1])
        let dateEndNew = new Date(dateEnd.getTime() - (dateEnd.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        //создаем ивент
        let createEvent = new CalendarEvent(vacationArray[i].name, dateStartNew, dateEndNew);

        eventsCalendarArray.push(createEvent) // пушим ивент в календарь

        console.log(createEvent)

        vacationArray.splice(i, 1)// удаляем заявку из... заявок... ну да.

        localStorage.setItem('allVacationsArray', JSON.stringify(vacationArray)) //грязно надругавшись сохраняем новый список заявок
        localStorage.setItem('eventsCalendarArray', JSON.stringify(eventsCalendarArray)) //сохраняем календарь событий

        allVacations.innerHTML = ''
        createElement()
      }
    }
  }
})

//функции

function createElement(){
    for (let i = 0; i < vacationArray.length; i++){
      const vacationElement = document.createElement('div'); // создаем див для каждого элемента
      vacationElement.classList.add('vacationElement');

      const pName = document.createElement('p'); // p для имени
      pName.classList.add('p-name');
      pName.innerText = `${vacationArray[i].name}`;
      vacationElement.appendChild(pName)

      const pRange = document.createElement('p'); // p для calendar range
      pRange.classList.add('p-range');
      pRange.innerText = `${vacationArray[i].dateRange}`;
      vacationElement.appendChild(pRange)

      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = '<i class="far fa-trash-alt" style="pointer-events:none"></i>'
      deleteBtn.classList.add('deleteBtn')
      deleteBtn.classList.add('btn')
      deleteBtn.classList.add('btn-danger')
      vacationElement.appendChild(deleteBtn)

      deleteBtn.addEventListener('click', e => { //Кнопка удаления
        let element = e.currentTarget;
        vacationArray.splice(i, 1)

        localStorage.setItem('allVacationsArray', JSON.stringify(vacationArray)) //грязно надругавшись сохраняем новый список заявок

        allVacations.innerHTML = ''

        console.log(element.parentElement.innerText)
        createElement()
        checkVacationArray()
      })


      const completeBtn = document.createElement('button')
      completeBtn.innerHTML = '<i class="fas fa-check-square" style="pointer-events:none"></i>'
      completeBtn.classList.add('completeBtn')
      completeBtn.classList.add('btn')
      completeBtn.classList.add('btn-primary')
      vacationElement.appendChild(completeBtn)

      completeBtn.addEventListener('click', e => {
        if (vacationArray[i].accepted === false){
          vacationArray[i].accepted = true;
          vacationElement.classList.add('accepted');
        }else{
          vacationArray[i].accepted = false
          vacationElement.classList.remove('accepted');
        }

        localStorage.setItem('allVacationsArray', JSON.stringify(vacationArray))

        console.log(vacationArray[i])
      })

      allVacations.appendChild(vacationElement)

      if(vacationArray[i].accepted === true){
        vacationElement.classList.add('accepted');
      }

  }
}

function checkVacationArray(){ // Проверка. Если в массиве 0 заявлений, значит кнопка подтверждения должна отключиться
  if (vacationArray.length === 0){
    console.log('я хуярю')

    allVacations.innerHTML = '<p class="font-weight-light">Заявок нет.</p>';
    btnAccept.setAttribute('disabled', 'disabled');
  }
}

//вызовы

try{
  createElement();
  checkVacationArray()
}catch (e){
  console.error(`Иди своей дорогой, сталкер! ${e}`)
}