const body=document.querySelector('body');
const darkmode_btn=document.querySelector('.darkmode-container');
let all_element=document.querySelectorAll('.element');
const main_container=document.querySelector('.main-container')

const contryFlag=document.querySelector('.img-container img')
const contry_title=document.querySelector('.title')
const country_nativeName=document.querySelector('.nativeName')
const population=document.querySelector('.population')
const region=document.querySelector('.region')
const subRegion=document.querySelector('.subregion')
const capital=document.querySelector('.capital')
const tld=document.querySelector('.tld')
const currencies=document.querySelector('.currencies')
const languages=document.querySelector('.languages')
const border_container=document.querySelector('.border-contry')

const backBtn=document.querySelector('.back-btn');


let darkmode_flag=false;

const country_name = new URLSearchParams(window.location.search).get('name');
let data;


fetch(`https://restcountries.com/v3.1/name/${country_name}?fullText=true`)
.then((res)=>res.json())
.then((country)=>{
                    data=country[0];
                    console.log(country[0].name.nativeName)
                    contry_title.innerHTML=country[0].name.common;
                    contryFlag.src=country[0].flags.png
                    population.innerHTML=country[0].population;
                    region.innerHTML=country[0].region
                    subRegion.innerHTML=country[0]?.subregion;
                    capital.innerHTML=country[0].capital?.join(", ")
                    tld.innerHTML=country[0].tld.join(', ')
                    
                    
                    if(country[0].name.nativeName!==undefined)
                        country_nativeName.innerText=Object.values(country[0].name.nativeName)[0].common
                    else
                        country_nativeName.innerHTML=country[0].name.common;
                    
                    languages.innerHTML=Object.values(country[0].languages).join(', ')

                    if(country[0].currencies)
                        currencies.innerHTML=Object.values(country[0].currencies).map((currency)=>currency.name).join(", ");
                    

                    if(country[0].borders)
                        country[0].borders.forEach((border_code)=>{
                            fetch(`https://restcountries.com/v3.1/alpha/${border_code}`)
                                .then((res)=>res.json())
                                .then((data)=>{
                                    const borderContryElement=document.createElement('a');
                                    borderContryElement.href=`./country.html?name=${data[0].name.common}`;
                                    borderContryElement.classList.add('border-contrie-name')
                                    borderContryElement.innerHTML=data[0].name.common;
                                    // const border_contry= `<a href="${href_url}" class="border-contrie-name">${data[0].name.common}</a>`
                                        console.log(borderContryElement)
                                    border_container.append(borderContryElement);
                                })
                            
                        })

                    
                    
})

darkmode_btn.addEventListener('click',(e)=>{
                        if(darkmode_flag){
                            body.classList.remove('darkmode')
                            darkmode_flag=false;
                        }
                        else{
                            body.classList.add('darkmode');
                            darkmode_flag=true;
                        }
})

backBtn.addEventListener('click',(e)=>{
                                        window.history.back();
})
