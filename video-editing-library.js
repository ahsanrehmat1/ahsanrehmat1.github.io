const library = [
 {n:'01',category:'talking',title:'Business stories, made clear.',description:'A talking-head editing showcase with captions, visual emphasis, and a view of the editing process.'},
 {n:'02',category:'talking',title:'A clearer point of view.',description:'A vertical talking-head edit with bold captions and supporting visual accents.',drive:'12kQfCCeLrCZyl2aGI5gVjEZNQ4OL686z'},
 {n:'03',category:'talking',title:'Built for the scroll.',description:'A compact talking-head edit with word-by-word captions and picture-in-picture cutaways.'},
 {n:'04',category:'talking',title:'Bring the conversation to life.',description:'Business and interview footage shaped with captions, graphics, and reframing.'},
 {n:'05',category:'motion',title:'Ideas in motion.',description:'Talking-head footage moves into graphic compositions, cutouts, and kinetic typography.'},
 {n:'06',category:'documentary',title:'History, brought into focus.',description:'A longer documentary edit combining industrial imagery, archive footage, and contextual titles.',drive:'11nuwdPxsfBiQY-8cOKsoZR0ONVhNs3-L'},
 {n:'07',category:'documentary',title:'A story behind the numbers.',description:'A finance documentary sample using layered portraits, headline text, and animated transitions.'},
 {n:'08',category:'documentary',title:'An archive with atmosphere.',description:'A faceless documentary sample combining historical imagery, a television composition, and newspaper graphics.'},
 {n:'09',category:'documentary',title:'Down the rabbit hole.',description:'A long-form iceberg-style edit drawing together online footage, archival material, and screen-based evidence.',drive:'1LWx9mzO4UVFyYqdgOhevitXrY0Pnb87L'},
 {n:'10',category:'sports',title:'Beyond the arena.',description:'A fighter-profile sample that moves between place, training, and the atmosphere of competition.'},
 {n:'11',category:'sports',title:'The build-up to the fight.',description:'A combat-sports edit combining interviews, fight footage, and behind-the-scenes moments.'},
 {n:'12',category:'gaming',title:'Inside the challenge.',description:'A long-form gaming edit combining gameplay, facecam, and on-screen progress graphics.',drive:'1k8tl-pLv9qxJWDCoq3wPvPKYm4b4OylP'},
 {n:'13',category:'gaming',title:'One round at a time.',description:'A gameplay challenge edit structured with round labels and a clear visual progression.',drive:'1xYsgwEqLzCBDeKkL6MxIDyLMzZ1Z9XkT'},
 {n:'14',category:'shorts',title:'A moment that stays.',description:'A short-form speech edit with a framed visual treatment, captions, and graphic cutaways.'},
 {n:'15',category:'shorts',title:'Keep moving.',description:'A motivational reel with training footage, rhythmic typography, and a restrained frame layout.'},
 {n:'16',category:'documentary',title:'The details behind the case.',description:'A true-crime documentary edit built around archival portraits, location imagery, and atmospheric visual treatment.',drive:'1zgZMnFBQUqkVQuA_Mw2_JHMV5aiiqyrD'},
 {n:'17',category:'motion',title:'Make the explanation visual.',description:'A vertical talking-head sample with illustrated inserts and animated caption treatments.'}
];
const labels={documentary:'Documentary',talking:'Talking head',motion:'Motion graphics',sports:'Sports stories',shorts:'Short-form',gaming:'Gaming',product:'Product'};
const grid=document.querySelector('.work-grid');
for(const item of library){
 const article=document.createElement('article');article.dataset.category=item.category;
 const player=document.createElement('div');player.className='player'+(['01','02','03','04','14','15','17'].includes(item.n)?' portrait-player':'');
 const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster='./video-samples/expanded/sample-'+item.n+'.webp';video.src='https://videos.ahsanrehmat.me/videos/sample-'+item.n+'.mp4';video.setAttribute('aria-label',item.title);player.append(video);
 const heading=document.createElement('div');heading.className='work-label';const title=document.createElement('h3');title.textContent=item.title;const tag=document.createElement('span');tag.textContent=labels[item.category];heading.append(title,tag);
 const description=document.createElement('p');description.textContent=item.description;article.append(player,heading,description);
 grid.append(article);
}
const filters=document.querySelector('.work-filters');
function filterWork(category){let count=0;for(const card of grid.children){card.hidden=category!=='all'&&card.dataset.category!==category;if(card.hidden){card.querySelector('video')?.pause();}else count++;}for(const b of filters.children)b.setAttribute('aria-pressed',String(b.dataset.filter===category));document.querySelector('.work-count').textContent=count+' films';}
for(const [key,label] of [['all','All work'],...Object.entries(labels)]){const b=document.createElement('button');b.type='button';b.dataset.filter=key;b.textContent=label;b.addEventListener('click',()=>filterWork(key));filters.append(b);}
document.addEventListener('play',event=>{if(event.target.tagName==='VIDEO')for(const v of document.querySelectorAll('video'))if(v!==event.target)v.pause();},true);
filterWork('all');
