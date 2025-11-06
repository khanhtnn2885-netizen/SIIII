(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// let btnSubmit = document.getElementById("btn-submit");

// document.addEventListener("click", sendMsg);
// function sendMsg() {
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let subject = document.getElementById("subject").value;
//     let message = document.getElementById("message").value;
//     alert("ahaha");
// }






// Hàm gửi tin nhắn liên hệ
function sendMessage(event) {
    event.preventDefault();
    
    // Lấy giá trị từ form
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Kiểm tra các trường không được để trống
    if (!name || !email || !subject || !message) {
        showNotification('❌ Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('❌ Email không hợp lệ!', 'error');
        return;
    }

    // Tạo object tin nhắn
    const contactMessage = {
        id: 'msg_' + Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString(),
        status: 'unread'
    };

    // Lưu tin nhắn vào localStorage
    saveMessageToLocalStorage(contactMessage);

    // Hiển thị thông báo chi tiết
    showDetailedNotification(contactMessage);
    
    // Reset form
    document.querySelector('form').reset();
}

// Hàm lưu tin nhắn vào localStorage
function saveMessageToLocalStorage(message) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

// Hàm hiển thị thông báo chi tiết
function showDetailedNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 400px; max-width: 500px;';
    
    notification.innerHTML = `
        <h5 class="alert-heading">✅ Tin nhắn đã được gửi thành công!</h5>
        <hr>
        <div class="message-details">
            <p><strong>👤 Họ tên:</strong> ${message.name}</p>
            <p><strong>📧 Email:</strong> ${message.email}</p>
            <p><strong>📚 Môn học/Chủ đề:</strong> ${message.subject}</p>
            <p><strong>💬 Tin nhắn:</strong> ${message.message}</p>
            <p><strong>⏰ Thời gian:</strong> ${new Date(message.timestamp).toLocaleString('vi-VN')}</p>
        </div>
        <hr>
        <p class="mb-0">Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất.</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Tự động xóa sau 8 giây
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 8000);
}

// Hàm hiển thị thông báo đơn giản
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Tự động xóa sau 5 giây
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Khởi tạo sự kiện khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    // Sự kiện cho form liên hệ
    const contactForm = document.querySelector('form');
    const btnSubmit = document.getElementById("btn-submit");
    
    if (btnSubmit && contactForm) {
        btnSubmit.addEventListener('click', sendMessage);
    }

    // Thêm placeholder gợi ý cho các trường input
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (nameInput) nameInput.placeholder = 'Nhập họ và tên của bạn';
    if (emailInput) emailInput.placeholder = 'Nhập email của bạn';
    if (subjectInput) subjectInput.placeholder = 'Ví dụ: Đăng ký khóa học Thiết kế Web';
    if (messageInput) messageInput.placeholder = 'Nhập nội dung tin nhắn của bạn...';

    // Cập nhật nhãn label sang tiếng Việt
    const nameLabel = document.querySelector('label[for="name"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const subjectLabel = document.querySelector('label[for="subject"]');
    const messageLabel = document.querySelector('label[for="message"]');

    if (nameLabel) nameLabel.textContent = 'Họ và tên';
    if (emailLabel) emailLabel.textContent = 'Email';
    if (subjectLabel) subjectLabel.textContent = 'Môn học/Chủ đề';
    if (messageLabel) messageLabel.textContent = 'Tin nhắn';

    // Cập nhật text button
    if (btnSubmit) {
        btnSubmit.textContent = 'Gửi Tin Nhắn';
    }
});

// Hàm xem tất cả tin nhắn đã gửi (cho mục đích debug)
function viewAllMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    console.log('Tất cả tin nhắn:', messages);
    alert(`Đã gửi tổng cộng ${messages.length} tin nhắn. Xem chi tiết trong console.`);
}

// Thêm nút xem tin nhắn (chỉ cho mục đích phát triển)
document.addEventListener('DOMContentLoaded', function() {
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug: Xem Tin Nhắn';
    debugButton.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 9999; padding: 5px 10px; background: #ffc107; border: none; border-radius: 5px; cursor: pointer;';
    debugButton.onclick = viewAllMessages;
    document.body.appendChild(debugButton);
});