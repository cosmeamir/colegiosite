(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }

        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // Admission form modal logic
    const admissionForm = document.getElementById('admissionForm');
    const birthDateInput = document.getElementById('birthDate');
    const studentAgeOutput = document.getElementById('studentAge');
    const admissionAlert = document.getElementById('admissionAlert');

    function calculateAge(dateString) {
        if (!dateString) return '-';

        const today = new Date();
        const birthDate = new Date(dateString + 'T00:00:00');
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 0 ? `${age} anos` : '-';
    }

    if (birthDateInput) {
        birthDateInput.addEventListener('change', function () {
            studentAgeOutput.textContent = calculateAge(this.value);
        });
    }

    if (admissionForm) {
        admissionForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(admissionForm);

            try {
                const response = await fetch('save_admission.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                admissionAlert.classList.remove('d-none', 'alert-success', 'alert-danger');
                admissionAlert.classList.add(data.success ? 'alert-success' : 'alert-danger');
                admissionAlert.textContent = data.message;

                if (data.success) {
                    admissionForm.reset();
                    studentAgeOutput.textContent = '-';
                }
            } catch (error) {
                admissionAlert.classList.remove('d-none', 'alert-success');
                admissionAlert.classList.add('alert-danger');
                admissionAlert.textContent = 'Erro ao enviar dados. Verifique a configuração do servidor.';
            }
        });
    }

})(jQuery);
