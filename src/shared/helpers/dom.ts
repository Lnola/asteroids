class DomHelpers {
  static assignButtonClickMethod(buttonId: string, method: () => void) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.onclick = method;
  }

  static setButtonIsDisabled(buttonId: string, isDisabled: boolean) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.disabled = isDisabled;
  }
}

export default DomHelpers;
