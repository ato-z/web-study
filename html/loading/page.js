window.loader = {
    hide: () => {
        document.querySelector('.loading').classList.remove('show')
    },
    show: () => {
        document.querySelector('.loading').classList.add('show')
    }
}
