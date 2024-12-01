
let user ={"username":"John","wallet":5000}
let cardList = [
        {
            id:3,
            family_name:"Marvel",
            img_src:"https://static.hitek.fr/img/actualite/2017/06/27/i_deadpool-2.jpg",
            name:"DEAD POOL",
            description: "Le convoi d'Ajax est attaqué par Deadpool. Il commence par massacrer les gardes à l'intérieur d'une voiture, avant de s'en prendre au reste du convoi. Après une longue escarmouche, où il est contraint de n'utiliser que les douze balles qu'il lui reste, Deadpool capture Ajax (dont le véritable nom est Francis, ce que Deadpool ne cesse de lui rappeler). Après l'intervention de Colossus et Negasonic venus empêcher Deadpool de causer plus de dégâts et le rallier à la cause des X-Men, Ajax parvient à s'échapper en retirant le sabre de son épaule. Il apprend par la même occasion la véritable identité de Deadpool : Wade Wilson.",
            hp: 999,
            energy:100,
            attack:15,
            defense: 15,
            price:250
        }
    ]

function onProcess(id){
    console.log(id)
}


function setCard(){
    setTemplate("#geneCard","#geneCardContent",cardList)
}


function setUserInfo(){
    document.getElementById("userNameId").innerHTML= user.username;
    document.getElementById("walletId").innerHTML= user.wallet;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userCardId = urlParams.get('id');

setUserInfo()
setCard()







