let innerUploadImg=document.querySelector(".innerUploadImg");
let input=innerUploadImg.querySelector("input");
let btn=document.querySelector("#btn");

let output=document.querySelector(".output");
let text=document.querySelector("#text");
let loading=document.querySelector("#loading");

innerUploadImg.addEventListener("click",()=>{
    input.click();
});

// generate api contact 
const apiURL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA5S28s5aLDdvLdYTLa9Ke1Vr8tLN-hSJI";
let fileDetails={
    "mime_type":null,
    "data":null
}
async function generateResponse(){
    const requstOption={
        method:"POST",
        Headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
        "contents": [{
        "parts":[
          {"text": "Solve the mathematical problem with proper steps of solution"},
          {
            "inline_data": {
              "mime_type":fileDetails.mime_type,
              "data": fileDetails.data,
            }
          }
        ]
      }]
    })
    }

   try{
    let response=await fetch(apiURL,requstOption)
    let data=await response.json();
    let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
    
    text.innerHTML=apiResponse;
    output.style.display="block";
   }catch(error){
    alert(error);
   }
   finally{
    loading.style.display="none";
   }
}

// image url/src
let image=document.querySelector("#image");

input.addEventListener("change",()=>{
    const file=input.files[0];

    if(!file)return
    let reader=new FileReader();
    reader.onload=(e)=>{
        let base64Data=e.target.result.split(",")[1];
        fileDetails.mime_type=file.type;
        fileDetails.data=base64Data;

        // image and span display 
        innerUploadImg.querySelector("span").style.display="none";
        innerUploadImg.querySelector("#icon").style.display="none";
        image.style.display="block";
        image.src=`data:${fileDetails.mime_type};base64,${fileDetails.data}`; 
        output.style.display="none"; 
    }

    
    reader.readAsDataURL(file);
})

// btn function 
btn.addEventListener("click",()=>{
    generateResponse();
    loading.style.display="block";
})