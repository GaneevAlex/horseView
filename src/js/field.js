import {Square} from './square';

const FIELD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
const FIELD_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const HORSE_DIRECTIONS = [[2, 1], [2, -1], [-2, 1], [-2, -1]];

/**
 * Размер поля по иксу
 * @type {number}
 */
const FIELD_SIZE_X = FIELD_CHARS.length;

// Размер поля по игрику
const FIELD_SIZE_Y = FIELD_NUMBERS.length;

// Цвета поля
const COLORS = ['white', 'black'];

/**
 * @class Field
 */
export class Field {
    /**
     * @param $canvas
     * @constructor
     */
    constructor ($canvas) {
        this.$canvas = $canvas;

        // Подстраиваем размеры сцены под квадраты
        this.$canvas.width(Square.size() * FIELD_SIZE_X);

        this.squares = [];
    }

    /**
     * Создаёт поле
     */
    create () {
        const squareAmount = FIELD_SIZE_X * FIELD_SIZE_Y;
        let colorChangeCount = 0;
        let number = 0;

        // Создаём поле
        for (let i = 0; i < squareAmount; i++) {
            const color = COLORS[colorChangeCount % 2];
            const square = new Square(color);
            square.position = `${FIELD_NUMBERS[number]}${FIELD_CHARS[i % 8]}`;
            this.squares.push(square);
            this.$canvas.append(square.getSquareHTML());
            square.element = $('div', this.$canvas).last();
            colorChangeCount += (colorChangeCount + 2) % (FIELD_SIZE_Y + 1) ? 1 : 2;
            number = (i && i % FIELD_SIZE_X === 7) ? ++number : number;
            this.bind(square.element);
        }

        FIELD_NUMBERS.forEach((number) => {
            $('.numberHeaders').prepend(`<div class="headers">${number}</div>`);
        });

        FIELD_CHARS.forEach((char) => {
            $('.charHeaders').append(`<div class="headers">${char.toLocaleUpperCase()}</div>`);
        });

        $('.headers').css({
            'font-size':Square.size() / 2,
            width: Square.size(),
            height: Square.size(),
        });
    }

    /**
     * Очищает поле
     */
    clear () {
        this.squares.forEach((square) => {
            square.element.css('background-color', square.color);
        });
    }

    /**
     * Биндит обработчик на нажатие по клеткам
     */
    bind ($element) {
        $element.click(({target}) => {
            this.clear();
            const $square = $(target);
            $square.css('background-color', '#0087f5');
            const positionNumber = parseInt($square.data('position'));
            const positionChar = $square.data('position').substring(`${positionNumber}`.length);
            const availableMoves = this.getAvalableMoves(positionChar, positionNumber);

            this.squares.filter((square) => $.inArray(square.position, availableMoves) !== -1).forEach((square) => {
                square.element.css('background-color', '#2fdc2f');
            })
        });
    }

    /**
     * Получает доступные ходы
     * @param char
     * @param number
     * @returns {Array}
     */
    getAvalableMoves (char, number) {
        const availableMoves = [];
        const currentNumberIndex = FIELD_NUMBERS.indexOf(number);
        const currentCharIndex = FIELD_CHARS.indexOf(char);

        HORSE_DIRECTIONS.forEach((direction) => {
            const horisontalChar = FIELD_CHARS[currentCharIndex + direction[0]];
            const verticalChar = FIELD_CHARS[currentCharIndex + direction[1]];
            const horisontalNumber = FIELD_NUMBERS[currentNumberIndex + direction[1]];
            const verticalNumber = FIELD_NUMBERS[currentNumberIndex + direction[0]];

            if (horisontalChar && horisontalNumber) {
                availableMoves.push(`${horisontalNumber}${horisontalChar}`);
            }

            if (verticalChar && verticalNumber) {
                availableMoves.push(`${verticalNumber}${verticalChar}`);
            }
        });

        return availableMoves;
    }
}