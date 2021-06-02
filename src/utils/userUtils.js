// Setting user table's sort condtion to localstorge
export function setUserTablesSortCondition(data) {
  localStorage.setItem("userTablesSortCondition", JSON.stringify(data));
}
// Fetching user table's sort condtion to localstorge
export function getUserTablesSortCondition() {
  return localStorage.getItem("userTablesSortCondition");
}

// Setting user table's current pagination to localstorge
export function setUserTablesCurrentPage(data) {
  localStorage.setItem("userTablesCurrentPage", data);
}
// Fetching user table's current pagination to localstorge
export function getUserTablesCurrentPage() {
  return localStorage.getItem("userTablesCurrentPage");
}

// Setting user table's search value to localstorge
export function setUserTablesSearchValue(data) {
  localStorage.setItem("userTablesSearchValue", data);
}
// Fetching user table's search value to localstorge
export function getUserTablesSearchValue() {
  return localStorage.getItem("userTablesSearchValue");
}

// Setting user table's item number per page to localstorge
export function setUserTablesItemsPerPage(data) {
  localStorage.setItem("userTablesItemsPerPage", data);
}
// Fetching user table's item number per page to localstorge
export function getUserTablesItemsPerPage() {
  return localStorage.getItem("userTablesItemsPerPage");
}
