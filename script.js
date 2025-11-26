const texto = document.getElementById('inputText');
const countCaracterTotal = document.getElementById('charCount');
const countCaracterNoEspacio = document.getElementById('charNoSpace');
const countPalabras = document.getElementById('wordCount');
const countOraciones = document.getElementById('sentenceCount');
const countParrafo = document.getElementById('paragraphCount');
const TiempoLectura = document.getElementById('readTime');

const BotonEjemplo = document.getElementById('sampleBtn');
const BotonLimpiar = document.getElementById('clearBtn');

function countCharacters(text){ return text.length; }
function countCharactersNoSpaces(text){ return text.replace(/\s/g,'').length; }
function countWords(text){
  const trimmed = text.trim();
  if(!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}
function countSentences(text){
  if(!text.trim()) return 0;
  const parts = text.match(/[^.!?]+[.!?]*/g);
  if(!parts) return 0;
  return parts.map(p => p.trim()).filter(Boolean).length;
}
function countParagraphs(text){
  if(!text.trim()) return 0;
  const parts = text.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  return parts.length;
}
function estimateReadTime(words, wpm = 200){
  if(words <= 0) return '0s';
  const totalSeconds = Math.round((words / wpm) * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return mins ? `${mins}m ${secs}s` : `${secs}s`;
}

function updateCounts(){
  const text = texto.value || '';
  const chars = countCharacters(text);
  const charsNoSpace = countCharactersNoSpaces(text);
  const words = countWords(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);

  countCaracterTotal.textContent = chars.toLocaleString();
  countCaracterNoEspacio.textContent = charsNoSpace.toLocaleString();
  countPalabras.textContent = words.toLocaleString();
  countOraciones.textContent = sentences.toLocaleString();
  countParrafo.textContent = paragraphs.toLocaleString();
  TiempoLectura.textContent = estimateReadTime(words, 200);
}

// eventos
texto.addEventListener('input', updateCounts);

BotonEjemplo.addEventListener('click', () => {
  texto.value = `Un ejemplo breve para probar el contador.
Este párrafo contiene varias oraciones. Funciona con signos de interrogación: ¿cómo va?

Aquí hay otro párrafo.`;
  updateCounts();
  texto.focus();
});

BotonLimpiar.addEventListener('click', () => {
  texto.value = '';
  updateCounts();
  texto.focus();
});

// inicializar
updateCounts();