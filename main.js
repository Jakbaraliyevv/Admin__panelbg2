document.addEventListener("DOMContentLoaded", function () {
  // HTML elementlarini olish
  const catogory = document.querySelector(".catagor");
  const all__cotogory = document.querySelector(".all_catatgory");
  const all_cardsBg = document.querySelector(".all_cards--bg");

  catogory.addEventListener("click", () => {
    if (all__cotogory.style.display === "none") {
      all__cotogory.style.display = "flex";
    } else {
      all__cotogory.style.display = "none";
    }
  });

  fetch("http://localhost:3000/products")
    .then((data) => data.json())
    .then((value) => addJson(value))
    .catch((error) => console.log("error", error));

  function addJson(data) {
    data.forEach((element) => {
      all_cardsBg.innerHTML += `
        <div class="card__bg1">
          <div class="imgg">
            <img src="${element.img}" alt="" />
          </div>
          <div class="love">
            <div class="pp1">
              <p>Скидка</p>
            </div>
            <div>
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
          <div class="card__text">
            <h3>${element.title}</h3>
            <div class="startss">
              <div class="start">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="start__text">
                <p>1 отзывов</p>
              </div>
            </div>
            <div class="price">
              <p><s>${+element.price * 2}</s></p>
              <p>${element.price}</p>
              <div class="narx">
                <p>${Math.round(element.price / 12)} sum</p>
              </div>
            </div>
            <div class="button__card">
              <div class="btn1">
                <button class="btnn">Купить</button>
              </div>
              <div class="shop">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
});

const title__id = document.getElementById("title__id");
const price__id = document.getElementById("price__id");
const file__id = document.getElementById("fileInput");
const select__id = document.getElementById("select_id");
const send__btn = document.getElementById("send__btn");

send__btn.addEventListener("click", (e) => {
  e.preventDefault();

  const file = file__id.files;
  if (
    file.length > 0 &&
    (file[0].type === "image/png" ||
      file[0].type === "image/jpg" ||
      file[0].type === "image/svg+xml")
  ) {
    const img = file[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const baseIMg = event.target.result;

      const selectedCategory =
        select__id.options[select__id.selectedIndex].text;

      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          title: title__id.value,
          price: price__id.value,
          category: selectedCategory,
          img: baseIMg,
        }),
      })
        .then((data) => console.log(data))
        .catch((error) => console.log("errror", error));
    };

    reader.readAsDataURL(img);
  } else {
    console.log("Fayl tanlanmagan yoki noto'g'ri fayl formati");
  }
});

// // Filter
// // DOM elementlarini aniqlash
// const filter1 = document.getElementById("filter1");
// const filter2 = document.getElementById("filter2");
// const filter3 = document.getElementById("filter3");
// const filter4 = document.getElementById("filter4");
// const filter5 = document.getElementById("filter5");
// const filter6 = document.getElementById("filter6");
// const filter7 = document.getElementById("filter7");
// const all_cardsBg = document.getElementById("all_cardsBg"); // kartalarni ko'rsatish uchun

// // Mahsulotlarni olish
// fetch("http://localhost:3000/products")
//   .then((response) => response.json())
//   .then((data) => filter(data)) // Barcha mahsulotlarni ko'rsatish
//   .catch((error) => console.log("Error:", error));

// // Kartalarni tozalash va yangi mahsulotlarni ko'rsatish
// function filter(data) {
//   all_cardsBg.innerHTML = ""; // kartalarni tozalash
//   data.forEach((element) => {
//     all_cardsBg.innerHTML += `
//       <div class="card__bg1">
//         <div class="imgg">
//           <img src="${element.img}" alt="" />
//         </div>
//         <div class="love">
//           <div class="pp1">
//             <p>Скидка</p>
//           </div>
//           <div>
//             <i class="fa-regular fa-heart"></i>
//           </div>
//         </div>
//         <div class="card__text">
//           <h3>${element.title}</h3>
//           <div class="startss">
//             <div class="start">
//               <i class="fa-solid fa-star"></i>
//               <i class="fa-solid fa-star"></i>
//               <i class="fa-solid fa-star"></i>
//               <i class="fa-solid fa-star"></i>
//               <i class="fa-solid fa-star"></i>
//             </div>
//             <div class="start__text">
//               <p>1 отзывов</p>
//             </div>
//           </div>
//           <div class="price">
//             <p><s>${+element.price * 2}</s></p>
//             <p>${element.price}</p>
//             <div class="narx">
//               <p>${Math.round(element.price / 12)} sum</p>
//             </div>
//           </div>
//           <div class="button__card">
//             <div class="btn1">
//               <button class="btnn">Купить</button>
//             </div>
//             <div class="shop">
//               <i class="fa-solid fa-cart-shopping"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//   });
// }

// // Filtrlarni qo'llash
// function applyFilter(category) {
//   fetch("http://localhost:3000/products")
//     .then((response) => response.json())
//     .then((data) => {
//       // Kategoriya bo'yicha filtrni qo'llash
//       const filteredData = data.filter((product) =>
//         product.category.toLowerCase().includes(category.toLowerCase())
//       );
//       filter(filteredData); // Filtrlangan mahsulotlarni ko'rsatish
//     })
//     .catch((error) => console.log("Error:", error));
// }

// // Tugmalar bilan bog'lash
// filter1.addEventListener("click", () => applyFilter("Скидки"));
// filter2.addEventListener("click", () => applyFilter("Кондиционеры"));
// filter3.addEventListener("click", () => applyFilter("Смартфоны"));
// filter4.addEventListener("click", () => applyFilter("Бытовая техника"));
// filter5.addEventListener("click", () => applyFilter("Книги"));
// filter6.addEventListener("click", () => applyFilter("Телевизоры"));
// filter7.addEventListener("click", () => applyFilter("Ноутбуки"));
