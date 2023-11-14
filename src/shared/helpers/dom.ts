class DomHelpers {
  static assignButtonClickMethod(buttonId: string, method: () => void) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.onclick = method;
  }

  static setButtonIsDisabled(buttonId: string, isDisabled: boolean) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.disabled = isDisabled;
  }

  static setElementInnerHtml(elementId: string, innerHtml: string) {
    document.getElementById(elementId)!.innerHTML = innerHtml;
  }
}

export default DomHelpers;
