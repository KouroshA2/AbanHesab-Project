(function(){
  window.AH = window.AH || {};

  // ---------- Persian digit helper (shared utility, used by counter.js) ----------
  function toPersianDigits(str){
    const map = {0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
    return String(str).replace(/[0-9]/g, d => map[d]);
  }
  window.AH.utils = { toPersianDigits: toPersianDigits };

  // ---------- Other interactions: industries tile rendering (16 documented areas) ----------
  function init(){
    const industries = [
      'بانک‌ها و موسسات مالی و بیمه',
      'صنایع غذایی',
      'تولیدی و صنعتی',
      'صنایع دارویی و درمانی',
      'شرکت‌های سرمایه‌گذاری، هلدینگ و کارگزاری',
      'صنایع برق و مخابرات',
      'رایانه و انفورماتیک و پرداخت‌های الکترونیک',
      'صنایع معدنی و نفت',
      'صنعت سیمان',
      'کشت و صنعت',
      'پیمانکاری و راه و ساختمان',
      'صنایع شوینده و شیمیایی',
      'دانشگاه و مراکز آموزشی و پژوهشی',
      'شهرداری‌ها',
      'خودرو و صنایع وابسته',
      'خدماتی'
    ];
    const industriesGrid = document.getElementById('industries-grid');
    // Guard: services/experience pages already render these 16 tiles
    // statically in HTML (in the page's own language). Only inject here
    // when the grid is genuinely empty, so we never duplicate content
    // or inject Persian text into an already-built English page.
    if(industriesGrid && industriesGrid.children.length === 0){
      industries.forEach((name, i) => {
        const tile = document.createElement('div');
        tile.className = 'industry-tile';
        tile.innerHTML = `<div class="industry-index">${toPersianDigits(String(i+1).padStart(2,'0'))}</div><div class="industry-name">${name}</div>`;
        industriesGrid.appendChild(tile);
      });
    }
  }

  window.AH.animations = { init: init };
})();
