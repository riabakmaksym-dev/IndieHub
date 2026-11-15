import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, 'docx_temp');
const wordDir = path.join(buildDir, 'word');
const relsDir = path.join(buildDir, '_rels');
const wordRelsDir = path.join(wordDir, '_rels');

[buildDir, wordDir, relsDir, wordRelsDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
fs.writeFileSync(path.join(buildDir, '[Content_Types].xml'), contentTypesXml, 'utf-8');

const dotRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
fs.writeFileSync(path.join(relsDir, '.rels'), dotRelsXml, 'utf-8');

const wordRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;
fs.writeFileSync(path.join(wordRelsDir, 'document.xml.rels'), wordRelsXml, 'utf-8');

const escapeXml = (unsafe) => {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const p = (text, { bold = false, size = 24, align = 'left', spacingAfter = 120 } = {}) => `
  <w:p>
    <w:pPr>
      <w:jc w:val="${align}"/>
      <w:spacing w:after="${spacingAfter}" w:line="276" w:lineRule="auto"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        ${bold ? '<w:b/>' : ''}
        <w:sz w:val="${size}"/>
        <w:szCs w:val="${size}"/>
        <w:lang w:val="uk-UA"/>
      </w:rPr>
      <w:t xml:space="preserve">${escapeXml(text)}</w:t>
    </w:r>
  </w:p>`;

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${p('Державний вищий навчальний заклад', { size: 24, align: 'center', spacingAfter: 40 })}
    ${p('Ужгородський національний університет', { size: 24, align: 'center', spacingAfter: 40 })}
    ${p('Факультет інформаційних технологій', { size: 24, align: 'center', spacingAfter: 500 })}

    ${p('ЛАБОРАТОРНА РОБОТА № 7', { bold: true, size: 32, align: 'center', spacingAfter: 120 })}
    ${p('Тема: Реалізація API для отримання даних та авторизації на базі власного Node.js/Express сервера', { bold: true, size: 26, align: 'center', spacingAfter: 600 })}

    ${p('Виконав студент III курсу', { size: 24, align: 'right', spacingAfter: 40 })}
    ${p('Спеціальності', { size: 24, align: 'right', spacingAfter: 40 })}
    ${p('«Комп’ютерні науки»', { size: 24, align: 'right', spacingAfter: 40 })}
    ${p('Рябак Максим Миколайович', { bold: true, size: 24, align: 'right', spacingAfter: 900 })}

    ${p('Ужгород-2026', { size: 24, align: 'center', spacingAfter: 200 })}

    <w:p><w:r><w:br w:type="page"/></w:r></w:p>

    ${p('Мета: набуття практичних навичок проєктування та розробки REST API на базі платформи Node.js та фреймворку Express, реалізації механізмів автентифікації та авторизації користувачів за допомогою JSON Web Tokens (JWT) та хешування паролів алгоритмом bcrypt, забезпечення персистентного збереження даних на сервері, а також налаштування взаємодії клієнтської частини (React-застосунку IndieHub) із власним бекендом через HTTP-запити та зворотне проксіювання (Vite Proxy).', { size: 24, align: 'both', spacingAfter: 200 })}

    ${p('Завдання до роботи:', { bold: true, size: 26, align: 'left', spacingAfter: 120 })}
    ${p('1. Реалізувати власний REST API веб-сервер на базі Node.js та Express (Варіант 1, максимальна оцінка — 10 балів).', { size: 24, spacingAfter: 60 })}
    ${p('2. Реалізувати безпечну автентифікацію та авторизацію користувачів: реєстрація з валідацією та хешуванням паролів (bcrypt), вхід із генерацією токенів (JWT), отримання профілю поточного користувача через заголовок Authorization: Bearer <token> та оновлення даних профілю.', { size: 24, spacingAfter: 60 })}
    ${p('3. Реалізувати кінцеві точки (endpoints) для отримання та фільтрації списку команд, детальної інформації про команду за ідентифікатором, створення нової команди, а також отримання каталогу розробників.', { size: 24, spacingAfter: 60 })}
    ${p('4. Організувати збереження даних на сервері у форматі JSON із підтримкою персистентності між перезапусками.', { size: 24, spacingAfter: 60 })}
    ${p('5. Налаштувати зв\'язок між React-застосунком та бекендом: налаштувати проксіювання /api у vite.config.js, оновити клієнтський сервіс api.js на використання Fetch API та забезпечити логіку маршрутизації (перенаправлення неавторизованого користувача на реєстрацію з подальшим переходом на головну сторінку).', { size: 24, spacingAfter: 60 })}
    ${p('6. Провести тестування розробленого API, опублікувати сирцевий код у GitHub-репозиторії та оформити Pull Request.', { size: 24, spacingAfter: 240 })}

    ${p('Хід роботи:', { bold: true, size: 26, align: 'left', spacingAfter: 160 })}

    ${p('Аналіз архітектури та налаштування проєктної структури бекенду', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('Для реалізації серверної частини було створено ізольовану директорію server/ з чітким модульним розділенням:', { size: 24, spacingAfter: 60 })}
    ${p('• server/index.js — точка входу та запуск HTTP-сервера на порту 5000.', { size: 24, spacingAfter: 40 })}
    ${p('• server/app.js — конфігурація Express-додатка, підключення CORS, парсера JSON та обробки помилок.', { size: 24, spacingAfter: 40 })}
    ${p('• server/storage.js — модуль управління станом сховища даних із збереженням у файл server/data/db.json.', { size: 24, spacingAfter: 40 })}
    ${p('• server/middleware/auth.js — проміжне програмне забезпечення для перевірки JWT-токенів.', { size: 24, spacingAfter: 40 })}
    ${p('• server/routes/ — маршрути для сутностей: auth.js (авторизація), teams.js (команди), developers.js (розробники).', { size: 24, spacingAfter: 40 })}
    ${p('• server/test-inmemory.js — модульні тести перевірки працездатності всіх кінцевих точок API.', { size: 24, spacingAfter: 140 })}

    ${p('Рис 1. Папка server та структура бекенду', { bold: true, size: 22, align: 'center', spacingAfter: 200 })}

    ${p('Реалізація автентифікації та авторизації (JWT + bcrypt)', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('Безпеку облікових записів користувачів реалізовано у модулі server/routes/auth.js:', { size: 24, spacingAfter: 60 })}
    ${p('• POST /api/auth/register — валідація даних, перевірка унікальності email та нікнейму, хешування пароля бібліотекою bcryptjs, створення облікового запису та видача підписаного JWT токена.', { size: 24, spacingAfter: 40 })}
    ${p('• POST /api/auth/login — перевірка пароля через bcrypt.compare та повернення JWT токена.', { size: 24, spacingAfter: 40 })}
    ${p('• GET /api/auth/me — захищений роут, доступний за Bearer токеном для отримання профілю поточного користувача.', { size: 24, spacingAfter: 40 })}
    ${p('• PUT /api/auth/profile — оновлення навичок, ролі та біографії користувача.', { size: 24, spacingAfter: 140 })}

    ${p('Рис 2. Маршрути авторизації та сервіс', { bold: true, size: 22, align: 'center', spacingAfter: 200 })}

    ${p('Реалізація ендпоінтів для команд та розробників', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('Для забезпечення даних на фронтенді створено наступні маршрути:', { size: 24, spacingAfter: 60 })}
    ${p('• GET /api/teams — повертає список команд із підтримкою фільтрації за жанром, рушієм, роллю та пошуком.', { size: 24, spacingAfter: 40 })}
    ${p('• GET /api/teams/:id — детальна інформація про команду та її склад.', { size: 24, spacingAfter: 40 })}
    ${p('• POST /api/teams — додавання нової команди із прив\'язкою автора як лідера команди.', { size: 24, spacingAfter: 40 })}
    ${p('• GET /api/developers — каталог фахівців із фільтрацією за роллю та стеком технологій.', { size: 24, spacingAfter: 140 })}

    ${p('Рис 3. Ендпоінти для команд та каталог розробників', { bold: true, size: 22, align: 'center', spacingAfter: 200 })}

    ${p('Інтеграція з клієнтським застосунком (React + Vite)', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('У vite.config.js налаштовано проксіювання запитів /api на http://localhost:5000, що усунуло будь-які CORS-помилки під час розробки. Клієнтський сервіс src/services/api.js переведено на виконання нативних Fetch API запитів із збереженням JWT токена у localStorage та механізмом безперебійного локального завантаження. У файлі src/App.jsx реалізовано автоматичне перенаправлення неавторизованого користувача на сторінку реєстрації (/register), після чого користувач переходить на головне меню (/).', { size: 24, align: 'both', spacingAfter: 140 })}

    ${p('Рис. 4. Форма реєстрації з автоматичним перенаправленням', { bold: true, size: 22, align: 'center', spacingAfter: 120 })}
    ${p('Рис. 5. Головне меню після авторизації', { bold: true, size: 22, align: 'center', spacingAfter: 120 })}
    ${p('Рис. 6. Каталог команд, завантажений через Express API', { bold: true, size: 22, align: 'center', spacingAfter: 200 })}

    ${p('Тестування та перевірка працездатності', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('Для підтвердження коректності роботи було виконано набір автоматичних тестів (npm run test:server), де перевірено всі 9 кінцевих точок API. Усі тести пройдено успішно. Перевірка лінтером (npm run lint) та збірка проєкту (npm run build) завершилися без помилок.', { size: 24, align: 'both', spacingAfter: 140 })}

    ${p('Рис. 7. Результати проходження тестів API', { bold: true, size: 22, align: 'center', spacingAfter: 200 })}

    ${p('Публікація результатів у GitHub та Pull Request', { bold: true, size: 24, spacingAfter: 80 })}
    ${p('Після завершення розробки весь програмний код бекенду та фронтенду було завантажено до GitHub-репозиторію проєкту IndieHub. Було створено Pull Request з гілки feature/backend-api-and-auth у головну гілку main.', { size: 24, align: 'both', spacingAfter: 140 })}

    ${p('Рис. 8. Створений Pull Request на GitHub', { bold: true, size: 22, align: 'center', spacingAfter: 240 })}

    ${p('Висновок:', { bold: true, size: 26, align: 'left', spacingAfter: 120 })}
    ${p('У ході виконання лабораторної роботи № 7 було набуто практичних навичок створення повноцінного RESTful API за допомогою платформи Node.js та фреймворку Express.', { size: 24, align: 'both', spacingAfter: 80 })}
    ${p('Було успішно реалізовано Варіант 1 (власний Node/Express сервер) на максимальну оцінку 10 балів. Створено надійну систему автентифікації та авторизації з використанням JSON Web Tokens (JWT) та хешування паролів за допомогою алгоритму bcrypt. Організовано персистентне файлове сховище даних для збереження інформації про команди, розробників та профілі користувачів. Здійснено інтеграцію з React-клієнтом проєкту IndieHub через зворотний проксі-сервер Vite та модуль api.js, налаштовано початковий редирект неавторизованих користувачів на сторінку реєстрації з подальшим переходом на головну сторінку. Працездатність усіх реалізованих компонентів підтверджено автоматизованими тестами.', { size: 24, align: 'both', spacingAfter: 200 })}

    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701"/>
    </w:sectPr>
  </w:body>
</w:document>`;

fs.writeFileSync(path.join(wordDir, 'document.xml'), documentXml, 'utf-8');

const outputDocx = path.join(__dirname, 'Звіт_Лабораторна_робота_7.docx');
if (fs.existsSync(outputDocx)) fs.unlinkSync(outputDocx);

try {
  const normBuild = buildDir.replace(/\\/g, '/');
  const normOut = outputDocx.replace(/\\/g, '/');
  execSync(`powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${normBuild}', '${normOut}')"`, {
    stdio: 'inherit'
  });
  console.log('✓ Successfully created DOCX report:', outputDocx);
} catch (err) {
  console.error('Failed to create docx:', err);
}

fs.rmSync(buildDir, { recursive: true, force: true });
