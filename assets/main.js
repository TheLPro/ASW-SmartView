var options = document.getElementById('options');
var optionsvalue = options.value;
var listoptions = ['nc', 'hw', 'mb', 'rg'];

var nc = document.getElementById('nc');



var hw = document.getElementById('hw');



var mb = document.getElementById('mb');



var rg = document.getElementById('rg');

if (localStorage.getItem('options')) {
    options.value = localStorage.getItem('options');
} else {
    localStorage.setItem('options', options.value);
}

function checkOptions() {
    switch (optionsvalue) {
        case 'Schedule':
            nc.style.display = 'block';
            hw.style.display = 'none';
            mb.style.display = 'none';
            rg.style.display = 'none';
            localStorage.setItem('options', options.value);
            break;
        case 'Homework':
            nc.style.display = 'none';
            hw.style.display = 'block';
            mb.style.display = 'none';
            rg.style.display = 'none';
            localStorage.setItem('options', options.value);
            break;
        case 'MB Events':
            nc.style.display = 'none';
            hw.style.display = 'none';
            mb.style.display = 'block';
            rg.style.display = 'none';
            localStorage.setItem('options', options.value);
            break;
        case 'Recent Grades':
            nc.style.display = 'none';
            hw.style.display = 'none';
            mb.style.display = 'none';
            rg.style.display = 'block';
            localStorage.setItem('options', options.value);
            break;
    }
}

checkOptions();

options.addEventListener('input', function() {
    console.log(options.value);
    optionsvalue = options.value;
    checkOptions();
});