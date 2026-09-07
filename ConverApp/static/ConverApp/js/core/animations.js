export function initAnimations() {
    //     Manage the main container animation state
    const container = document.querySelector('#container')
    container.addEventListener('mouseenter', () => {
        container.style.animationPlayState = 'paused'
        container.style.boxShadow = 'none'
    })
    container.addEventListener('mouseleave', () => {
        container.style.animationPlayState = 'running'
        container.style.boxShadow = ''
    })
}