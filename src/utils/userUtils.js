export function setUserTablesSortCondition(data) {
  localStorage.setItem("userTablesSortCondition", JSON.stringify(data));
}

export function getUserTablesSortCondition() {
  return localStorage.getItem("userTablesSortCondition");
}

export function setUserTablesCurrentPage(data) {
  localStorage.setItem("userTablesCurrentPage", data);
}

export function getUserTablesCurrentPage() {
  return localStorage.getItem("userTablesCurrentPage");
}

export function setUserTablesSearchValue(data) {
  localStorage.setItem("userTablesSearchValue", data);
}

export function getUserTablesSearchValue() {
  return localStorage.getItem("userTablesSearchValue");
}

export function setUserTablesItemsPerPage(data) {
  localStorage.setItem("userTablesItemsPerPage", data);
}

export function getUserTablesItemsPerPage() {
  return localStorage.getItem("userTablesItemsPerPage");
}
