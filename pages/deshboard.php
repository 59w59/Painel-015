<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebars</title>
    <link rel="stylesheet" href="../css/dashboard.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,0"
    />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <script src="https://unpkg.com/akar-icons-fonts"></script>
  </head>
  <body>
    <aside class="sidebar">
      <header>
        <button
          type="button"
          class="sidebar-burger"
          onclick="toggleSidebar()"
        >
          <i class="ai-three-line-horizontal"></i>
        </button>
        <img src="logo.svg" alt="Logo" />
      </header>
      <ul>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-home-alt1"></i>
            <p>Home</p>
          </button>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-dashboard"></i>
            <p>Dashboard</p>
          </button>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-gear"></i>
            <p>Checker cartões</p>
            <i class="ai-chevron-down-small"></i>
          </button>
          <div class="sub-menu">
            <ul>
            <li>
               <button type="button" onclick="window.location.href='checkers/Page0auth';">
                  Chk 0auth
                </button>
              </li>
              <li>
               <button type="button" onclick="window.location.href='checkers/PageGG.php';">
                  Chk GG
                </button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-folder-add"></i>
            <p>Checker </p>
            <i class="ai-chevron-down-small"></i>
          </button>
          <div class="sub-menu">
            <ul>
              <li>
                <button type="button">A</button>
              </li>
              <li>
                <button type="button">B</button>
              </li>
              <li>
                <button type="button">c</button>
              </li>
              <li>
                <button type="button">d</button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-person"></i>
            <p>Profile</p>
            <i class="ai-chevron-down-small"></i>
          </button>
          <div class="sub-menu">
            <ul>
              <li>
                <button type="button">Avatar</button>
              </li>
              <li>
                <button type="button">Theme</button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-bell"></i>
            <p>Notifications</p>
          </button>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-cart"></i>
            <p>Products</p>
          </button>
        </li>
        <li>
          <button type="button" onclick="onClick(this)">
            <i class="ai-lock-on"></i>
            <p>Account</p>
          </button>
        </li>
      </ul>
    </aside>
    <script src="../js-style/deshboard.js"></script>
  </body>
</html>
