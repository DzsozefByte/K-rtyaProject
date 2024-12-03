const betuk = ['A', 'B', 'C', 'D'];
let duplaz_betu = [...betuk, ...betuk]; 
let kivalasztottKartyak = [];  // Tárolja a megfordított kártyák indexeit
let kartyakForgatva = [];  // Nyilvántartja a megfordított kártyákat
let kivalasztottParok = [];  // Tárolja az egyező kártyák indexeit, hogy ne lehessen rájuk kattintani

function kever(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

kever(duplaz_betu);

for (let i = 0; i < 8; i++) {
    document.getElementsByClassName("kartya-hata")[i].innerHTML = duplaz_betu[i];
    
    document.getElementsByClassName("kartya")[i].addEventListener('click', function() {
        // Ha a kártya nem lett még megfordítva és nincs két kártya kiválasztva,
        // és a kártya nem tartozik az egyező párhoz
        
        if (!kartyakForgatva.includes(i) && kivalasztottKartyak.length < 2 && !kivalasztottParok.includes(i)) {
            // Megfordítjuk a kártyát
            document.getElementsByClassName("kartya")[i].style.transform = "rotateY(180deg)";
            document.getElementsByClassName("kartya-inner")[i].style.transform = "rotateY(180deg)";
            
            // Hozzáadjuk a kártyát a kiválasztottakhoz
            kivalasztottKartyak.push(i);
            kartyakForgatva.push(i);  // Nyilvántartjuk, hogy a kártya már meg lett fordítva
            console.log("Kiválasztot kartyak: ",kivalasztottKartyak);
            console.log("Kartyak forgatva: ",kartyakForgatva);
            if (kivalasztottKartyak.length === 2) {
                // Két kártya megfordítva, vizsgáljuk, hogy megegyeznek-e
                let [kartya1, kartya2] = kivalasztottKartyak;
                
                // Ha a két kártya megegyezik, akkor nem fordítjuk vissza őket, és hozzáadjuk őket a kivalasztottParokhoz
                if (duplaz_betu[kartya1] === duplaz_betu[kartya2]) {
                    // Ha megegyeznek, ne lehessen rájuk kattintani többé
                    kivalasztottParok.push(kartya1, kartya2);
                    // Kártyák nem fordulnak vissza
                    kivalasztottKartyak = []; // Reseteljük a kiválasztott kártyákat
                } else {
                    // Ha a két kártya különbözik, akkor visszafordítjuk őket
                    setTimeout(() => {
                        // Visszafordítjuk a kártyákat
                        document.getElementsByClassName("kartya")[kartya1].style.transform = "rotateY(0deg)";
                        document.getElementsByClassName("kartya-inner")[kartya1].style.transform = "rotateY(0deg)";
                        document.getElementsByClassName("kartya")[kartya2].style.transform = "rotateY(0deg)";
                        document.getElementsByClassName("kartya-inner")[kartya2].style.transform = "rotateY(0deg)";
                        
                        // Kártyák újra kattinthatóak legyenek
                        kartyakForgatva = kartyakForgatva.filter(index => index !== kartya1 && index !== kartya2);
                    }, 1000);  // 1 másodperces késleltetés
                }
                
                // Mindkét kártyát reseteljük, hogy újra választhassunk
                setTimeout(() => {
                    kivalasztottKartyak = [];
                }, 1000);
            }
        }
    });
}
