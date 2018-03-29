import { hasClass } from '../helpers.js'

const toggleContent = (element) => {
    element.forEach(el => el.addEventListener('click', (() => {
        const targetParent = el.closest('.' + el.getAttribute('data-target'))
        const target = targetParent.children[1]
        const triggerIcon = targetParent.getElementsByTagName('i')  
        
        target.classList.toggle('show')
        if (hasClass(el, 'btn-user')) {
            target.classList.toggle('no-space')
            triggerIcon[0].classList.toggle('rotated')
        }
        if (hasClass(el, 'btn-comments')) {
            if (hasClass(triggerIcon[0], 'icon-plus-circle') ) {
                triggerIcon[0].classList.remove('icon-plus-circle')
                triggerIcon[0].classList.add('icon-minus-circle')
            } else if (hasClass(triggerIcon[0]), 'icon-minus-circle') {
                triggerIcon[0].classList.remove('icon-minus-circle')
                triggerIcon[0].classList.add('icon-plus-circle')
            } 
        }
    })));
}

export default toggleContent

