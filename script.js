
const menue =document.getElementById('menue-bar');
const nav=document.getElementById('nav-link');
menue.addEventListener('click',()=> {
    nav.classList.toggle('active');
})





const API_KEY = "d08e13b2cab74729930096f95086bc81";
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews('india'));

async function fetchNews (query) {
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const card_container=document.getElementById('card-container');
    const template_news_card=document.getElementById('template-news-card');

    card_container.innerHTML="";

    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        if(article.urlToImage.onerror)return;
       
        const cardClone=template_news_card.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        card_container.appendChild(cardClone);
    });

}


function fillDataInCard(cardClone,article) {
    const img=cardClone.querySelector('#news-img');
    const title=cardClone.querySelector('#news-title');
    const src=cardClone.querySelector('#news-source');
    const desc=cardClone.querySelector('#news-desc');



img.src=article.urlToImage;
img.onerror=() => {
    img.src="image_not_found.jpg";
}
title.innerHTML=article.title;
const date=new Date(article.publishedAt).toLocaleDateString("en-US",{timeZone:"Asia/Jakarta"});
src.innerHTML=`${article.source.name} ${date} `
desc.innerHTML=article.description;


cardClone.firstElementChild.addEventListener('click',() => {
    window.open(article.url,"_blank");

})
}

let selectedItem=null;
function onNavClicked(id) {
    fetchNews(id);
    const navItem=document.getElementById(id);
    selectedItem?.classList.remove('active');
    selectedItem=navItem;
    selectedItem.classList.add('active');
}


const button=document.getElementById('search-button');
const data=document.getElementById('search-input');
button.addEventListener('click',() => {
    const query=data.value;
    if(!query)return;
    fetchNews(query);
    selectedItem?.classList.remove('active');
    selectedItem=null;
    
})


function Reload() {
    window.location.reload();
}