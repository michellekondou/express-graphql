const getCellValue = (tr, idx) => {
    var dataTitle = tr.children[idx].getAttribute('data-title');
    if (dataTitle === 'Name') {
        return tr.children[idx].children[0].children[1].innerText || tr.children[idx].children[0].children[1].textContent;
    } else {
        return tr.children[idx].innerText || tr.children[idx].textContent;
    }
}

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v2 - v1 : v2.toString().localeCompare(v1)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

const sortList = (element) => {
    element.forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        const tbody = table.getElementsByTagName('tbody')[0];
        const arrow = th.getElementsByTagName('i');
        arrow[0].classList.toggle('rotated');
        Array.from(tbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => tbody.appendChild(tr));
    })));
}

export default sortList

//adapted from https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
