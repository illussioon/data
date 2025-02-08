// Функция для создания и показа попапа
function createTechnicalPopup() {
    // Создаем затемненный фон
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Создаем контейнер попапа
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(26, 31, 44, 0.95);
        border: 1px solid rgba(131, 88, 255, 0.3);
        border-radius: 15px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        color: white;
        position: relative;
        animation: fadeInScale 0.3s ease;
    `;

    // Добавляем стили анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Добавляем иконку
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fas fa-tools" style="font-size: 48px; color: #8358ff; margin-bottom: 20px;"></i>';

    // Добавляем заголовок
    const title = document.createElement('h2');
    title.textContent = 'Технические работы';
    title.style.cssText = `
        font-size: 24px;
        margin-bottom: 15px;
        color: #fff;
    `;

    // Добавляем описание
    const description = document.createElement('p');
    description.innerHTML = `
        В данный момент проводятся технические работы.<br>
        Приложение временно недоступно.<br><br>
        Пожалуйста, попробуйте позже.
    `;
    description.style.cssText = `
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 20px;
    `;

    // Добавляем спиннер
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(131, 88, 255, 0.3);
        border-top: 3px solid #8358ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 20px auto;
    `;

    // Собираем попап
    popup.appendChild(icon);
    popup.appendChild(title);
    popup.appendChild(description);
    popup.appendChild(spinner);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Запрещаем прокрутку страницы
    document.body.style.overflow = 'hidden';
}

// Функция для проверки статуса технических работ
async function checkTechnicalService() {
    try {
        const response = await fetch('https://api.illussion.art/check-technical-service');
        const data = await response.json();

        if (data.technicalService) {
            createTechnicalPopup();
        }
    } catch (error) {
        console.error('Error checking technical service:', error);
    }
}

// Проверяем статус при загрузке страницы
document.addEventListener('DOMContentLoaded', checkTechnicalService);

// Периодически проверяем статус каждые 5 минут
setInterval(checkTechnicalService, 5 * 60 * 1000);