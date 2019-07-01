/**
 * O'Reilly Personalization Team 
 * Javascript Engineer Take home
 * 
 * Assumption: All 3 events do not have to fire if the element is already fully visible on page on initial load.
 * Otherwise, simply remove position.bottom > getWindowHeight() from checkIfTopOfElementVisible() (line 56) 
 * and checkIfHalfElementVisible() (line 65)
 * 
 * @author Amy Takayesu
 */
yourCode = function () {
    /** @type {Array<Element>} */
    let columnElements = [].slice.call(document.querySelectorAll('.column'));

    window.addEventListener('scroll', function () {
        Array.prototype.forEach.call(columnElements, function (element, index) {
            if (typeof element === 'object' && typeof element.getBoundingClientRect === 'function') {
                /** @type {DOMRect} */
                let position = element.getBoundingClientRect();

                /** @type {number} */
                let id = element.id;

                if (element.topVisible !== true) {
                    if (checkIfTopOfElementVisible(position)) {
                        console.log(`Column with id: ${id} started to become visible on the page.`);
                        /* Ensure console statement is run only once per element */
                        element.topVisible = true;
                    }
                }

                if (element.overHalfVisible !== true) {
                    if (checkIfHalfElementVisible(position)) {
                        console.log(`Column with id: ${id} is now more than 50% visible on the page.`);
                        /* Ensure console statement is run only once per element */
                        element.overHalfVisible = true;
                    }
                }

                if (checkIfFullElementVisible(position)) {
                    console.log(`Column with id: ${id} is now fully visible on the page.`);
                    /* Remove element from list after it's fully visible to improve performance 
                    and ensure console statements are run only once per element */
                    columnElements.splice(index, 1);
                }
            } else {
                throw `Element type expected in scroll listener.`;
            }
        })
    });

    /** 
     * Check if top of element has become visible on page
     * @param {DOMRect} position 
     */
    checkIfTopOfElementVisible = function (position) {
        return position.top <= getWindowHeight() && position.top > 0 && position.bottom > getWindowHeight()
            && checkIfHorizontallyOnScreen(position);
    }

    /** 
     * Check if more than 50% of the element has become visible on page
     * @param {DOMRect} position 
     */
    checkIfHalfElementVisible = function (position) {
        return position.top >= 0 && position.top < (getWindowHeight() - (position.height / 2)) && position.bottom > getWindowHeight()
            && checkIfHorizontallyOnScreen(position);
    }

    /** 
     * Check if the item is fully visible on the page
     * @param {DOMRect} position 
     */
    checkIfFullElementVisible = function (position) {
        return position.top < getWindowHeight() && position.top >= 0 && position.bottom <= getWindowHeight() && position.bottom > 0
            && checkIfHorizontallyOnScreen(position);
    }

    /** 
     * Assumption: Element needs to be fully visible on screen horizontally. 
     * If this is not the case, remove the calls to this function.
     * @param {DOMRect} position 
     * @return {boolean} 
     */
    checkIfHorizontallyOnScreen = function (position) {
        return position.left >= 0 && position.right <= getWindowWidth();
    }

    /** 
     * @return {boolean} 
     */
    getWindowWidth = function () {
        /* Fallback to document.documentElement.clientWidth for IE8 */
        return window.innerWidth || document.documentElement.clientWidth;
    }

    /** 
     * @return {boolean} 
     */
    getWindowHeight = function () {
        /* Fallback to document.documentElement.clientWidth for IE8 */
        return window.innerHeight || document.documentElement.clientHeight;
    }
}();