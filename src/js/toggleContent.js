import { hasClass } from '../helpers.js'
//const hasClass = (element, cls) => { (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1 }

const toggleContent = (element) => {
    element.forEach(el => el.addEventListener('click', (() => {
        const targetParent = el.closest('.' + el.getAttribute('data-target'))
        const targetChild = targetParent.children[1]
        const arrow = targetParent.getElementsByTagName('i')
        
        targetChild.classList.toggle('show')
        if (hasClass(el, 'btn-user')) {
            targetChild.classList.toggle('no-space')
            arrow[0].classList.toggle('rotated')
        }
        if (hasClass(el, 'btn-comments')) {
            if (hasClass(arrow[0], 'icon-plus-circle') ) {
                arrow[0].classList.remove('icon-plus-circle')
                arrow[0].classList.add('icon-minus-circle')
            } else if(hasClass(arrow[0]), 'icon-minus-circle') {
                arrow[0].classList.remove('icon-minus-circle')
                arrow[0].classList.add('icon-plus-circle')
            }
            
        }
    })));
}

export default toggleContent

