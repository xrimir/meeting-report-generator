<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikacja do zebrań</title>
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="./images/favicon.png" type="image/x-icon">
</head>

<body>
    <!-- Lista działów w tablicy php. W oparciu ,którą są wyświelnane elementy -->
    <?php $divisions = array("Sprawy OgÓlne", "Spa", "Basen", "Animacje", "Ochrona", "Gastronomia", "Housekeeping", "Recepcja", "Techniczni", "Konferencja", "Marketing", "SiŁownia", "Szkolenia", "DziaŁ KsiĘgowoŚci", "DziaŁ IT"); ?>

    <main>
        <header class="main-heading">
            <h2 id="meeting">Zebranie z: <span id="data"><?php echo date("Y.m.d"); ?></span></h2>
        </header>
        <!-- Iteracja tablicy -> tworzenie sekcji w oparciu o nią -->
        <?php
        foreach ($divisions as $division) {
            echo '<fieldset class="container-fluid sections">
            <legend>' . strToUpper($division) . '</legend>';
            echo '<div class="form-row">
                <div class="textInput">
                    <textarea class="resize-control textareaInput" data-border="" cols="3" rows="5"  onkeydown="expandingTextarea(this)" maxlength="1400"></textarea><div class="micContainer" onClick="micListen(this)"><img class="mic" src="./images/mic.png"/></i></div>
                </div>
                <div class="options">
                <p class="infoFor" >Informacja dla: </p>
                <div class="select">
                    <select class="workers">
                     <option value=""disabled selected hidden>Wybierz... </option>
                     <option class="options">Osoba1</option>
                     <option class="options">Osoba2</option>
                     <option class="options">Osoba3</option>
                     <option class="options">Osoba4</option>
                     <option class="options">Osoba5</option>
                    </select>
                <div class="select_arrow">
                </div>
                </div>
                <form class="pickColorForm">
                    <div class="pickColor tooltip" data-color="#336699" onClick="addBorderToTextarea(this)"><span class="tooltiptext">Informacja</span></div>
                    <div class="pickColor tooltip" data-color="#ffff00" onClick="addBorderToTextarea(this)"><span class="tooltiptext">Ważne</span></div>
                    <div class="pickColor tooltip" data-color="#ff6633" onClick="addBorderToTextarea(this)"><span class="tooltiptext">Awaria</span></div>
                    <div class="pickColor tooltip" data-color="#99cc33" onClick="addBorderToTextarea(this)"><span class="tooltiptext">Pochwała</span></div>
                    <div class="pickColor tooltip" data-color="white" onClick="addBorderToTextarea(this)"><span class="tooltiptext">Wyczyść</span></div>
                </form>
                </div>
            </div><button class="addBtn" onclick="addText(this)"><span class="plusSign">+</span> Dodaj</button></fieldset>';
        }
        ?>
    </main>
    <div class="pdfBtnWrapper"><button id="pdfConvert">Konwertuj do pdf</button></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.min.js" integrity="sha512-gYUM+7JjtBqPPGOgwgOZ+NwjGl+11/EP124oB+ihjlBpLgP5LTh7R/Iwcdy//cgH+QzrjspBiJI5iUegTNww3w==" crossorigin="anonymous"></script>
    <script src="app.js"></script>
    <script src="convertToPdf.js"></script>
</body>

</html>