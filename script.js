document.addEventListener("DOMContentLoaded", function(event) {


  document.getElementById('apple').style.visibility = 'hidden';
  document.getElementById('knife').style.visibility = 'hidden';
  document.getElementById('full-2').style.visibility = 'hidden';
  document.getElementById('score').style.visibility = 'hidden';
  document.getElementById('com').style.visibility = 'hidden';
  document.getElementById('game-area').style.visibility = 'hidden';

  // Создаем элемент div для экран-заставки
  var overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "9999";

  // Добавляем текст на экран-заставку
  var text = document.createElement("p");
  text.innerHTML = `<script src='https://api-maps.yandex.ru/2.1/?apikey=960272e&lang=ru_RU'></script> 
  <div id="game-menu">
    <h1>click on "space" to continue
    <br>
    <input id="realismSwitch" type="checkbox">
    <label for="realismSwitch">Real object</label>

    </h1>
  </div>
  `;
  text.style.color = "white";
  text.style.fontSize = "24px";

  overlay.appendChild(text);


  apple.addEventListener("transitionend", function(event) {
    // Ваш код здесь выполняется после окончания анимации

    
    // создаем экземпляр MutationObserver и передаем ему функцию обратного вызова
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // при изменении объекта #knife меняем скорость анимации объекта #apple
        apple.style.transition = '0.3s'; // пример скорости анимации, можно задать любую нужную скорость
      });
    });

    // конфигурация нашего observer:
    const config = { attributes: true, childList: true, subtree: true };

    // передаем элемент и настройки в observer, запускаем отслеживание
    observer.observe(knife, config);


    createApple();
  });

  // Добавляем экран-заставку на страницу
  document.body.appendChild(overlay);
  

  function real(apple, img) {
    apple.style.backgroundImage = "url('" + img + "')";
    apple.style.backgroundSize = 'cover';
    apple.style.backgroundPosition = 'center';
    apple.style.backgroundRepeat = 'no-repeat';
  }

  document.getElementById('realismSwitch').addEventListener('change', function() {
    var menu = document.getElementById("game-menu");
    var apple = document.getElementById("apple");
    var knife = document.getElementById("knife");

    if (this.checked) {
      real(menu, 'uploads/mess.png');
      real(apple, 'uploads/apple.jpg');
      real(knife, 'uploads/knife.png');
    } else {
      menu.style.backgroundImage = "none";
      apple.style.backgroundImage = "none";
      knife.style.backgroundImage = "none";
    }
  });

  document.addEventListener('keydown', function(event) {
    document.getElementById('apple').style.visibility = 'visible';
    document.getElementById('knife').style.visibility = 'visible';
    document.getElementById('full-2').style.visibility = 'visible';
    document.getElementById('score').style.visibility = 'visible';
    document.getElementById('com').style.visibility = 'visible';
    document.getElementById('game-area').style.visibility = 'visible';
    document.getElementById('game-area').classList.add("revealing");

    if (event.code === 'Space') {

      var knife = document.getElementById("knife");
      var scoreElement = document.getElementById("score");
    
      var score = localStorage.getItem('score');
      scoreElement.innerText = score;
    
      // Проверка наличия объекта #clean
      var button = document.getElementById('clean');

      if (!button) {
        // Создаем кнопку
        button = document.createElement("button");
        button.id = 'clean';
        button.innerHTML = "Clean";

        document.body.appendChild(button);
      }
      
    
      // Добавляем обработчик события при нажатии на кнопку
      button.addEventListener("click", function() {
          try {
            localStorage.setItem('score', 0);
          } catch (e) {
            // Обработка ошибки, если локальное хранилище переполнено
            // Добавляем достижение "хранилище переполнено"
            var achievement1 = document.createElement('div');
            achievement1.id = "subforum-row";
            achievement1.textContent = 'overloading';
            achievementList.appendChild(achievement1);
          }
    
    
          window.location.reload(true);
      });
    
      // Функция для установки начального положения ножа
      function setInitialKnifePosition() {
          knife.style.transform = "rotate(0deg)";
      }
    
      // Функция для поворота ножа на 45 градусов
      function rotateKnife() {
          var rotateAmount = parseInt(knife.style.transform.split("(")[1].split("deg)")[0]);
          if (rotateAmount >= 45) {
              knife.style.transform = "rotate(" + (rotateAmount + 45) + "deg)";
          } else {
              knife.style.transform = "rotate(" + (rotateAmount - 180) + "deg)";
          }
          if (rotateAmount >= -45) {
              knife.style.transform = "rotate(" + (rotateAmount - 45) + "deg)";
          } else {
              knife.style.transform = "rotate(" + (rotateAmount + 180) + "deg)";
          }
      }
    
      // Функция для очистки яблока
      function cleanApple() {
        apple.style.backgroundColor = "white";
        apple.style.animation = 'explode 0.5s linear';
        window.location.reload(true);
      }
    
      // Функция для проверки, является ли яблоко очищенным
      function AppleClean() {
          score++;
          localStorage.setItem('score', score);
          cleanApple();
          setInitialKnifePosition();
          return apple.style.backgroundColor === "white";
      }
    
      function ckeck() {
        var knifeRect = knife.getBoundingClientRect();
        var appleRect = apple.getBoundingClientRect();
    
        if (
          knifeRect.left < appleRect.right &&
          knifeRect.right > appleRect.left &&
          knifeRect.top < appleRect.bottom &&
          knifeRect.bottom > appleRect.top
        ) {
          // Если объекты пересекаются, очищаем яблоко
          document.getElementById("apple").style.color = "silver";
          AppleClean();
        } else {
          // Если объекты пересекаются, меняем цвет .knife на белый
          document.getElementById("knife").style.color = "white";
          
        }
      }
    
      var mouseContainer = document.getElementById('mouse');
    
      mouseContainer.addEventListener('mousemove', function(e) {
        var pointer = document.getElementById("knife");
        pointer.style.left = (e.pageX - mouseContainer.offsetLeft - 25) + 'px';
      });
    
      mouseContainer.addEventListener('mouseenter', function() {
        var pointer = document.getElementById("knife");
        pointer.style.display = 'block';
      });
    
      mouseContainer.addEventListener('mouseleave', function() {
        var pointer = document.getElementById("knife");
        pointer.style.display = 'none';
      });
    
      mouseContainer.addEventListener("wheel", function(event) {
          var pointer = document.getElementById("knife");
          var gameArea = document.getElementById("game-area");
          var currentSize = parseInt(gameArea.style.width);
    
          if (event.deltaY > 0) {
            // Уменьшить размер объекта .knife
            pointer.style.height = "75px";
            gameArea.style.width = (currentSize - 10) + "px";
            gameArea.style.height = (currentSize - 10) + "px";
          } else {
            // Увеличить размер объекта .knife
            pointer.style.height = "180px";
            gameArea.style.width = (currentSize + 10) + "px";
            gameArea.style.height = (currentSize + 10) + "px";
          }
        });
    
      // Обработчик события click на ноже
      mouseContainer.addEventListener("click", function(event) {
        
          if (event.target.id === "apple") {
              // Если произошло нажатие на объект с id "apple"
              AppleClean()
          } else {
              rotateKnife();
          }
    
          ckeck();
      });    
    
    
      setInitialKnifePosition();
    
    
    
      document.addEventListener("scroll", function() {
          var knifeRect = document.getElementById("knife").getBoundingClientRect();
          var appleRect = document.getElementById("apple").getBoundingClientRect();
          
          ckeck();
        });
    
      // APPLE Spawn
    
      function randomPosition(maxWidth, maxHeight) {
        var x = Math.floor(Math.random() * maxWidth);
        var y = Math.floor(Math.random() * maxHeight);
        return { x, y };
      }
    
      function isInsideGameArea(x, y, maxWidth, maxHeight) {
        return x >= 0 && x <= maxWidth && y >= 0 && y <= maxHeight;
      }
    
      function createApple() {
        var gameArea = document.getElementById('game-area');
        gameArea.style.display = 'block';
        var maxWidth = gameArea.offsetWidth - 20; // Ширина game-area минус ширина яблока
        var maxHeight = gameArea.offsetHeight - 20; // Высота game-area минус высота яблока
    
        var position = randomPosition(maxWidth, maxHeight);
        while (!isInsideGameArea(position.x, position.y, maxWidth, maxHeight)) {
          position = randomPosition(maxWidth, maxHeight);
        }
    
        var apple = document.getElementById('apple');
        apple.style.display = "block";
        apple.style.left = position.x + 'px';
        apple.style.top = "1";
    
        apple.style.animation = "none"; // Останавливаем текущую анимацию
        setTimeout(function() {
          apple.style.animation = "moveDown 2s linear infinite"; // Запускаем анимацию движения вниз
        }, 0.1 ); // Небольшая задержка для сброса анимации
      }




      document.body.style.animation = 'fallUp 1s forwards';
      document.body.removeChild(overlay);
      createApple(); // Вызов функции для создания яблока при загрузке страницы



      // Создаем список достижений
      var achievementList = document.createElement('div');
      achievementList.id = 'locktwo';
      achievementList.innerHTML = "Achievements:<br>";


      // Проверяем, была ли страница обновлена
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        // Если страница была обновлена, добавляем достижение "обновление"
        var achievement2 = document.createElement('div');
        achievement2.id = "subforum-row";
        achievement2.textContent = 'restart';
        achievementList.appendChild(achievement2);
      }

      if (localStorage.getItem('score') == 1) {
          // Добавляем достижение "запуск игры"
          var achievement1 = document.createElement('div');
          achievement1.id = "subforum-row";
          achievement1.textContent = 'startup';
          achievementList.appendChild(achievement1);
      } else {
        function randomach(achievementList) {
          const randomVariable = Math.floor(Math.random() * 100) + 1;

          if (localStorage.getItem('score') > randomVariable) {

            // Создаем массив с возможными действиями
            var actions = ['Wonderful','high','progress', randomVariable , 'exactly', localStorage.getItem('score')];

          } else {
            var actions = ['close','low','difficult'];


            if (localStorage.getItem('moved') === 'down') {
              var actions = ['flipped', 'rot', 'x'];
            } else {
              if (localStorage.getItem('moved') === null) {
                var actions = ['???', 'null'];
              }
            }

          }

          // Выбираем рандомное действие
          var randomAction = actions[Math.floor(Math.random() * actions.length)];

          var selectedAction = document.createElement('div');
          selectedAction.id = "subforum-row";
          selectedAction.textContent = randomAction;
          achievementList.appendChild(selectedAction);

          setTimeout(function() {
          
            achievementList.removeChild(selectedAction);
            randomach(achievementList);
            
          }, 1200);
        }

        randomach(achievementList);

      }


      // Добавляем список достижений на страницу
      document.body.appendChild(achievementList);


      var apple = document.getElementById("apple");
      var gameArea = document.getElementById("game-area");

      var knife = document.getElementById("knife");

      var vx = localStorage.getItem('score')%5; // Горизонтальная скорость
      var vy = 0; // Вертикальная скорость

      function gameover(knife, apple) {
        knife.style.animation = 'explode 0.5s linear';
        apple.style.animation = 'explode 0.5s linear';

        // Добавляем достижение "сломан"
        var achievement1 = document.getElementById("subforum-row");

        if (!achievement1) {
          achievement1 = document.createElement('div');
          achievement1.id = "subforum-row";
          achievement1.textContent = 'broke';
          achievementList.appendChild(achievement1);
        }

        
        // Добавляем текст на экран-смерти
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "100%";
        overlay.style.left = "100%";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "9999";

        // Добавляем текст на экран-смерти
        var text = document.createElement("p");
        text.innerHTML = `
        <br>
        <br>
        <br>
        <div id="game-menu">
          <h1> timeout ! </h1>
        </div>
        `;
        text.style.color = "white";
        text.style.fontSize = "24px";

        overlay.appendChild(text);

        document.body.appendChild(overlay)

        setTimeout(function() {
          knife.style.display = 'none';
          apple.style.display = 'none';

          achievementList.removeChild(achievement1);
          
          document.getElementById('game-area').classList.remove("revealing");

          window.location.reload(true);
        }, 2800);
      }

      function moveApple() {
        var x = parseInt(apple.style.left, 10);
        var y = parseInt(apple.style.top, 10);
        
        // Движение по горизонтали
        x += vx;
        
        // Движение по вертикали
        y += vy;
        
        // Обратное отскок при ударе об стенку
        if (x <= 0 || x >= gameArea.offsetWidth - apple.offsetWidth) {
          vx *= -1;

        }
        if (y <= 0 || y >= gameArea.offsetHeight - apple.offsetHeight) {
          vy *= -1;
        }


        let knifeY = document.getElementById('knife').getBoundingClientRect().y;
        let appleY = document.getElementById('apple').getBoundingClientRect().y;
        

        if (Math.abs(knifeY - appleY) < 1)  {
          x = x * x
          y = y * y
          gameover(knife, apple);
        } 

        apple.style.left = x + "px";
        apple.style.top = y + "px";
      }

      setInterval(moveApple, localStorage.getItem('score')%10); // Запуск движения объекта

    }
  });




  const cards = document.querySelectorAll("div");
  const wrapper = document.querySelector("#game-area");
  
  wrapper.addEventListener("mousemove", (event) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--xPos", `${x}px`);
      card.style.setProperty("--yPos", `${y}px`);
    });
  });


});