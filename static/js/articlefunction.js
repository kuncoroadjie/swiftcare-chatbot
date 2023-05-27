
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 25,
    
  // If we need pagination
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints:{
      0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
      },
      1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
      },
  },
});

const swiperContainer = document.querySelector('.loading');
swiperContainer.innerHTML = '<p class="text-center font-medium text-2xl">Loading Article...</p>';

// Mengambil data API
fetch('https://api.thenewsapi.com/v1/news/all?api_token=YrCmijLuZ9Dsy12XjMdhchr22AMvTho9WwmPY5ko&search=kesehatan+mental')
.then(response => response.json())
.then(data => {
const newsContainer = document.getElementById('newsContainer');
swiperContainer.classList.add('hidden');

// Iterasi melalui setiap berita dalam data
data.data.forEach(news => {
  // Membuat elemen card untuk setiap berita
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('swiper-slide');
  
  const card = document.createElement('div');
  card.classList.add('max-w-lg','m-auto','relative','w-96','lg:w-full','border-solid','border-2','border-gray-300', 'rounded', 'overflow-hidden', 'shadow-lg');
  cardWrapper.appendChild(card);
  // Membuat elemen gambar
  const image = document.createElement('img');
  image.classList.add('h-52','w-full','object-cover');
  image.src = news.image_url;
  image.alt = 'News Image';
  card.appendChild(image);
  
  //Membuat wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('p-5', 'h-80');
  
  // Membuat elemen judul
  const title = document.createElement('div');
  title.classList.add('font-bold', 'text-xl', 'mb-2');
  title.textContent = news.title;
  wrapper.appendChild(title);

  // Membuat elemen deskripsi
  const description = document.createElement('p');
  description.classList.add('text-gray-700', 'text-base');

  const maxCharacters = 100;
  const truncatedText = news.description.length > maxCharacters
  ? news.description.substring(0, maxCharacters) + '...'
  : news.description;

  description.textContent = truncatedText;
  wrapper.appendChild(description);

  const detailbtn = document.createElement('a');
  detailbtn.classList.add('absolute', 'bottom-0', 'right-5', 'cursor-pointer','mb-5','float-right','px-3','py-2','bg-violet-500','text-white','font-medium','text-sm','rounded','shadow-lg','shadow-violet-500/50','hover:bg-violet-700','hover:shadow-violet-600/50');
  detailbtn.textContent = 'Detail';
  detailbtn.href = news.url;
  wrapper.appendChild(detailbtn);
  
  // Menambahkan card ke dalam container
  card.appendChild(wrapper);
  newsContainer.appendChild(cardWrapper);
});
})
.catch(error => console.log(error));



