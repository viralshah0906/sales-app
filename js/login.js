const users = [
  { username: "user1", password: "user1", name: "User 1" },
  { username: "user2", password: "user2", name: "User 2" },
  { username: "sunil", password: "sunil", name: "Sunil M" }
];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("salesmanName", user.name);
    window.location.href = "salesform.html";
  } else {
    alert("Invalid username or password!");
  }
}

