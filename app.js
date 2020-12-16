"use strict";
class SentenceMethods {
  constructor(text) {
    this.text = text;
    /// Jeżeli chcesz dodać jakiś spójnik (który sie NIE ODMIENIA co ważne to dopisz go do tablicy)
    this.keywords = [
      "kiedy",
      "więc",
      "ponieważ",
      "dlatego",
      "aby",
      "zatem",
      "żeby",
      "że",
    ];
  }
  /// Iterator tablicy ze znakami interpunkcyjnymi nieodmiennymi
  grammerAdder() {
    for (let i = 0; i < this.keywords.length; i++) {
      let regex = new RegExp(this.keywords[i], "g");
      this.text = this.text.replace(regex, ",$&");
    }
  }
  punctuationAdder() {
    this.text = this.text.replace(/spacja/g, " ");
    this.text = this.text.replace(/kropka/g, ".");
    this.text = this.text.replace(/enter/g, "\n");
    this.text = this.text.replace(/któr[a-z]{1}/g, " ,$&");
    this.text = this.text.replace(/(p|P)an/g, (v) => {
      return v.charAt(0).toUpperCase() + v.slice(1);
    });
    this.text = this.text.replace(/(p|P)aństw[a-z]{1}/g, (v) => {
      return v.charAt(0).toUpperCase() + v.slice(1);
    });
    this.text = this.text.replace(
      /([!?.]\s+)([a-z])/g,
      (m, $1, $2) => $1 + $2.toUpperCase()
    );
  }
}
const addBtn = [...document.getElementsByClassName("addBtn")];
const wholeElement = `<div class="form-row">
  <div class="textInput">
    <textarea class="resize-control textareaInput" data-border="" cols="3" rows="5"  onkeydown="expandingTextarea(this)" maxlength="1400"></textarea><div class="micContainer" onClick="micListen(this)"><img class="mic" src="./images/mic.png"/></div>
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
  </div>`;
/// Obsługa rozszerzania pola textarea
function expandingTextarea(param) {
  const el = param;
  setTimeout(() => {
    el.style.cssText = "height:auto; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
}
/// Obsługa dodawania obramowania dookoła borderu
function addBorderToTextarea(param) {
  const color = param.dataset.color;
  let textfieldBorder =
    param.parentNode.parentNode.parentNode.children[0].children[0];
  textfieldBorder.setAttribute("data-border", color);
}

// Obsługa przycisku dodaj
function addText(param) {
  param.insertAdjacentHTML("beforebegin", wholeElement);
}

/**
 * ------ Główna funkcja wywołująca webspeech oraz modyfikacje tekstu ----
 */
const micListen = (param) => {
  let recognition = new webkitSpeechRecognition();
  let textarea = param.parentNode.children[0];
  textarea.focus();
  recognition.start();
  recognition.lang = "pl-PL";
  recognition.onresult = (e) => {
    let sentence = new SentenceMethods(e.results[0][0].transcript);
    sentence.punctuationAdder();
    sentence.grammerAdder();
    textarea.value += " " + sentence.text;
  };
};
