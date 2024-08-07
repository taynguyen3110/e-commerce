export function formatTitle(str: string) {
    let formatedTitle = str.replace('+', ' ');
    return formatedTitle.charAt(0).toUpperCase() + formatedTitle.slice(1);
  }