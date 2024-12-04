const betuk = ['A', 'B', 'C', 'D'];
let duplaz_betu = [...betuk, ...betuk]; 
let kivalasztottKartyak = [];  
let kartyakForgatva = [];  
let kivalasztottParok = [];  
let animacioFolyamatban = false;  

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
        
        if (animacioFolyamatban || kartyakForgatva.includes(i) || kivalasztottParok.includes(i)) {
            return;
        }


        document.getElementsByClassName("kartya")[i].style.transform = "rotateY(180deg)";
        document.getElementsByClassName("kartya-inner")[i].style.transform = "rotateY(180deg)";
        
        kivalasztottKartyak.push(i);
        kartyakForgatva.push(i); 
        
        if (kivalasztottKartyak.length == 2) {
            animacioFolyamatban = true; 

            let [kartya1, kartya2] = kivalasztottKartyak;
        
            if (duplaz_betu[kartya1] == duplaz_betu[kartya2]) {
                kivalasztottParok.push(kartya1, kartya2);
                
                kivalasztottKartyak = []; 
                
                
                setTimeout(() => {
                   
                    kartyakForgatva = kartyakForgatva.filter(index => index != kartya1 && index != kartya2);
                    animacioFolyamatban = false; 
                }, 1000);  
            } else {
                
                setTimeout(() => {
                    
                    document.getElementsByClassName("kartya")[kartya1].style.transform = "rotateY(0deg)";
                    document.getElementsByClassName("kartya-inner")[kartya1].style.transform = "rotateY(0deg)";
                    document.getElementsByClassName("kartya")[kartya2].style.transform = "rotateY(0deg)";
                    document.getElementsByClassName("kartya-inner")[kartya2].style.transform = "rotateY(0deg)";
                
                    kartyakForgatva = kartyakForgatva.filter(index => index != kartya1 && index != kartya2);
                    
                    animacioFolyamatban = false; 
                }, 1000);  
            }
            
            setTimeout(() => {
                kivalasztottKartyak = [];
            }, 1000);
        }
    });
}
