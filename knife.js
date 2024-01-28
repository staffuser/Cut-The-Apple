// Проверяем, есть ли в LocalStorage информация о перемещении элемента
if (localStorage.getItem('moved') === null) {
  // Если информации нет, то перемещаем элемент на левую часть
  document.getElementById('knife').style.transformOrigin = 'unset';
  // Записываем информацию о перемещении в LocalStorage
  localStorage.setItem('moved', 'top');
} else {
  // Если информация есть, то проверяем, где сейчас элемент находится
  if (localStorage.getItem('moved') === 'top') {
    // Если элемент находится на левой части, перемещаем его на правую
    document.getElementById('knife').style.transformOrigin = 'top';
    // Изменяем информацию о перемещении в LocalStorage
    localStorage.setItem('moved', 'down');
  } else {
    // Если элемент находится на правой части, перемещаем его на левую
    document.getElementById('knife').style.transformOrigin = 'bottom center';
    // Изменяем информацию о перемещении в LocalStorage
    localStorage.setItem('moved', 'top');
  }
}