// src/utility/Select2.ts
export default class Select2 {
  private selectElement: HTMLSelectElement;

  constructor(selectElement: HTMLSelectElement) {
    this.selectElement = selectElement;
  }

  public init(): void {
    // Add event listener to the select element
    this.selectElement.addEventListener('mousedown', this.showDropdown);
  }

  private showDropdown = (): void => {
    // Show the dropdown options
    this.selectElement.size = this.selectElement.options.length;
    this.selectElement.addEventListener('blur', this.hideDropdown);
  }

  private hideDropdown = (): void => {
    // Hide the dropdown options
    this.selectElement.size = 1;
    this.selectElement.removeEventListener('blur', this.hideDropdown);
  }
}
