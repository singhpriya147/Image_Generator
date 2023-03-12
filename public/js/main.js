

function onSubmit(e){
e.preventDefault();
 


const prompt=document.querySelector('#prompt').value;
const size=document.querySelector('#size').value;

if(prompt===''){
 alert('please add some text');
 return ;
}

generateImageRequest(prompt,size);
}

generateImageRequest=async(prompt,size)=>{

try {
 showSpinner();
 const response=await fetch('/openai/generateimage',{
  method:"POST",
  headers:{
   "content-type":"application/json"
  },
  body:JSON.stringify({prompt,size}),
 });
 if(!response.ok){
  hideSpinner();
  throw new Error('that image could not be interpreted')
 }
 const data=await response.json();
 console.log(data);
  const imageUrl = data.data;
  document.querySelector('#image').src = imageUrl;

hideSpinner();


} catch (error) {
     document.querySelector('.msg').textContent = error;
}


 console.log(prompt,size);
}

// fucntiom to show spinner or hide

showSpinner=()=>{
 document.querySelector('.spinner').classList.add('show');
}
hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

document.querySelector('#image-form').addEventListener('submit',onSubmit);