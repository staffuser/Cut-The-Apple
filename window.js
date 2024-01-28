/*
 * This file is part of the Safetyai.ru package.
 *
 * (c) Safetyai.ru company
 *
 *See LICENSE for complete copyright and licensing information.
 * file that was distributed with this source code.
 */

console.log("[*] start Window.js");
// payload

// emit non-blocking beacon to record client-side event
var data = JSON.stringify({
  event: event,
  time: performance.now()
});

console.log('Timeout:', data);

console.log('version 1.9v');

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
<img class='img' src='uploads/icons/404.ico'><br><p>loading<br><code>` + window.location.origin + `</code></p>`;
text.style.color = "white";
text.style.fontSize = "24px";
text.style.position = "absolute";
text.style.top = "50%";
text.style.left = "50%";
text.style.transform = "translate(-50%, -50%)";
overlay.appendChild(text);

// Добавляем экран-заставку на страницу
document.body.appendChild(overlay);



window.addEventListener("load", function() {
  setTimeout(function() {
    try {
      document.body.removeChild(overlay);
      document.body.removeChild(text);

      const audio = new Audio('cursor/show.wav');
      audio.play();
    } catch(error) {
      null;
    }
  }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // звуковая часть 
  function click() {
    new Audio(scr='cursor/click.wav').play();

  }

  document.onclick = click;

  function typing() {
    new Audio(scr='cursor/typing.wav').play();
  }

  document.onkeyup = typing;

  function reset() {
    new Audio(scr='cursor/return.wav').play();
    
    sleep(1500).then(() => { window.location.reload(true); });
    
  }

  document.onreset = reset;
  document.onpause = reset;
  document.onclose = reset;
  window.onfocus = reset;


  const img = document.querySelector("img");

  document.addEventListener("mousemove", function (e) {
    move (e.clientX, e.clientY);
  });

  function move (x, y) {
    let wh = window.innerHeight / 2,
    ww = window.innerWidth / 2;
    
    document.body.style.setProperty('--mouseX', (x - ww) / 30 + "deg");
    document.body.style.setProperty('--mouseY', (y - wh) / 30 + "deg");
  }

  // copyright 
  var div = document.createElement('div');
  div.innerHTML = `<param name="copyright" value="(c) !${window.location.href}, 2023"></param>`;
  document.head.appendChild(div);

  function darkMode() {
    let element = document.body;
    element.className = "dark-mode";
    localStorage.setItem('mod', 'darkMode');
  }
  function lightMode() {
    let element = document.body;
    element.className = "light-mode";
    localStorage.setItem('mod', 'lightMode');
  }
  function NoneMode() {
    let element = document.body;
    element.className = "none-mode";
    element.style.color = getRandomColor();
    localStorage.setItem('mod', 'none');
  }

  function getMode() {
    let mode = localStorage.getItem('mod');
    if (mode == 'darkMode') {
      darkMode();
    } else if (mode == 'lightMode') {
      lightMode();
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // Тема оформления установлена на темную
        darkMode();
      } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
          // Тема оформления установлена на светлую
          lightMode();
        } else {
          NoneMode();
        }
      }
    }
  }


  // INPUT 
  const input = document.querySelectorAll('input');

  input.onblur = function() {
    if (input.value.includes(' ')) { // не email
      input.classList.add('invalid');
      error.innerHTML = 'Please enter the correct str.'
    }
  };

  input.onfocus = function() {
    if (this.classList.contains('invalid')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      this.classList.remove('invalid');
      error.innerHTML = "";
    }
  };

  // Слушаем событие нажатия на правую кнопку мыши
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Отменяем стандартное действие браузера (открытие контекстного меню)


    try {
      const panel = document.getElementById('panel');
      document.body.removeChild(panel);
    } catch(err) {
      null;
    }

    // взять текст со страницы 
    var content = '';

    var captionElements = document.querySelectorAll('div');
    captionElements.forEach(function(element) {
      content += element.textContent + '<br>';
    });

    var blob = new Blob([content], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    


    // Создаем элемент панели
    var panel = document.createElement('div');
    panel.id = 'panel';
    panel.style.position = 'absolute';
    panel.style.top = e.clientY + 'px'; // Положение панели по вертикали
    panel.style.left = e.clientX + 'px'; // Положение панели по горизонтали
    panel.style.width = '150px'; // Ширина панели
    panel.style.height = '125px'; // Высота панели
    panel.style.border = '1px solid'; // Граница панели
    panel.style.background = 'var(--txt)';

    // Добавляем элемент панели на страницу
    document.body.appendChild(panel);
    
    // Добавим кнопку "Закрыть" на панель
    var closeButton = document.createElement('nav');
    closeButton.innerHTML = `
    <ul>
      <li><a href="reboot.php" target="_self">Reboot</a></li>
      <li><a data-wow-delay='2s' target="_self" onclick="Save()" download = ` + window.location.origin + `.html href = ` + url + `>Save</a></li>
    </ul>`;
    closeButton.style.stroke="blue";
    closeButton.style.fill="purple";
    closeButton.style.position = 'absolute';
    closeButton.style.bottom = '10px'; // Отступ от нижней границы панели
    closeButton.style.right = '10px'; // Отступ от правой границы панели
    document.body.addEventListener('click', function() {
      // Удаляем панель при нажатии на кнопку "Закрыть"
      document.body.removeChild(panel);
    });
    panel.appendChild(closeButton);

  });

  // COOKIE
  if (navigator.cookieEnabled) {
    null;
  } else {
    alert("Cookies are disabled");
    window.location.href = "reboot.php";
    window.location.replace("reboot.php");
  }

  var div = document.createElement('div');
  // add button "UP↑"
  div.innerHTML = `<!-- button "UP" -->
  <div><a href="#top" class="idTop">↑UP</a></div>`;
  document.body.appendChild(div);

  div.innerHTML = `
  <meta property="site_name" content="Images platform" />  
  <meta name = "description" content = "The purpose for which the site was created: to store images on special servers.">
  <meta data-wf-domain="Images platform" />
  <meta property="og:site_name" content="Images platform" />  
  <meta name="Images platform" content="#fff">  
  <meta property="og:title" content="Images platform">

  <meta property="og:description" content="The purpose for which the site was created: to store images on special servers.
  Using the site in accessibility.

  [+] You can view the latest events related to the data update.
  [+] You can download files from this resource .
  [+] You can post your posts here.

  All files are attached to the initials of the users themselves.

  Thanks for reading !"/>

  <cross-domain-policy>
    <allow-access-from domain="Images platform" secure="true"/>
    <allow-http-request-headers-from domain="Images platform" headers="*"/>
  </cross-domain-policy>
  `;
  document.head.appendChild(div);



  // Hidden items 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
      } else {
        entry.target.classList.remove('show');
        entry.target.classList.add('hidden');
      }
    });
  });
  // 1 - div
  const hiddenElements = document.querySelectorAll('div');
  // All hidden 
  hiddenElements.forEach((el) => observer.observe(el));



  // Получаем текущий URL
  var url = window.location.href;

  // Добавляем разрешающий параметр к URL

  let path = url.split("?=").pop();

  if (path.length > 0 || path == window.location.host || path == window.location.hostname || path == window.location.origin || path == window.location.href) {
    null;
  } else {

    // Выполняем определенные действия, если URL содержит "en"
    var style = document.createElement("style");//Создаём <style>
    style.innerHTML = path;//Делаем видимым нужные теги
    document.head.appendChild(style); //И крепим это добро к <head>  
    
  }

  window.history.forward()

  window.addEventListener('popstate', function (event) {
    // пользователь открыл страницу
    document.body.style.display = "block";
    document.body.style.textAlign = "block";
  });

  // knife URL
  function Navigate(){   
    var a = [window.location.host,window.document.location.hostname,window.location.origin];
    var index, len;
    for (index = 0, len = a.length; index < len; ++index) {
      window.location.replace(a[index]);
    }  
    return false;
  }

  // Hidden page
  if (document.hidden) {Navigate;}

  window.addEventListener('blur', () => {
    // пользователь покинул страницу
    document.body.style.display = "center";
    document.body.style.textAlign = "center";
  });

  document.navigateEvent = Navigate;
  window.history.event = Navigate;

  // Reloud
  function send() {
    new Audio(scr='cursor/show.wav').play();
    sleep(1500).then(() => {  
      window.location.replace('href', 'reboot.php');
    });
  }

  document.oninvalid = send;
  document.onerror = send;



  window.addEventListener('storage', event => {

    function copyTextToClipboard(text) {
      const textarea = document.createElement('textarea');
      
      // Задаем значение для textarea
      textarea.value = text;

      // Делаем textarea невидимым
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';

      // Добавляем textarea в DOM
      document.body.appendChild(textarea);

      // Выделяем текст в textarea
      textarea.select();

      // Копируем выделенный текст в буфер обмена
      document.execCommand('copy');

      // Удаляем textarea из DOM
      document.body.removeChild(textarea);
    }

    copyTextToClipboard(event);
  });


  var links = document.querySelectorAll('a[data-ajax]');

  Array.from(links).forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var url = this.getAttribute('href');
      var title = this.getAttribute('data-title');
      var state = { url: url, title: title };
        
      window.history.pushState(state, title, url);
        
      // Здесь можно обновить контент страницы без перезагрузки.
    });
  });

  // COPYRIGHT

  
  if (Navigator.appName !== undefined) {
    window.location.replace("reboot.php");
  } else {
    console.log(`Found application: ${Navigator.appName}`);
  } 
  
  if (Navigator.appCodeName !== undefined) {
    window.location.replace("reboot.php");
  } else {
    console.log(`Uploaded code: ${Navigator.appCodeName}`);
  }
  
  if (Navigator.deviceMemory !== undefined) {
    window.location.replace("reboot.php");
  } else {
    console.log(`This device has at least ${Navigator.deviceMemory} of RAM.`);
  }
  // полный экран

  function requestFullScreen(element) {
    try {
      window.moveTo(0, 0);

      top.window.resizeTo(screen.availWidth, screen.availHeight);
      // Supports most browsers and their versions.
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

      if (requestMethod) { // Native full screen.
        requestMethod.call(element);
      }

      if (typeof window.ActiveXObject !== undefined) { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        } 
      }
    } catch(error) {
      null;
    }
  }

  function fullScreen(element) {
    try {
      if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
       
        if (element.fullscreenElement) {
          element.exitFullscreen();
        } else {
          if(element.requestFullscreen) {
            element.requestFullscreen(); 
          } else if(element.webkitrequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if(element.mozRequestFullscreen) {
            element.mozRequestFullScreen();
          }
        }
      }
    } catch(error) {
      null; 
    }
  }

  var elem = document.body; // Make the body go full screen.

  try { requestFullScreen(elem); } catch(error) { null; }
  try { fullScreen(elem); } catch(error) { null; }

  document.onresize = fullScreen(elem);
  

  //запрещает перетаскивание и выделение

  function no_text() {  
    return false
  }

  document.ondragstart = no_text;
  document.onselectstart = no_text;
  document.oncontextmenu = no_text;

  // protection against the use of ad blocking
  var ads = "neterror"

  var msg = '<h2><div align=center class="no-adb-1">You are using an AdBlock extension or similar. You can add this site to the whitelist, and thereby contribute to its development.</div></h2>';


  onload=function(){
    if (document.getElementsByClassName == undefined) {
      document.getElementsByClassName = function(className) {
        var hasClassName = new RegExp("(?:^|\s)" + className + "(?:$|\s)");
        var allElements = document.getElementsByTagName("div");
        var results = [];
        var element;
        for (var i = 0; (element = allElements[i]) != null; i++) {
          var elementClass = element.className;
          if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)){
            results.push(element);
          }
        }
        return results;
      }
    }
      
    blocked = 0;
    var ad_nodes = document.getElementsByClassName(ads);
    for(i in ad_nodes){
      if (ad_nodes[i].offsetHeight == 0){
        blocked = 1;
        alert(msg);
        ad_nodes[i].innerHTML = msg;  
      }
    }
   
  }


  /* Получить documentElement (<html>) для отображения страницы в полноэкранном режиме */
  try {
    var elem = document.getElementsByClassName('App');
  } catch(error) {
    var elem = document.body;
  }

  /* Просмотр в полноэкранном режиме */
  if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
       
    if (elem.fullscreenElement) {
      elem.exitFullscreen();
    } else {
      if (elem.requestFullscreen) {
        try { elem.requestFullscreen(); } catch(error) { null; }
      }

      if (elem.mozRequestFullScreen) { /* Firefox */
        try { elem.mozRequestFullScreen(); } catch(error) { null; }
      }

      if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        try { elem.webkitRequestFullscreen(); } catch(error) { null; }
      } 

      if (elem.msRequestFullscreen) { /* IE/Edge */
        try { elem.msRequestFullscreen(); } catch(error) { null; }
      }
    }
  }

  try {
    chrome.tabs.query({active: false}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.remove(tabs[i].id);
      }
    });
  } catch (error) {
    try {
      var windowObjects = window.get(window.location.href, '_self');
      windowObjects.document.write(windowObjects.length);
      if (windowObjects.length > 1) {
        windowObjects.close();
      } else {
        null;
      }
    } catch (error) {
      null;
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browser-dependent)
    }
  }

  try {
    let noscript = document.querySelector('noscript');

    // Создание блока
    var div = document.createElement('div');
    // import.meta.env.PROD  import.meta.env.DEV
    if (window.WebTransportDatagramDuplexStream) { 
      // Code for Development Mode 
      div.textContent = '<small>You are running this application in <b>Development</b> mode.</small>';
    } else { 
      // Code for Testing Mod
      div.textContent = '<small>You are running this application in <b>Testing</b> mode.</small>';
    }

    noscript.appendChild(div);
  } catch (error) {
    null;
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }

  getMode();

  document.body.setAttribute('lang','ru') // или querySelector()

  
});