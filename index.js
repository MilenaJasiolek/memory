// Tablica ze ścieżkami do plików obrazków
const images = [
  "./images/bubu1.gif",
  "./images/bubu1.gif",
  "./images/bubu2.gif",
  "./images/bubu2.gif",
  "./images/bubu3.gif",
  "./images/bubu3.gif",
  "./images/bubu4.gif",
  "./images/bubu4.gif",
  "./images/bubududu1.gif",
  "./images/bubududu1.gif",
  "./images/bubududu2.gif",
  "./images/bubududu2.gif",
  "./images/dudu1.gif",
  "./images/dudu1.gif",
  "./images/dudu2.gif",
  "./images/dudu2.gif",
];

let attempts = 0;
// Szerokość i wysokość obrazków
const imageWidth = 80;
const imageHeight = 90;

// Zmienna, która kontroluje, czy można klikać na boxy
let canClick = true;

// Funkcja do tasowania tablicy
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
shuffleArray(images);

const gameContainer = document.querySelector(".game");

// zmienne do przechowywania klikniętych obrazków i liczby dopasowanych par
let selectedImages = [];
let matchedPairs = 0;

// Pętla tworząca elementy gry na podstawie tablicy obrazków
for (let i = 0; i < images.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  let image = document.createElement("img");
  image.src = images[i];
  image.width = imageWidth;
  image.height = imageHeight;
  image.classList.add("boxUnvisible");
  box.appendChild(image);
  gameContainer.appendChild(box);

  // Całkowita liczba par obrazków
  const totalPairs = images.length / 2;

  // Obsługa kliknięcia na box
  box.onclick = function () {
    if (!canClick) return; // Jeśli nie można kliknąć, wyjdź z funkcji
    const clickedImage = this.querySelector("img");
    const boxElement = this;

    // Sprawdzamy, czy można kliknąć na obrazek (czy jest ukryty lub nie jest dopasowany)
    if (
      clickedImage.classList.contains("boxUnvisible") &&
      selectedImages.length < 2
    ) {
      boxElement.style.transform = "rotateY(180deg)";
      // boxElement.style.backgroundColor = "rgb(218, 179, 195)";
      setTimeout(function () {
        clickedImage.classList.remove("boxUnvisible");
        clickedImage.classList.add("boxVisible");
      }, 200);
      selectedImages.push(clickedImage);

      if (selectedImages.length === 2) {
        // Blokuj kolejne kliknięcia podczas porównywania obrazków
        canClick = false;

        setTimeout(function () {
          const [firstImage, secondImage] = selectedImages;
          if (firstImage.src === secondImage.src) {
            // Jeśli obrazki są takie same, dodajemy im klasę "boxMatch"
            firstImage.classList.add("boxMatch");
            secondImage.classList.add("boxMatch");
            matchedPairs++;
            if (matchedPairs === totalPairs) {
              // Jeśli wszystkie pary zostały dopasowane, wyświetl komunikat "You win!"
              const winMessage = document.querySelector(".win-message");
              winMessage.style.display = "block";
            }
          } else {
            // Jeśli obrazki są różne, odwróć je z powrotem
            boxElement.style.transform = "rotateY(0deg)";
            firstImage.classList.remove("boxVisible");
            firstImage.classList.add("boxUnvisible");
            secondImage.classList.remove("boxVisible");
            secondImage.classList.add("boxUnvisible");
            // boxElement.style.backgroundColor = "rgb(67, 23, 41)";
          }
          selectedImages = [];
          canClick = true; // Odblokowanie kolejnych kliknięc po zakończeniu porównywania
          attempts++;
          updateAttemptsDisplay();
        }, 800);
      }
      // Reset gry
      const resetButton = document.getElementById("reset-button");
      resetButton.addEventListener("click", function () {
        // Ukrywamy div z komunikatem "You win!"
        const winMessage = document.querySelector(".win-message");
        winMessage.style.display = "none";

        // Tasujemy tablicę z obrazkami
        shuffleArray(images);

        // Resetujemy wszystkie obrazy do stanu początkowego
        const allImages = document.querySelectorAll(".item img");
        allImages.forEach((img) => {
          img.classList.remove("boxVisible", "boxMatch");
          img.classList.add("boxUnvisible");
        });

        // Resetujemy zmienne i liczniki
        canClick = true;
        selectedImages = [];
        matchedPairs = 0;
        updateAttemptsDisplay();
      });
      function updateAttemptsDisplay() {
        const attemptsDisplay = document.querySelector(
          ".attempts-display span"
        );
        attemptsDisplay.textContent = `${attempts}`;
      }
    }
  };
}
