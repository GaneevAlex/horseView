/**
 * @class Square
 */
export class Square {
    /**
     * @param {string} color
     * @constructor
     */
    constructor (color) {
        /**
         * @type {string}
         */
        this.color = color;

        /**
         * @type {jQuery|HTMLElement}
         * @private
         */
        this._element = null;

        this.position = '';
    }

    /**
     * @returns {jQuery|HTMLElement}
     */
    get element () {
        return this._element;
    }

    /**
     * @param {jQuery|HTMLElement} value
     */
    set element (value) {
        this._element = value;
    }

    /**
     * @returns {string}
     */
    getSquareHTML () {
        return `<div class="square" style="width: ${Square.size()}px; height: ${Square.size()}px; background-color: ${this.color}" data-position=${this.position}>`;
    }

    /**
     * @returns {number}
     */
    static size () {
        return 50;
    }
}