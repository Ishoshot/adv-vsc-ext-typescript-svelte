(function () {
  const vscode = acquireVsCodeApi()

  const button = document.getElementById('me')

  console.log('I AM HERE')

  button.innerText = 'Hello from Janiscript'
})();
