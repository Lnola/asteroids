class DomHelpers {
  // Assigns a click event handler to a button by its ID.
  static assignButtonClickMethod(buttonId: string, method: () => void) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.onclick = method;
  }

  // Sets the disabled state of an element by its ID.
  static setElementIsDisabled(elementId: string, isDisabled: boolean) {
    const element = document.getElementById(elementId) as HTMLButtonElement;
    element.disabled = isDisabled;
  }

  // Sets the inner HTML content of an element by its ID.
  static setElementInnerHtml(elementId: string, innerHtml: string) {
    document.getElementById(elementId)!.innerHTML = innerHtml;
  }

  // Retrieves the value of an element by its ID.
  static getElementValue(elementId: string) {
    const element = document.getElementById(elementId) as HTMLSelectElement;
    return element ? element.value : '';
  }
}

export default DomHelpers;
