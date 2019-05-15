function createContent() {
    let textContent = document.getElementById('input').value;
    let Output = document.getElementById('output');
    Output.srcdoc = textContent;
}