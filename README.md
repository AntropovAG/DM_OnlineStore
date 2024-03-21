# Онлайн магазин

## Проект онлайн-магазина с возможностями:
- просмотра различных товаров;
- простомтра информации о конкретном товаре;
- возможностью добавления товара в корзину для оформления всего заказа позднее; и/или
- возможностью оформления заказа в отношении одного вида товара при нахождении на странице такого товара;
- возможностью просмотра всех сделанных заказов;
- возможностью повторения любого из ранее оформленных товаров (товары добавляются по количеству и наименованию в корзину). 

## Использованы следующие технологии:
- React (react-create-app);
- React Router;
- Redux; 
- InView,
- ProgressiveImage,
- EsLint.

## Установка
1. Склонируйте репозиторий на локальную машину.
2. Установите зависимости, запустив команду npm install.
3. Запустите проект, используя команду npm run dev.


## Ссылка на проект
Вы можете просмотреть проект по [текущей ссылке](https://dm-online-store.vercel.app/)   

## Особенности проекта:
- Синхронизация параметров текущей страницы с URL для сохранения положения пользователя при обновлении страницы товаров.
- Бесконечный скролл вместо пагинации. Количество отображаемых товаров настроено через константы.
- Адаптивный дизайн для мобильных устройств.
- При отсутствии товара или при отсутствии страницы пользователь попадает на страницу 404 с возможностью вернуться на список товаров или вернуться назад на один шаг.
- Сохранение скролла и параметров страницы при возврате на список товаров.
- Динамическое обновление кнопки "Добавить в корзину" на счетчик с возможностью изменения количества товаров.
- Клиентская валидация на состав корзины и отдельный товар, с ограничением на количество заказываемых товаров, общую сумму заказа.
- Использование Redux для хранения состояния корзины и обновления только после успешного выполнения запроса по обновлению корзины на сервере.
- Кнопка для повторения заказа, автоматически заполняющая корзину позициями из выбранного заказа.

Автор проекта: Антропов Антон.
