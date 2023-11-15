class DomHelpers {
  static assignButtonClickMethod(buttonId: string, method: () => void) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.onclick = method;
  }

  static setElementIsDisabled(elementId: string, isDisabled: boolean) {
    const element = document.getElementById(elementId) as HTMLButtonElement;
    element.disabled = isDisabled;
  }

  static setElementInnerHtml(elementId: string, innerHtml: string) {
    document.getElementById(elementId)!.innerHTML = innerHtml;
  }
}

export default DomHelpers;
