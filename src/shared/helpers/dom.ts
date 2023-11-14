class DomHelpers {
  static assignButtonClickMethod(buttonId: string, method: () => void) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.onclick = method;
  }
}

export default DomHelpers;
