"use strict";
function genPDF() {
  /**
   * ================ IMPORT CZCIONEK ==================
   */
  pdfMake.fonts = {
    Roboto: {
      normal:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
      bold:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    },
  };

  const sections = [...document.querySelectorAll(".sections")];
  const sectionsLength = sections.length;
  const meetingTitle = document.getElementById("meeting").textContent;

  const result = {
    content: [{ text: meetingTitle, style: "header" }],
    styles: {
      header: { fontSize: 20, margin: [0, 0, 0, 20] },
      tableHeader: { margin: [0, 0, 0, 0] },
      table: { margin: [0, 0, 0, 20] },
      worker: {
        fontSize: 9,
        characterSpacing: 0.5,
        color: "#424a49",
        pageBreak: "after",
      },
      text: { characterSpacing: 0.6, fontSize: 12, color: "#424a49" },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  /// Sprawdzanie sekcji która posiada zawartość
  for (let i = 0; i < sectionsLength; i++) {
    let tableContent = [];
    if (sections[i].children[1].children[0].children[0].value !== "") {
      tableContent = [
        [
          {
            text: sections[i].children[0].textContent,
            style: "tableHeader",
            colSpan: 2,
            alignment: "center",
          },
          {},
        ],
      ];
      for (let j = 1; j <= sections[i].children.length - 2; j++) {
        let textValue = sections[i].children[
          j
        ].children[0].children[0].value.trim();
        if (textValue === "") {
          continue;
        } else {
          let color =
            sections[i].children[j].children[0].children[0].dataset.border;
          let worker =
            sections[i].children[j].children[1].children[1].children[0].value;
          tableContent.push(
            [
              {
                text: "",
                border: [true, true, true, true],
                fillColor: color,
                rowSpan: 2,
              },
              { text: textValue, style: "text" },
            ],
            [
              {},
              {
                text: worker ? `Przydzielona osoba: ${worker}` : "",
                style: "worker",
              },
            ]
          );
          tableContent.push([
            { text: "", colSpan: 2, margin: [1, 1, 1, 1] },
            {},
          ]);
        }
      }
      result.content.push({
        style: "table",
        table: {
          widths: [20, 470],
          heights: [0, 70],
          body: tableContent,
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 1 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths.length ? 1 : 1;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths.length ? "black" : "gray";
          },
        },
      });
    }
  }
  pdfMake.createPdf(result).download();
}
const pdfDownloadBtn = document.getElementById("pdfConvert");
pdfDownloadBtn.addEventListener("click", genPDF);
