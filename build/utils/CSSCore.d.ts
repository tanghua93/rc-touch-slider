export default CSSCore;
declare namespace CSSCore {
    /**
     * Adds the class passed in to the element if it doesn't already have it.
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @return {DOMElement} the element passed in
     * @see http://caniuse.com/#feat=classlist
     */
    export function addClass(element: any, className: string): any;
    /**
     * Adds the class passed in to the element if it doesn't already have it.
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @return {DOMElement} the element passed in
     * @see http://caniuse.com/#feat=classlist
     */
    export function addClass(element: any, className: string): any;
    /**
     * Removes the class passed in from the element
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @return {DOMElement} the element passed in
     */
    export function removeClass(element: any, className: string): any;
    /**
     * Removes the class passed in from the element
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @return {DOMElement} the element passed in
     */
    export function removeClass(element: any, className: string): any;
    /**
     * Helper to add or remove a class from an element based on a condition.
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @param {*} bool condition to whether to add or remove the class
     * @return {DOMElement} the element passed in
     */
    export function conditionClass(element: any, className: string, bool: any): any;
    /**
     * Helper to add or remove a class from an element based on a condition.
     *
     * @param {DOMElement} element the element to set the class on
     * @param {string} className the CSS className
     * @param {*} bool condition to whether to add or remove the class
     * @return {DOMElement} the element passed in
     */
    export function conditionClass(element: any, className: string, bool: any): any;
    /**
     * Tests whether the element has the class specified.
     *
     * @param {DOMNode|DOMWindow} element the element to set the class on
     * @param {string} className the CSS className
     * @return {boolean} true if the element has the class, false if not
     */
    export function hasClass(element: any, className: string): boolean;
    /**
     * Tests whether the element has the class specified.
     *
     * @param {DOMNode|DOMWindow} element the element to set the class on
     * @param {string} className the CSS className
     * @return {boolean} true if the element has the class, false if not
     */
    export function hasClass(element: any, className: string): boolean;
    export function toggleClass(element: any, className: any): any;
    export function toggleClass(element: any, className: any): any;
}
