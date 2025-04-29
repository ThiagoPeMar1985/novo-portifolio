// Menu mobile toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('#menu');

mobileMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Fechar menu ao clicar em um item
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Efeito de scroll suave para as âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Mudar cor do header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('#header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Galeria de imagens do projeto
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;
    
    // Função para mostrar a imagem atual
    const showImage = (index) => {
        galleryItems.forEach(item => item.classList.remove('active'));
        galleryItems[index].classList.add('active');
    };
    
    // Botão próximo
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    });
    
    // Botão anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    });
    
    // Alternar imagens automaticamente a cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    }, 5000);
    
    // Garantir que os links do GitHub abram em uma nova aba
    document.querySelectorAll('.github-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            window.open(href, '_blank');
        });
    });
});

// Formulário de contato
const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value
    };
    
    // Enviar email usando EmailJS
    const templateParams = {
        to_email: 'thiago.p.martins@hotmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
    };
    
    // Mostrar mensagem de carregamento
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Enviar o email usando EmailJS
    emailjs.send('service_1w6lnpp', 'template_g4jf13y', templateParams)
        .then(function(response) {
            console.log('Email enviado!', response.status, response.text);
            alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
            contactForm.reset();
        }, function(error) {
            console.log('Erro ao enviar email:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
        })
        .finally(() => {
            // Restaurar o botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});