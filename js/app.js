function showContent1() {
    document.getElementById('content1').classList.remove('hidden');
    document.getElementById('content2').classList.add('hidden');
    document.getElementById('btnContent1').classList.add('active');
    document.getElementById('btnContent2').classList.remove('active');
}

function showContent2() {
    document.getElementById('content1').classList.add('hidden');
    document.getElementById('content2').classList.remove('hidden');
    document.getElementById('btnContent1').classList.remove('active');
    document.getElementById('btnContent2').classList.add('active');
}
