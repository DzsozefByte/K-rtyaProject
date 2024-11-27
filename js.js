const kartyak = document.querySelectorAll('.kartya');
let forditott = [];
let kitalaltkartyak = 0;

const betuk = ['A', 'B', 'C', 'D'];
let duplaz_betu = [...betuk, ...betuk]; 

function kever(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function kezd() {
    kever(duplaz_betu); 

    kartyak.forEach((kartya, index) => {
        kartya.textContent = ''; 
        kartya.dataset.letter = duplaz_betu[index]; 
        kartya.addEventListener('click', () => fordul(kartya)); 
    });
}

function fordul(kartya) {
    if (forditott.length === 2 || kartya.classList.contains('fordult')) return;

    kartya.classList.add('fordult');
    kartya.textContent = kartya.dataset.letter;
    forditott.push(kartya);

    if (forditott.length === 2) {
        talalat();
    }
}

function talalat() {
    const [elso, masodik] = forditott;

    if (elso.dataset.letter === masodik.dataset.letter) {
        kitalaltkartyak++;
        forditott = [];
        if (kitalaltkartyak === betuk.length) {
            alert('Nyertél!');
        }
    } else {
        
        setTimeout(() => {
            elso.classList.remove('fordult');
            masodik.classList.remove('fordult');
            elso.textContent = '';
            masodik.textContent = '';
            forditott = [];
        }, 1000);
    }
}

window.onload = kezd;
