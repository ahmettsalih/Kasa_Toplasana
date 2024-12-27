// Açılır Pencere Açma ve Kapatma //

function showCustomPopup(popupId) {
    const popup = document.getElementById(popupId); // Pencere id sini alır
    popup.style.display = 'block'; // Pencereyi açar
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)'; // Animasyonla açılmasını sağlar
    }, 10);
}

function closeCustomPopup(popupId) {
    const popup = document.getElementById(popupId); // Pencere id sini alır
    popup.style.transform = 'translate(-50%, -50%) scale(0)'; // Animasyonla küçülmesini sağlar
    setTimeout(() => {
        popup.style.display = 'none'; // Pencereyi kapatır
    }, 500);
}

// Bilgisayar Parçalarının Listesi //

function toggleMenu() {
    const submenu = document.querySelector('.submenu'); // Menüyü bulur
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; // Bastığında açılıp kapanmasını sağlar
}


// Karşılama Penceresi Gösterme ve Kaptma //

document.addEventListener('DOMContentLoaded', function () {
    const karsilama = document.getElementById('karsilama'); // "karsilama" idsini alır

    document.addEventListener('click', function (event) {
        if (!karsilama.contains(event.target)) { // Eğer tıklanan yer karşılama penceresi değilse
            closeKarsilama(); // Karşılama penceresini kapatır
        }
    });
});

function closeKarsilama() {
    const karsilama = document.getElementById('karsilama'); // "karsilama" idsini alır
    karsilama.style.display = 'none'; // Butona basıldığında karşılama penceresini kapatır
}

// Sepete Ekleme ve Sepeti Gösterme //

// Sepete Ekleme //

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Sitede "cart" adında bir dizi arar, yoksa boş bir dizi oluşturur
    cart.push({ name: name, price: price }); // Ürünün adını ve fiyatını "cart" dizisine yazar

    localStorage.setItem("cart", JSON.stringify(cart)); // Güncellediği "cart" dizisini kaydeder

    let existingMessage = document.getElementById("cart-message");  // Üstteki mesaj kutusunu kontol eder
    if (existingMessage) {
        existingMessage.remove(); // Eğer mesaj kutusu varsa kaldırır
    }

    let message = document.createElement("div"); // Sonra yeni bir mesaj kutusu oluşturur
    message.id = "cart-message";
    message.innerText = `${name} sepete eklendi!`;
    message.style.position = "fixed";
    message.style.top = "20px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.backgroundColor = "#2c3e50cc";        // Mesaj kutusunun kodu ve tasarımı
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    message.style.fontSize = "16px";
    message.style.zIndex = "1000";
    document.body.appendChild(message);

    setTimeout(() => message.remove(), 2500); // Mesaj kutusunu 2.5 saniye sonra kaldırır
}

// Sepeti Gösterme //

function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // "cart" dizisini alır, yoksa boş bir dizi oluşturur
    let cartItemsDiv = document.getElementById("cart-items"); // "cart-items" idsini alır
    let totalPriceDiv = document.querySelector(".total-price"); // "total-price" classını alır

    if (cart.length === 0) { // Eğer sepet boşsa
        cartItemsDiv.innerHTML = "<p>Sepetiniz boş.</p>"; // Sepetiniz boş yazısını gösterir
        totalPriceDiv.textContent = "Toplam: 0 TL"; 
    } else {
        let totalPrice = 0; // Toplam fiyatı hesaplama
        cartItemsDiv.innerHTML = cart.map((item, index) => {
            totalPrice += item.price; // Toplam fiyatı hesaplar
            return `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>${item.price} TL&nbsp&nbsp</p>
                    <button onclick="removeFromCart(${index})">Kaldır</button>
                </div>
            `; // Ürün adını, fiyatını ve kaldır butonunu gösterir
        }).join("");

        totalPriceDiv.textContent = `Toplam: ${totalPrice} TL`; // Toplam fiyatı gösterir
    }
}

// Sepetten Kaldırma //

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // "cart" dizisini alır, yoksa boş bir dizi oluşturur
    cart.splice(index, 1); // Belirtilen ürünü sepetten kaldır
    localStorage.setItem("cart", JSON.stringify(cart)); // Güncellenen "cart" dizisini kaydeder
    showCart(); // Sepeti yeniden gösterir
}

// Sayfa yüklendiğinde sepeti gösterir
showCart();



