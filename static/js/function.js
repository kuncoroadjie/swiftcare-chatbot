function Menu(e) {
    let list = document.querySelector('ul');

    e.name === 'menu' ? (e.name = "close", list.classList.add('top-[75px]'), list.classList.add('opacity-100'), list.classList.add('bg-white'))
    : (e.name = "menu", list.classList.remove('top-[75px]'), list.classList.remove('opacity-100'), list.classList.remove('bg-white'))
}
window.addEventListener('scroll', function(){
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('bg-white');
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('bg-white');
        nav.classList.remove('shadow');
    }
});


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
        1000: {
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
  swiperContainer.innerHTML = "";

  // Iterasi melalui setiap berita dalam data
  data.data.forEach(news => {
    // Membuat elemen card untuk setiap berita
    const card = document.createElement('div');
    card.classList.add('border-solid','border-2','border-gray-300','w-80','swiper-slide','max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg');

    // Membuat elemen gambar
    const image = document.createElement('img');
    image.classList.add('h-52');
    image.src = news.image_url;
    image.alt = 'News Image';
    card.appendChild(image);
    
    //Membuat wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('p-5', 'h-96');

    // Membuat elemen kategori
    const categories = document.createElement('div');
    categories.classList.add('pb-2');

    // Membuat elemen untuk setiap kategori
    news.categories.forEach(category => {
      const categorySpan = document.createElement('span');
      categorySpan.classList.add('relative','inline-block', 'bg-gray-200', 'rounded-full', 'text-sm', 'font-semibold', 'text-gray-700', 'mr-2','px-2');
      categorySpan.textContent = '#' + category;
      categories.appendChild(categorySpan);
    });
    wrapper.appendChild(categories);
    
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
    newsContainer.appendChild(card);
  });
})
.catch(error => console.log(error));



