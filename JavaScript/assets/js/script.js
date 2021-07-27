var home = document.getElementById("home")
var About = document.getElementById("About")
var Contact = document.getElementById("Contact")
var addtocard = document.getElementById("addtocard")
var btnaddcard = document.getElementById("btnaddcard")

var content1 = document.getElementById("content1")
var content2 = document.getElementById("content2")
var content3 = document.getElementById("content3")
var content4 = document.getElementById("content4")



//-----------------------------nav bar -----------------------------//


home.addEventListener('click',function(){
    content1.style.display = "block"
    content2.style.display = "none"
    content3.style.display = "none"
    content4.style.display = "none"

    content.innerHTML="";
    homeContent();
    
})


About.addEventListener('click',function(){
    content2.style.display = "block"
    content1.style.display = "none"
    content3.style.display = "none"
    content4.style.display = "none"

})

Contact.addEventListener('click',function(){
    content3.style.display = "block"
    content2.style.display = "none"
    content1.style.display = "none"
    content4.style.display = "none"

})

function caller(){
    content1.style.display = "block"
    content2.style.display = "none"
    content3.style.display = "none"
    content4.style.display = "none"

}
caller()

btnaddcard.addEventListener('click',()=>{
    content3.style.display = "none"
    content2.style.display = "none"
    content1.style.display = "none"
    content4.style.display = "block"

})



//-----------------------------Home-----------------------------//
var userApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/products"
homeContent()
function homeContent(){
    var xhr=new XMLHttpRequest();
    xhr.open('GET',userApi )
    xhr.send();
    xhr.onload=function(){
    var dataa = xhr.response;
    var users=JSON.parse(dataa).data;
    console.log(users)

    
    users.forEach(i => {
        const divEl=document.createElement('a')
        const divEll=document.createElement('div')
        const imgeEl = document.createElement('img')
        const nameEl = document.createElement('h2')
        const priceEl = document.createElement('h6')
        var addto = document.createElement('button')

        
        addto.addEventListener("click",()=>{
            cardnumber(i)
        })


        function cardnumber(productdetails){

            let productnumber = localStorage.getItem('cart number')
            productnumber=Number(productnumber)  

            if(productnumber){
                localStorage.setItem('cart number' , productnumber + 1 )
                document.getElementById("addtocard").textContent = productnumber + 1 ;
            }else{
                localStorage.setItem('cart number' , 1 )
                document.getElementById("addtocard").textContent =  1 ;
            }

            setitmes(productdetails)
        
        }


        function setitmes(pro){
            
            const divvEll=document.createElement('div')
            const imgeeEl = document.createElement('img')
            const priceeEl = document.createElement('h6')
            const nameeEl = document.createElement('h2')


            nameeEl.innerText=`${pro.Name}`;
            imgeeEl.src=pro.ProductPicUrl;
            priceeEl.innerText=`$ ${pro.Price}`;


            divvEll.appendChild(nameeEl)
            divvEll.appendChild(imgeeEl)
            divvEll.appendChild(priceeEl)

            content4.appendChild(divvEll)


        }
        
        

        imgeEl.src=i.ProductPicUrl;
        nameEl.innerText=`${i.Name}`;
        priceEl.innerText=`$ ${i.Price}`;
        addto.innerHTML='add to card'
        addto.type = "button"


        divEl.appendChild(nameEl)
        divEll.appendChild(imgeEl)
        divEl.appendChild(priceEl)
        divEl.appendChild(addto)



        divEl.classList.add("disEl")
        priceEl.classList.add("priceEl")
        imgeEl.classList.add("imgproduct")
        nameEl.classList.add("texth2")
        addto.classList.add("addto")

 
        divEl.appendChild(divEll)
        content.appendChild(divEl)
        var a=i.ProductId


        divEll.addEventListener('click',function(){
            var xhr2=new XMLHttpRequest();
            
            xhr2.open('GET',"https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+ a +"")
            xhr2.send();
            
            let template='';
            xhr2.onload=function(){
                var data2=xhr2.response
                var id=JSON.parse(data2).data
                console.log(id)

                template+=`
                    <div class="singleProduct">

                        <div class="Product">
                            <img src="${id.ProductPicUrl}" alt="img">
                        </div>

                        <div class="details">
                            <h6 style="opacity: 50%;">Accessories</h6>
                            <h3>${id.Name}</h3>
                            <p>${id.Description}</p>
                        </div>


                        <div class="price">
                            <h6 >${id.Status}<span  style="color: red;">: in stock </span></h6> <hr>
                            <span style="margin-top: 10px; color: red;" class="sizeprice">$ ${i.Price}</span><br>
                            <span >Quantity:</span><br>
                            <input type="text" class="form-control"><br>
                            <button class="btn btn-secondary btn-lg disabled"> <i class="fas fa-cart-plus"></i>

                             Add to cart</button>
                        </div>

                    </div>
                
                `  
                content.innerHTML=template ;
            }
            
        })       
    });    
}
}



function onloaded(){
    let productnumber = localStorage.getItem('cart number')
    if (productnumber){
        document.getElementById("addtocard").textContent = productnumber  ;
    }
}

onloaded()









//-----------------------------Contact Us-----------------------------//

var userApi2= "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us"

const addUserForm = document.getElementById("addUserForm");

addUserForm.addEventListener('submit',(e)=>{
    e.preventDefault();

var namecustmers=document.getElementById("namecustmer");
var emailcustmers = document.getElementById("emailcustmer");
var Subjects=document.getElementById("Subject");
var Massages=document.getElementById("Massage");

 const datacustmer={
    name : namecustmers.value,
    email : emailcustmers.value,
    subject : Subjects.value,
    message : Massages.value,
 };
 

  // Send request

 var xhrsend=new XMLHttpRequest();
 xhrsend.open("post",userApi2 )
 xhrsend.setRequestHeader("Content-Type", "application/json");
 xhrsend.send(JSON.stringify(datacustmer))

 console.log(xhrsend.response);
  // Recieve Response and reset the form

 xhrsend.onload =function(){
    console.log("request accepted" );
    addUserForm.reset();
 }



})





