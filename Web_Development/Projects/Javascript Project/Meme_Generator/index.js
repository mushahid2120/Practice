const meme_generateBtn=document.querySelector('.generate');
const meme_title=document.querySelector('.meme-title');
const meme_img=document.querySelector('.figure>img');
const meme_author=document.querySelector('.author');

generatingImg();

meme_generateBtn.addEventListener('click',(e)=>{
                                            generatingImg();
})

function generatingImg(){
    fetch('https://meme-api.com/gimme/wholesomememes')
    .then((res)=>res.json())
    .then((data)=>{
                        console.log(data)
                        meme_img.src=data.url
                        meme_title.innerHTML=data.title;
                        meme_author.innerHTML=data.author;
                        
    });
}